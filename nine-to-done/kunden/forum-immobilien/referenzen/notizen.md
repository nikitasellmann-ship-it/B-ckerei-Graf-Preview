# Design-Referenzen: Forum Immobilien

Stand 2026-11-03. Gewählt von Nine to Done: apple.com, sondaven.com, sothebysrealty.com, lenvalproperties.com, Animationen im Stil von webflow.com.
Screenshots über Lighthouse (DataForSEO) in `referenzen/screens/`. Sotheby's blockiert automatische Abrufe (Fehler 405), dazu gibt es keine eigene Messung.

## Was jede Referenz liefert

### apple.com: Grundwelt und Ruhe
- **Pro Bildschirm eine Aussage:** große Überschrift, eine Zeile Unterzeile, zwei Buttons (gefüllt und Umriss), darunter ein großes Bild.
- Abwechselnd helle und dunkle Vollflächen, viel Weißraum, zentrierte Typografie, keine Dekoration.
- Raster mit zwei Kacheln für Nebenthemen.
- **Übernehmen:** Ruhe, Hierarchie, Paar aus Haupt- und Neben-Button, große Bilder, Wechsel hell/dunkel.
  **Nicht:** Produkt-Optik, blaue System-Buttons, Apple-Schrift.

### lenvalproperties.com: Bewegung und Luxus-Ton
- Technik: Webflow mit **GSAP, ScrollTrigger, SplitText, Flip, CustomEase**, **Lenis** (weiches Scrollen), Swiper.
- Bewegungskurven: `--ease-in-out: cubic-bezier(0.76, 0, 0.24, 1)`, `--ease-out: cubic-bezier(0.25, 1, 0.5, 1)`, Dauern 0,4 / 0,8 / 1,2 s.
- Muster: Überschriften erscheinen Wort für Wort, Bildkarten zoomen beim Darüberfahren auf 1,15, Bilder von Schwarzweiß zu Farbe, Button mit Linie, die die Fläche füllt, Laufband.
- Aufbau: Leitsatz → Mission → Projekte → Leistungen (Analyse, Partner, Projektsteuerung, Verkauf) → Zitat → Kontakt.
- **Übernehmen:** Wort-für-Wort-Überschriften, Zoom- und Farb-Hover auf Objektkarten, die Bewegungskurven, ruhiges Tempo.
  **Nicht:** Ladebildschirm „Loading 100 %“ (Screenshot zeigt nur Ladefläche und unscharfe Platzhalter, schlecht für Google und Ungeduldige), dunkles Braun als Grundton.

### sondaven.com: Ort als Erlebnis
- Gleiche Agentur-Technik wie Lenval (identische Bewegungskurven).
- Riesige Schrift über atmosphärischem Landschaftsfoto bzw. Video, große Kennzahlen gleich oben („bis 10 % Rendite“).
- **Abschnitt Lage mit Gehminuten** zu jedem Ziel („6 Min. zu Fuß zum Wasserfall“), Baufortschritt als Berichte, Wohnungstypen, FAQ mit echten Käuferfragen.
- **Übernehmen:** Lage-Abschnitt mit Minuten (Hagenbach: Grundschule, Rhein, Bahnhof, Karlsruhe, A65), große Kennzahlen oben (sobald Herr Röher Zahlen liefert), FAQ.
  **Nicht:** Ladeanimation, Text in Bildern, Investoren-Renditeversprechen.

### sothebysrealty.com: Luxus-Makler (ohne Messung)
Nicht abrufbar. Aus öffentlichem Auftritt bekannt: Serifenschrift, Marineblau, sehr große Objektfotos, Suche im ersten Bildschirm, Objekt vor Text.
**Übernehmen:** die Würde in Serifen und Blau (passt zu unserem Logo), Objektfotos groß. Vor dem Bau mit einem Screenshot von Nine to Done prüfen.

### webflow.com: Interaktionen
- Inhalte erscheinen beim Scrollen (im Screenshot leere Flächen), Kacheln mit kleinen Produktansichten, Logo-Leiste als Beleg, Video-Teaser.
- **Übernehmen:** Abschnitte, die sich beim Scrollen aufbauen, eine Belegleiste (bei uns: Google, ImmoScout24, Silber Partner), kurze Mikro-Animationen.
  **Nicht:** Software-Optik, blaue Akzente.

## Daraus die Richtung für Phase 4 (Entwurf, noch nicht entschieden)

**Grundwelt:** Apple-Ruhe in Forum-Farben. Weiß und Nachtblau im Wechsel, Messing nur als feiner Akzent. Serifenschrift (wie im Logo) für Überschriften, klare Groteskschrift für Fließtext.

**Bewegung:** Lenval/Sondaven-Technik, aber zurückhaltend:
1. Überschriften erscheinen Wort für Wort (SplitText), 0,8 s.
2. Bilder öffnen sich beim Scrollen mit Maske (Clip), leichter Parallax.
3. Objektkarten: Zoom auf 1,06 und Farbe beim Darüberfahren.
4. Zahlen zählen hoch (nur echte Zahlen).
5. Säule aus dem Logo als Linie, die beim Scrollen mitwächst und den Verkaufsablauf zeigt (eigener Touch).
6. Weiches Scrollen (Lenis) nur am Desktop.
7. Alles abschaltbar über `prefers-reduced-motion`, kein Ladebildschirm, Inhalt ist ohne JavaScript lesbar.

**Grenze:** Ladezeit vor Effekt. GSAP und Lenis werden lokal eingebunden, zusammen rund 60 KB komprimiert. Kein Webflow-Baukasten, der Stack bleibt eine statische Seite (siehe PRODUCT.md).
