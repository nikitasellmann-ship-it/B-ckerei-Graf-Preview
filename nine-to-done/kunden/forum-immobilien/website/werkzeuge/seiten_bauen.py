"""Erzeugt aus daten/objekte.json die Angebotsliste auf der Startseite und je Objekt eine Seite.

Start im Ordner website/:  python werkzeuge/seiten_bauen.py

Später ruft das Makler-Portal von Nine to Done dieses Skript (oder eine Schnittstelle mit
derselben Logik) auf, sobald sich Objekte ändern. Feldnamen nach OpenImmo.
"""
import html
import json
import os
import re
from urllib.parse import quote

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "daten", "objekte.json")
INDEX = os.path.join(ROOT, "index.html")
OUT = os.path.join(ROOT, "immobilien")

TYP = {"BUNGALOW": "Bungalow", "EINFAMILIENHAUS": "Einfamilienhaus", "DOPPELHAUSHAELFTE": "Doppelhaushälfte",
       "ERDGESCHOSS": "Erdgeschosswohnung", "ETAGE": "Wohnung"}


def euro(v):
    return f"{v:,.0f}\u00a0€".replace(",", ".")


def num(v):
    return f"{v:,.0f}".replace(",", ".")


def facts(o):
    f = o.get("flaechen", {})
    parts = []
    if f.get("wohnflaeche"):
        parts.append(f"{num(f['wohnflaeche'])} m²")
    if f.get("anzahl_zimmer"):
        parts.append(f"{f['anzahl_zimmer']} Zimmer")
    return parts


def list_item(o):
    t = html.escape(o["freitexte"]["objekttitel"])
    ort = html.escape(o["geo"]["ort"])
    p = o["preise"].get("kaufpreis")
    meta = " · ".join([ort] + facts(o))
    price = f'<p class="offer-price">{euro(p)}</p>' if p else '<p class="offer-price">Preis auf Anfrage</p>'
    return (f'      <li class="offer"><a href="immobilien/{o["slug"]}/">'
            f'<div class="photo"><div class="photo-inner"></div><span class="photo-note">Bilder aus dem Exposé folgen</span></div>'
            f'{price}<h3 class="offer-title">{t}</h3><p class="offer-meta">{meta}</p></a></li>')


def page(o):
    ft, f, z, a = o["freitexte"], o.get("flaechen", {}), o.get("zustand_angaben", {}), o.get("ausstattung", {})
    title = ft["objekttitel"]
    typ = TYP.get(o["objektkategorie"]["objekttyp"], "Immobilie")
    ort = o["geo"]["ort"]
    p = o["preise"].get("kaufpreis")
    rows = [("Kaufpreis", euro(p) if p else None), ("Wohnfläche", f"{num(f['wohnflaeche'])} m²" if f.get("wohnflaeche") else None),
            ("Nutzfläche", f"{num(f['nutzflaeche'])} m²" if f.get("nutzflaeche") else None),
            ("Grundstück", f"{num(f['grundstuecksflaeche'])} m²" if f.get("grundstuecksflaeche") else None),
            ("Zimmer", f.get("anzahl_zimmer")), ("Schlafzimmer", f.get("anzahl_schlafzimmer")),
            ("Baujahr", z.get("baujahr")), ("Modernisiert", z.get("letzte_modernisierung")),
            ("Heizung", " · ".join(x for x in [a.get("heizungsart"), a.get("befeuerung")] if x) or None),
            ("Energieausweis", z.get("energiepass")), ("Provision für Käufer", o["preise"].get("aussen_courtage")),
            ("Ort", f'{o["geo"]["plz"]} {ort}')]
    rows = [r for r in rows if r[0] != "Kaufpreis"]
    sheet = "".join(f"<div><dt>{k}</dt><dd>{html.escape(str(v))}</dd></div>" for k, v in rows if v)
    blocks = ""
    for key, head in [("objektbeschreibung", "Beschreibung"), ("ausstatt_beschr", "Ausstattung"), ("lage", "Lage"), ("sonstige_angaben", "Sonstiges")]:
        if ft.get(key):
            blocks += f"<h2>{head}</h2><p>{html.escape(ft[key])}</p>"
    if not blocks:
        blocks = "<p>Die ausführliche Beschreibung steht im Exposé.</p>"
    facts_line = ", ".join([f"{typ} in {ort}"] + facts(o) + ([f"Kaufpreis {euro(p)}"] if p else []))
    meta_title = f"{typ} kaufen in {ort} · " + " · ".join(facts(o)) + " · Forum Immobilien"
    phone = '<a class="btn" href="tel:+497273800365"><span>07273 800365</span></a>'
    mail = f'<a class="btn btn-quiet" href="mailto:immo@forum-roeher.de?subject={html.escape(quote("Besichtigung: " + title))}"><span>Besichtigung anfragen</span></a>'
    price_big = f'<p class="obj-price">{euro(p)}</p>' if p else '<p class="obj-price">Preis auf Anfrage</p>'
    ld = {"@context": "https://schema.org", "@type": "Offer", "name": title, "price": p, "priceCurrency": "EUR", "availability": "https://schema.org/InStock", "seller": {"@type": "RealEstateAgent", "name": "Forum Immobilien", "@id": "https://www.forum-roeher.de/#business"}, "itemOffered": {"@type": "SingleFamilyResidence" if o["objektkategorie"]["objektart"] == "haus" else "Apartment", "name": title, "numberOfRooms": f.get("anzahl_zimmer"), "floorSize": {"@type": "QuantitativeValue", "value": f.get("wohnflaeche"), "unitCode": "MTK"}, "address": {"@type": "PostalAddress", "postalCode": o["geo"]["plz"], "addressLocality": ort, "addressCountry": "DE"}}}
    return f"""<!doctype html>
<html lang="de" class="js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(meta_title)}</title>
<meta name="description" content="{html.escape(facts_line)}. Exposé, Bilder und Besichtigung bei Forum Immobilien.">
<meta name="robots" content="noindex">
<link rel="icon" href="../../assets/img/favicon.svg" type="image/svg+xml">
<link rel="preload" href="../../assets/fonts/libre-caslon-display-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="../../assets/css/site.css">
<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
</head>
<body class="page-obj">
<div class="demo" role="note"><p>Vorführ-Version von Nine to Done. Beispieldaten aus dem ImmoScout24-Konto, Stand {html.escape(DATA_STAND)}.</p></div>
<header class="bar is-solid">
  <div class="bar-in">
    <a class="brand" href="../../" aria-label="Forum Immobilien, zur Startseite"><img src="../../assets/img/forum-logo.svg" alt="" width="216" height="28"></a>
    <nav class="nav" aria-label="Hauptmenü"><a href="../../#bewertung">Bewertung</a><a href="../../#angebote">Angebote</a><a href="../../#ablauf">Verkauf</a><a href="../../#verwaltung">Verwaltung</a><a href="../../#inhaber">Über mich</a><a href="../../#kontakt">Kontakt</a></nav>
    <div class="bar-end"><a class="bar-tel" href="tel:+497273800365">07273 800365</a></div>
  </div>
</header>
<main class="obj wrap">
  <a class="more back" href="../../#angebote">← Alle Angebote</a>
  <h1>{html.escape(title)}</h1>
  <p class="obj-where">{typ} · {html.escape(o["geo"]["plz"])} {html.escape(ort)} · Die genaue Adresse erhalten Sie vor der Besichtigung.</p>
  <div class="obj-gallery" aria-label="Bilder">
    <div class="photo"><span class="photo-note">Bilder und Grundrisse kommen aus den Objektdaten</span></div>
    <div class="photo"></div>
    <div class="photo"></div>
  </div>
  <div class="obj-grid">
    <div class="obj-text">{blocks}</div>
    <aside class="obj-side" aria-label="Eckdaten">
      {price_big}
      <dl class="datasheet">{sheet}</dl>
      <p class="actions">{mail}{phone}</p>
    </aside>
  </div>
</main>
<footer class="foot">
  <div class="wrap">
    <img src="../../assets/img/forum-logo-weiss.svg" alt="Forum Immobilien" width="300" height="39">
    <div class="foot-row"><p>Forum Immobilien · Lindelbrunnstraße 4 · 76767 Hagenbach</p><nav aria-label="Rechtliches"><a href="../../impressum.html">Impressum</a><a href="../../datenschutz.html">Datenschutz</a></nav></div>
  </div>
</footer>
</body>
</html>
"""


data = json.load(open(DATA, encoding="utf-8"))
DATA_STAND = data.get("stand", "")
objs = data["immobilien"]

items = "\n".join(list_item(o) for o in objs)
src = open(INDEX, encoding="utf-8").read()
src = re.sub(r"(<!-- OBJEKTE:START -->\n).*?(<!-- OBJEKTE:ENDE -->)", lambda m: m.group(1) + items + "\n" + m.group(2), src, flags=re.S)
n = len(objs)
SING = {"Angebote": "Angebot", "Immobilien": "Immobilie"}
src = re.sub(r'(data-count-alle="(\w+)">)[^<]*', lambda m: m.group(1) + (f"{n} {m.group(2)}" if n != 1 else f"1 {SING.get(m.group(2), m.group(2))}"), src)
open(INDEX, "w", encoding="utf-8").write(src)

for o in objs:
    d = os.path.join(OUT, o["slug"])
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, "index.html"), "w", encoding="utf-8").write(page(o))
print(f"{len(objs)} Objekte: Liste in index.html, Seiten in immobilien/")
