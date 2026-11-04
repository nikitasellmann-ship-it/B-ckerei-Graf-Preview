"""Lädt die Musterbilder aus daten/musterbilder.json, verkleinert sie und setzt sie ein.

Start im Ordner website/:  python werkzeuge/musterbilder_laden.py
Braucht Netzzugang zu images.unsplash.com und Pillow (pip install pillow).

- Objekte: Einträge "objekt:<slug>" landen als "bilder" (mit "muster": true) in daten/objekte.json.
- Startseite: Einträge "seite:<name>" füllen das Element mit data-foto="<name>" in index.html.
- Danach werden Liste und Objektseiten mit seiten_bauen.py neu erzeugt.
Echte Fotos ersetzen später einfach die Einträge in objekte.json ("muster" weglassen).
"""
import io
import json
import os
import re
import subprocess
import sys
import urllib.request

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LISTE = os.path.join(ROOT, "daten", "musterbilder.json")
OBJEKTE = os.path.join(ROOT, "daten", "objekte.json")
INDEX = os.path.join(ROOT, "index.html")
ZIEL = os.path.join("assets", "img", "fotos", "muster")


def laden(eintrag):
    url = f"https://images.unsplash.com/{eintrag['id']}?w={eintrag.get('breite', 1600)}&q=80&fm=jpg&fit=max"
    with urllib.request.urlopen(url, timeout=60) as r:
        data = r.read()
    im = Image.open(io.BytesIO(data)).convert("RGB")
    w = eintrag.get("breite", 1600)
    if im.width > w:
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
    rel = os.path.join(ZIEL, eintrag["schluessel"] + ".jpg").replace(os.sep, "/")
    os.makedirs(os.path.join(ROOT, ZIEL), exist_ok=True)
    im.save(os.path.join(ROOT, rel), quality=80, optimize=True, progressive=True)
    return rel, im.size


liste = json.load(open(LISTE, encoding="utf-8"))["bilder"]
objekte = json.load(open(OBJEKTE, encoding="utf-8"))
index = open(INDEX, encoding="utf-8").read()
neu = {}
for e in liste:
    try:
        rel, size = laden(e)
    except Exception as err:  # Bild fehlt oder Netz gesperrt: Platzhalter bleibt
        print(f"FEHLT  {e['schluessel']}: {err}")
        continue
    print(f"ok     {e['schluessel']}  {size[0]}x{size[1]}  {rel}")
    art, name = e["fuer"].split(":", 1)
    if art == "objekt":
        neu.setdefault(name, []).append({"datei": rel, "titel": e["titel"], "muster": True})
    elif art == "seite":
        img = f'<img src="{rel}" alt="" loading="{"eager" if name == "hero" else "lazy"}" decoding="async"><span class="badge">Musterbild</span>'
        index = re.sub(rf'(<div[^>]*data-foto="{re.escape(name)}"[^>]*>).*?(</div>)', lambda m: m.group(1) + img + m.group(2), index, count=1, flags=re.S)

for o in objekte["immobilien"]:
    if o["slug"] in neu:
        o["bilder"] = neu[o["slug"]]
json.dump(objekte, open(OBJEKTE, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
open(INDEX, "w", encoding="utf-8").write(index)
subprocess.run([sys.executable, os.path.join(ROOT, "werkzeuge", "seiten_bauen.py")], check=True)
