"""Erzeugt aus daten/objekte.json die Angebotsliste auf der Startseite und je Objekt eine Seite.

Start im Ordner website/:  python werkzeuge/seiten_bauen.py

Später ruft das Makler-Portal von Nine to Done dieses Skript (oder eine Schnittstelle mit
derselben Logik) auf, sobald sich Objekte ändern. Feldnamen nach OpenImmo.
"""
import hashlib
import html
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, "daten", "objekte.json")
INDEX = os.path.join(ROOT, "index.html")
OUT = os.path.join(ROOT, "immobilien")

TYP = {"BUNGALOW": "Bungalow", "EINFAMILIENHAUS": "Einfamilienhaus", "DOPPELHAUSHAELFTE": "Doppelhaushälfte",
       "ERDGESCHOSS": "Erdgeschosswohnung", "ETAGE": "Wohnung"}


def euro(v):
    return f"{v:,.0f} €".replace(",", ".")


def num(v):
    return f"{v:,.0f}".replace(",", ".")


def parcel(seed, w=76, h=64):
    """Eine ruhige Parzellenform, die je Objekt gleich bleibt."""
    b = hashlib.sha1(seed.encode()).digest()
    j = lambda i, r: (b[i] / 255 - 0.5) * r
    pts = [(8 + j(0, 8), 8 + j(1, 8)), (w - 8 + j(2, 8), 6 + j(3, 8)), (w - 6 + j(4, 6), h - 8 + j(5, 8)), (6 + j(6, 6), h - 6 + j(7, 6))]
    d = "M" + " L".join(f"{x:.1f} {y:.1f}" for x, y in pts) + " Z"
    return f'<svg viewBox="0 0 {w} {h}" aria-hidden="true"><path class="parcel" d="{d}"/></svg>'


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
    fx = " · ".join([ort] + facts(o))
    price = f' · <span class="price">{euro(p)}</span>' if p else ""
    return (f'          <li class="item"><a href="immobilien/{o["slug"]}/">{parcel(o["scout_id"])}'
            f'<div><h3>{t}</h3><p class="facts" style="margin:0">{fx}{price}</p></div></a></li>')


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
    sheet = "".join(f"<div><dt>{k}</dt><dd>{html.escape(str(v))}</dd></div>" for k, v in rows if v)
    blocks = ""
    for key, head in [("objektbeschreibung", "Beschreibung"), ("ausstatt_beschr", "Ausstattung"), ("lage", "Lage"), ("sonstige_angaben", "Sonstiges")]:
        if ft.get(key):
            blocks += f"<h2>{head}</h2><p>{html.escape(ft[key])}</p>"
    if not blocks:
        blocks = "<p>Die ausführliche Beschreibung steht im Exposé.</p>"
    facts_line = ", ".join([f"{typ} in {ort}"] + facts(o) + ([f"Kaufpreis {euro(p)}"] if p else []))
    meta_title = f"{typ} kaufen in {ort} · " + " · ".join(facts(o)) + " · Forum Immobilien"
    return f"""<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{html.escape(meta_title)}</title>
<meta name="description" content="{html.escape(facts_line)}. Exposé, Bilder und Besichtigung bei Forum Immobilien.">
<meta name="robots" content="noindex">
<link rel="icon" href="../../assets/img/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="../../assets/css/site.css">
<script type="application/ld+json">{json.dumps({"@context": "https://schema.org", "@type": "Offer", "name": title, "price": p, "priceCurrency": "EUR", "availability": "https://schema.org/InStock", "seller": {"@type": "RealEstateAgent", "name": "Forum Immobilien", "@id": "https://www.forum-roeher.de/#business"}, "itemOffered": {"@type": "SingleFamilyResidence" if o["objektkategorie"]["objektart"] == "haus" else "Apartment", "name": title, "numberOfRooms": f.get("anzahl_zimmer"), "floorSize": {"@type": "QuantitativeValue", "value": f.get("wohnflaeche"), "unitCode": "MTK"}, "address": {"@type": "PostalAddress", "postalCode": o["geo"]["plz"], "addressLocality": ort, "addressCountry": "DE"}}}, ensure_ascii=False)}</script>
</head>
<body>
<div class="demo" role="note"><div class="wrap"><p>Vorführ-Version von Nine to Done. Beispieldaten aus dem ImmoScout24-Konto, Stand {html.escape(DATA_STAND)}.</p></div></div>
<header class="top"><div class="wrap"><a class="brand" href="../../"><img src="../../assets/img/forum-logo-kurz.svg" alt="Forum Immobilien" width="180" height="22"></a><a class="tel" href="tel:+497273800365">07273 800365</a></div></header>
<main class="obj"><div class="wrap">
<a class="back" href="../../#angebote">← Alle Angebote</a>
<h1>{html.escape(title)}</h1>
<p class="where">{html.escape(o["geo"]["plz"])} {html.escape(ort)} · Die genaue Adresse erhalten Sie vor der Besichtigung.</p>
<p class="photos-missing">Bilder und Grundrisse kommen hier automatisch aus den Objektdaten. In der Vorführ-Version fehlen sie.</p>
<dl class="datasheet">{sheet}</dl>
{blocks}
<p style="margin-top:40px;display:flex;gap:12px;flex-wrap:wrap"><a class="btn" href="mailto:immo@forum-roeher.de?subject={html.escape('Besichtigung: ' + title)}">Besichtigung anfragen</a><a class="btn ghost" href="tel:+497273800365">07273 800365</a></p>
</div></main>
<footer class="foot" style="margin-top:80px"><div class="wrap"><img src="../../assets/img/forum-logo-weiss.svg" alt="Forum Immobilien" width="300" height="44"><p style="margin:0">Forum Immobilien · Lindelbrunnstraße 4 · 76767 Hagenbach</p><nav><a href="../../impressum.html">Impressum</a><a href="../../datenschutz.html">Datenschutz</a></nav></div></footer>
</body>
</html>
"""


data = json.load(open(DATA, encoding="utf-8"))
DATA_STAND = data.get("stand", "")
objs = data["immobilien"]

items = "\n".join(list_item(o) for o in objs)
src = open(INDEX, encoding="utf-8").read()
src = re.sub(r"(<!-- OBJEKTE:START -->\n).*?(<!-- OBJEKTE:ENDE -->)", lambda m: m.group(1) + items + "\n" + m.group(2), src, flags=re.S)
n_hb = sum(1 for o in objs if o["geo"]["ort"] == "Hagenbach")
src = re.sub(r'(data-count-hagenbach>)[^<]*', lambda m: m.group(1) + (f"{n_hb} Angebote" if n_hb != 1 else "1 Angebot"), src)
open(INDEX, "w", encoding="utf-8").write(src)

for o in objs:
    d = os.path.join(OUT, o["slug"])
    os.makedirs(d, exist_ok=True)
    open(os.path.join(d, "index.html"), "w", encoding="utf-8").write(page(o))
print(f"{len(objs)} Objekte: Liste in index.html, Seiten in immobilien/")
