# Forum Immobilien · Design-System (Fassung 3, 2026-11-04)

Leitlinie: Die Seite soll aussehen wie eine echte, sorgfältig gebaute Maklerseite, nicht wie ein Konzept. Vorbilder für Aufbau und Ruhe waren Christie's International Real Estate, Engel & Völkers, Dahler und Sotheby's UK (Vergleich 2026-11-04). Für die Bewegung war Sondaven das Vorbild. Kopiert wird nichts davon, übernommen werden nur die Handwerksregeln.

Die vorige Fassung („Verkaufsmappe“) liegt in `design/archiv/verkaufsmappe/`.

## Was echte Seiten anders machen (Ergebnis des Vergleichs)

| Muster echter Seiten | Umsetzung hier |
|---|---|
| Sichtbare Navigation, Telefon oben rechts | Logo links, sechs Menüpunkte, Telefon als Rahmen-Knopf. Unter 1180 px Menü-Knopf mit Vollbild-Menü |
| Erstes Bild = Handlung (Suche, Bewertung) | Bewertungs-Box im Eröffnungsbild, springt mit gewählter Objektart in Teil 2 des Formulars |
| Eine Display-Serife, eine ruhige Grotesk | Libre Caslon Display (nur 400) + Libre Franklin (variabel), kursiv Libre Caslon Text |
| Keine Effekte um der Effekte willen | Keine Verläufe, Glas, Schatten-Karten, Icons, Kicker |
| Angebote als Karussell mit Preis, Titel, Ort | Scroll-Snap-Leiste mit Pfeilen, Bild 4:3 |
| Fakten statt Versprechen | Infoleiste: Büro, Leistungen, ImmoScout24 Silber Partner seit 2025, Anzahl Angebote |
| Großer, ordentlicher Fuß | Vier Spalten: Marke, Leistungen, Kontakt, Profile |

## Farben

Palette von Nine to Done, eingeführt am 2026-11-04. Logo und Favicon sind passend umgefärbt, die Originale in Navy bleiben in `logo/final/`, die warme Fassung liegt in `logo/final/warm/`.

| Token | Wert | Verwendung | Kontrast |
|---|---|---|---|
| `--dark` | #1a120e | Eröffnung, Menü, Fuß, Schrift | |
| `--deep` | #3a2418 | Fakten-Leiste, Verwaltungsband, große Überschriften in Braun | |
| `--brown` | #6b4a2e | Knöpfe, Links, Preise, kleine Ziffern | 7,6:1 auf Papier, Weiß darauf 7,9:1 |
| `--caramel` | #a88462 | Akzent: Logo-Kapitell, Fokus, Markierung, Linien; Schrift nur auf Dunkel | 5,4:1 auf #1a120e, auf Hell nur Deko |
| `--sand` | #d5c4ae | Schrift auf Dunkel, Auswahl, Rahmen auf Dunkel | 10,9:1 auf #1a120e, 8,5:1 auf #3a2418 |
| `--grey` | #4a4a46 | Fließtext | 8,5:1 auf Papier |
| `--paper` | #fbf9f6 | Grund | |
| `--stone` | #f2ebe2 | Wechsel-Grund (Sand aufgehellt) | |
| `--line` | #e2d7c9 | Linien auf Hell | |
| `--ph` | #e3d7c8 | Fotoflächen bis echte Bilder kommen | |

## Schrift

- Überschriften: Caslon Display, 400, Zeilenhöhe 0,98 bis 1,04, Laufweite leicht negativ.
- Text und Bedienung: Franklin 400/500, 17 px, Zeilenhöhe 1,65.
- Kleine Großbuchstaben (0,75 bis 0,8125 rem, Laufweite 0,12 bis 0,14 em) nur für Knöpfe, Links und Feldbezeichnungen, nie als Überzeile über Überschriften.

## Bewegung (Muster Sondaven)

GSAP 3.15 mit ScrollTrigger und SplitText, Lenis für weiches Scrollen, alles lokal in `website/assets/js/vendor/`.

- Überschriften: Zeilen steigen aus einer Maske (expo.out, 1,2 bis 1,4 s, versetzt um 0,08 s).
- Haltungssatz: Wörter werden beim Scrollen von 16 % auf volle Deckkraft gezogen.
- Keine gleiche Einblendung für jeden Block (nach Abnahme 2026-11-04 entfernt). Bewegt werden nur Überschriften, der Haltungssatz und die Angebotsleiste.
- Knöpfe: Füllung steigt von unten, cubic-bezier(.76,0,.24,1), 0,6 s.
- Kopfleiste: durchsichtig über der Eröffnung, danach weiß, weicht beim Runterscrollen aus.
- Fotos: Ausschnitt gleitet im Rahmen (Parallaxe), Zoom 1,06 beim Überfahren der Angebote.
- Ohne JavaScript und bei `prefers-reduced-motion` ist alles sofort sichtbar.

## Unbestätigte Angaben

Sätze, die Herr Röher noch bestätigen muss, tragen `class="draft"` und sind standardmäßig gold gepunktet unterstrichen. Der Knopf „Markierungen ausblenden“ im Vorführ-Hinweis zeigt die saubere Ansicht. Vor dem Livegang müssen alle `draft` entweder bestätigt (Klasse entfernen) oder gestrichen sein.

## Details

`::selection` in hellem Gold, `caret-color` in Navy, Preise und Nummern mit `tabular-nums`. Pfeile sind gezeichnete SVG mit 1,2-px-Strich, keine Schriftzeichen.

## Fotos

Bilder sind für die Wirkung entscheidend und fehlen noch. Ablage: `website/assets/img/fotos/`. In jede `.photo`-Fläche kommt ein `<img>`, das CSS füllt den Rahmen. Objektbilder kommen später aus den Objektdaten. KI-Bilder nur als Stimmung, nie als echtes Objekt.
