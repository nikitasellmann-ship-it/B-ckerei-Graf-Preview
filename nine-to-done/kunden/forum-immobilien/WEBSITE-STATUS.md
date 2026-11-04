# Website-Status: Forum Immobilien, Hagenbach

Diese Datei hält fest, wo das Projekt steht. Der Skill `website-bauen` liest sie bei jedem Aufruf und macht dort weiter.

Status: ✅ erledigt · 🔄 läuft · ⬜ offen

| Phase | Name | Status | Datum |
|---|---|---|---|
| 0 | Einrichten | ✅ | 2026-11-03 |
| 1 | Fundament | ✅ | 2026-11-03 |
| 2 | Recherche | ✅ | 2026-11-03 |
| 3 | Texte | ✅ | 2026-11-03 |
| 4 | Design-Richtung | ✅ | 2026-11-03 |
| 5 | Bauen | ✅ | 2026-11-03 |
| 6 | Prüfen und Feinschliff | 🔄 | 2026-11-03 |
| 7 | Livegang | ⬜ | |
| 8 | Danach | ⬜ | |

## Ausgangslage

- Kunde: **FORUM IMMOBILIEN**, Dipl. Betriebswirt Hans-Eckhard Röher, Lindelbrunnstr. 4, 76767 Hagenbach (Südpfalz, Kreis Germersheim)
- Kontakt laut bestehender Website: Tel. 07273/ 800 365, Fax 07273/ 800 366, Mobil 0152 0172 52 77, immo@forum-roeher.de
- Auftragnehmer: Nine to Done
- Bestehende Website: https://www.forum-roeher.de, gesehen am 2026-11-03. Next.js auf Vercel, drei Seiten (Start, Immobilien, Kontakt),
  sehr wenig Text (80 Wörter auf der Startseite), kein Logo, kein Impressum und kein Datenschutz verlinkt.
  Die Immobilienseite bettet die ImmoScout24-Ergebnisliste ein: https://portal.immobilienscout24.de/ergebnisliste/13022001 (6 Angebote am 2026-11-03).
- ImmoScout24-Profil: https://www.immobilienscout24.de/anbieter/profil/forum-immobilien-76767-hagenbach
- Google-Unternehmensprofil: vorhanden und bestätigt, Kategorie Immobilienmakler, 4,0 Sterne aus 6 Bewertungen (Stand 2026-11-03).
  Öffnungszeiten dort: täglich 9 bis 20 Uhr (mit dem Kunden prüfen).
- Hauptziel der Seite: Eigentümer gewinnen, die verkaufen wollen (Anfragen für Bewertung und Verkauf). Zweites Ziel: aktuelle Angebote zeigen.
- Hosting: Hostinger
- Werkzeuge: impeccable 🔄 (Anleitungen unter `.claude/skills/impeccable/` installiert, das Prüfprogramm ist in der Cloud-Sitzung gesperrt, daher ohne automatische Prüfungen) · Playwright ✅ · DataForSEO ✅ · Higgsfield 🔄 (1 Credit) · Hosting-MCP ⬜ · Formular-Ziel ⬜

## Marke

Logo: Variante 1 aus Runde 2 (Konzept B, Gold-Kapitell), Dateien in `logo/final/`, Übersicht `logo/final/vorschau.html`.
Vorführ-Version auf Basis des alten Logos (Screenshot ImmoScout24). Original von Herrn Röher anfragen.

| Rolle | Wert |
|---|---|
| Hauptfarbe | Tinte `#1e3a5f` (Schriftzug) |
| Blau | `#2e5b86`, Hellblau `#5b84ad` (Säulenschaft) |
| Akzent | Messing `#a8834a` auf Hell, `#c9a66b` auf Dunkel (Kapitell, Unterzeile, Linien) |
| dunkle Fläche | Nachtblau `#1b2a4a` (Marineblau der alten Seite war `#272e61`) |
| helle Fläche | Weiß |
| Logo-Schrift | Cormorant Garamond 600 (Name), 700 (Unterzeile), als Pfade |
| Website-Schriften | offen, Phase 4 |
| Merkmale | Ionische Säule mit goldenem Kapitell zwischen „FORUM“ und „IMMOBILIEN“, Unterzeile „IMMOBILIEN · FINANZIERUNGEN · HAUSVERWALTUNG“ zwischen Messing-Haarlinien |

## Entscheidungen

Jede Entscheidung der Person mit Datum, damit sie nicht erneut diskutiert wird.

- 2026-11-04: Nine to Done: die Verkaufsmappe wirkt noch mehr nach KI. Eins-zu-eins-Vergleich mit Christie's, Engel & Völkers, Dahler und Sotheby's UK (Sotheby's nutzt Freight Big und Benton Sans). Danach Vorgabe von Nine to Done: „Sotheby's weglassen, es soll einfach nach einer echten Seite aussehen“. Komplett neu gebaut. Siehe `DESIGN.md`, die alte Fassung liegt in `design/archiv/verkaufsmappe/`.
- 2026-11-04: Bewegung nach dem Muster von Sondaven, umgesetzt mit GSAP, ScrollTrigger, SplitText und Lenis (lokal eingebunden). Schriften jetzt Libre Caslon Display und Libre Franklin.
- 2026-11-04: Fotos sind der größte noch fehlende Baustein. Bildquellen im Netz sind in der Cloud-Sitzung gesperrt, deshalb stehen ruhige Platzhalterflächen dort, wo später das Porträt und die Objektbilder hinkommen.
- 2026-11-03: Website wird mit dem Skill `website-bauen` (Julian Ivanov) gebaut.
- 2026-11-03: Die Website muss mit einem späteren Makler-Portal (Exposé-Upload, automatische Bildbearbeitung, Export zu ImmoScout24 und anderen Portalen) zusammenarbeiten. Objekte kommen deshalb aus Daten nach OpenImmo-Standard, nicht aus festem HTML. Details: `briefing/zukunft-crm-und-portale.md`.
- 2026-11-03: Ort ist 76767 Hagenbach in der Pfalz.
- 2026-11-03: Hauptziel ist, Verkäufer zu gewinnen (Empfehlung angenommen).
- 2026-11-03: Hosting bei Hostinger.
- 2026-11-03: impeccable darf installiert werden.
- 2026-11-03: Logo existiert (auf ImmoScout24), kein neues Logo entwerfen. Datei muss noch ins Projekt.
- 2026-11-03: Zielgruppe nach Empfehlung: Eigentümer, die Herrn Röher noch nicht kennen (über Google). Die Seite muss Vertrauen aufbauen.
- 2026-11-03: Erste Fassung ist eine Vorführ-Version für das Gespräch mit Herrn Röher. Leistungen und Details werden danach mit ihm abgestimmt. Unbestätigtes wird nicht als Tatsache dargestellt.
- 2026-11-03: Anrede Sie.
- 2026-11-03: Logo wird für die Vorführ-Version als Vektordatei nachgebaut (Libre Caslon Text, Säule als SVG). Wird durch die Originaldatei ersetzt, sobald Herr Röher sie liefert.
- 2026-11-03: Logo soll einen eigenen Touch bekommen und wertiger wirken. Runde 1 mit sechs Konzepten in `logo/entwuerfe/runde-1/vorschau.html`, Auswahl offen.
- 2026-11-03: Strategie bestätigt (vorläufig, wird nach Gespräch mit Herrn Röher angepasst): lokal Hagenbach plus Nachbarorte, „Verkauf, Finanzierung, Hausverwaltung aus einer Hand, Inhaber persönlich“.
- 2026-11-03: Design-Referenzen von Nine to Done: apple.com, sondaven.com, sothebysrealty.com, lenvalproperties.com, Animationen wie webflow.com. Ziel: innovative, hochwertige Seite mit starken Animationen. Notizen in `referenzen/notizen.md`.
- 2026-11-03: Higgsfield (KI-Bilder und -Videos) darf für Animationen genutzt werden. Stand: Free-Plan mit 1 Credit, für Videos muss Nine to Done Credits aufladen. Regel: KI-Bilder nur als Stimmung, nie als echtes Objekt oder echter Ort ausgeben.
- 2026-11-03: Verkaufspsychologie recherchiert (24 Quellen), Checkliste in `recherche/verkaufspsychologie.md`.
- 2026-11-03: Phase 2 abgenommen.
- 2026-11-03: Texte auf KI-Muster und Verkaufslogik geprüft (`recherche/ki-muster-pruefung.md`). Neuer Aufbau nach den Fragen des Eigentümers, Bewertung startet im Einstieg, keine Kicker, Karten oder nummerierten Schritte. Nine to Done gibt Freigabe, mit Phase 4 weiterzumachen.
- 2026-11-03: Phase 4 ohne das Losverfahren von impeccable (`concept-seed` in der Cloud-Sitzung blockiert). Sieben Richtungen aus fünf Materialfamilien, drei ausgearbeitet, Empfehlung A (Flurkarte).
- 2026-11-03: Gewählt: A + B (Flurkarte als Welt, wachsende Säulen aus B). Richtungsvertrag `design/richtung.md`.
- 2026-11-03: Nine to Done: erste Fassung wirkt nach KI-Seite. Komplett neu mit impeccable: Los (eingeschränkt, ohne Herausforderer) zog Platz 3 „Verkaufsmappe“, von Nine to Done gewählt, verschmolzen mit Flurkarte und Säulen. Richtungsvertrag in `.impeccable/surfaces/website-index-html.md`. Schriften jetzt Barlow Semi Condensed, Atkinson Hyperlegible, Courier Prime.
- 2026-11-03: Abschlussprüfung (frischer Prüf-Agent nach impeccable `degraded/finish-reviewer.md`): Runde 1 „fix“, Runde 2 „ship“. Design-System in `DESIGN.md` und `.impeccable/design.json`.
- 2026-11-03: Seite gebaut in `website/` (statisch, ohne Bibliothek). Objekte aus `website/daten/objekte.json` (OpenImmo-Felder), Liste und Objektseiten per `python werkzeuge/seiten_bauen.py`. Ein Beispielobjekt liegt in Hinterweidenthal (Pfälzerwald): Gebiet mit Herrn Röher klären.
- 2026-11-03: Logo als Gestaltungsmotiv: drei Säulen = drei Leistungen, Säule als Fortschrittslinie, Ideen in `referenzen/notizen.md`.
- 2026-11-03: Gewählt: Variante 1 aus Runde 2 (reines Konzept B, ohne Rundbogen). Favicon: Säule mit goldenem Kapitell auf Blau. Phase 1 abgenommen.
- 2026-11-03: Empfehlung Konzept B (Gold-Kapitell) plus Rundbogen aus C als Bildmarke. Runde 2 mit fünf Varianten in `logo/entwuerfe/runde-2/vorschau.html`.

## Offene Fragen an die Person

- Phase 6: Unabhängige Abschlussprüfung nach impeccable durchlaufen (2 Runden, Urteil „ship“ für alle 8 Korrekturen und 2 Handy-Fehler). Offen bleiben Inhalte von Herrn Röher (Foto, Objektbilder, ⚑-Angaben) und das Regler-Panel. Mit ⚑ markierte Sätze und die 18 offenen Fragen klärt Nine to Done mit Herrn Röher.
- Für Herrn Röher: seit wann Makler, Zahl der Verkäufe, Referenzen, § 34c GewO, macht er WEG- und Mietverwaltung?, Provision nennen?

- Originale Logo-Datei (SVG, PDF oder große PNG) von Herrn Röher anfragen, dann Farben neu messen.
- Mit Herrn Röher klären: Umfang der Leistungen Finanzierungen und Hausverwaltung, Jahre Erfahrung, Mitgliedschaften, Foto, Öffnungszeiten, Bewertungen zeigen?, Provision nennen?
- Die Domain zeigt heute auf Vercel. Für den Umzug zu Hostinger muss der DNS-Eintrag geändert werden (erst in Phase 7, nur mit OK).

## Update-Ablauf nach dem Livegang

1. Änderung in der Seite und in `texte.md`
2. `python deploy/build.py`
3. Upload:
4. Cache leeren:
5. Live prüfen
