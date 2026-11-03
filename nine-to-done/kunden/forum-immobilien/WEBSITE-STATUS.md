# Website-Status: Forum Immobilien, Hagenbach

Diese Datei hält fest, wo das Projekt steht. Der Skill `website-bauen` liest sie bei jedem Aufruf und macht dort weiter.

Status: ✅ erledigt · 🔄 läuft · ⬜ offen

| Phase | Name | Status | Datum |
|---|---|---|---|
| 0 | Einrichten | ✅ | 2026-11-03 |
| 1 | Fundament | 🔄 | 2026-11-03 |
| 2 | Recherche | ⬜ | |
| 3 | Texte | ⬜ | |
| 4 | Design-Richtung | ⬜ | |
| 5 | Bauen | ⬜ | |
| 6 | Prüfen und Feinschliff | ⬜ | |
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
- Werkzeuge: impeccable 🔄 (Anleitungen unter `.claude/skills/impeccable/` installiert, das Prüfprogramm ist in der Cloud-Sitzung gesperrt, daher ohne automatische Prüfungen) · Playwright ✅ · DataForSEO ✅ · Hosting-MCP ⬜ · Formular-Ziel ⬜

## Marke

Gemessen an der Live-Seite am 2026-11-03. Es gibt nur eine Markenfarbe, kein Logo und keine eigenen Schriften.

| Rolle | Wert |
|---|---|
| Hauptfarbe | `#272e61` (dunkles Marineblau, Kopfleiste) |
| Akzent | keiner |
| helle Fläche | Weiß |
| Text | Weiß auf Marineblau, sonst Browser-Standard |
| Überschriften | Browser-Standardschrift, fett |
| Fließtext | Browser-Standardschrift |
| Merkmale | Name „Forum Immobilien“ als Text, Firmenname auf der Kontaktseite in Großbuchstaben „FORUM IMMOBILIEN“ |

## Entscheidungen

Jede Entscheidung der Person mit Datum, damit sie nicht erneut diskutiert wird.

- 2026-11-03: Website wird mit dem Skill `website-bauen` (Julian Ivanov) gebaut.
- 2026-11-03: Die Website muss mit einem späteren Makler-Portal (Exposé-Upload, automatische Bildbearbeitung, Export zu ImmoScout24 und anderen Portalen) zusammenarbeiten. Objekte kommen deshalb aus Daten nach OpenImmo-Standard, nicht aus festem HTML. Details: `briefing/zukunft-crm-und-portale.md`.
- 2026-11-03: Ort ist 76767 Hagenbach in der Pfalz.
- 2026-11-03: Hauptziel ist, Verkäufer zu gewinnen (Empfehlung angenommen).
- 2026-11-03: Hosting bei Hostinger.
- 2026-11-03: impeccable darf installiert werden.

## Offene Fragen an die Person

- Siehe Phase-1-Fragen im Chat (Logo, Besucher, Belege, Anrede).
- Die Domain zeigt heute auf Vercel. Für den Umzug zu Hostinger muss der DNS-Eintrag geändert werden (erst in Phase 7, nur mit OK).

## Update-Ablauf nach dem Livegang

1. Änderung in der Seite und in `texte.md`
2. `python deploy/build.py`
3. Upload:
4. Cache leeren:
5. Live prüfen
