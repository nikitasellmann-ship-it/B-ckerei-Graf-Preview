# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Statische Website (HTML, CSS, wenig JavaScript) ohne WordPress und ohne Baukasten, Hosting bei Hostinger.
Immobilien-Angebote kommen aus einer Datendatei (`daten/objekte.json`) mit Feldnamen nach OpenImmo,
damit ein späteres Makler-Portal von Nine to Done die Datei bzw. Schnittstelle befüllen kann
(siehe `briefing/zukunft-crm-und-portale.md`). Entschieden am 2026-11-03.

## Users

1. **Eigentümer in der Südpfalz, die verkaufen wollen** (Hauptzielgruppe). Meist Privatleute mit Haus oder Wohnung
   in Hagenbach und Umgebung, oft zum ersten Mal in einem Verkauf. Viele kennen Herrn Röher noch nicht und finden ihn über Google.
   Sie wollen wissen: Kann ich ihm vertrauen, was ist meine Immobilie wert, wie läuft das ab, wie erreiche ich ihn.
2. **Kaufinteressenten**, die ein Objekt in Hagenbach suchen und die aktuellen Angebote sehen wollen.

## Product Purpose

Website des Maklerbüros FORUM IMMOBILIEN in 76767 Hagenbach. Hauptziel: Anfragen von Eigentümern bekommen,
die ihre Immobilie bewerten lassen oder verkaufen wollen. Zweites Ziel: aktuelle Angebote zeigen und Kaufanfragen weiterleiten.
Erfolg heißt: Verkäufer melden sich über Telefon oder Formular.

Diese erste Fassung ist eine **Vorführ-Version** von Nine to Done für das Erstgespräch mit Herrn Röher.
Danach wird sie auf seine Wünsche angepasst. Alles, was er noch bestätigen muss, ist auf der Seite als offen markiert
und wird nicht als Tatsache dargestellt.

## Positioning

Ein Makler vor Ort in Hagenbach, der Inhaber persönlich als Ansprechpartner, mit kaufmännischer Ausbildung
(Dipl. Betriebswirt) und Angeboten fast ausschließlich in Hagenbach selbst. Kein Franchise, kein Callcenter.

## Operating Context

- Angebote werden heute bei ImmoScout24 gepflegt (Anbieter-Nr. 13022001) und auf der alten Seite als ImmoScout-Liste eingebettet.
- Exposés enthalten viele Fotos, Grundrisse und den Hinweis „Einige Bilder sind teilweise optimiert worden.“
- Kontakt läuft über Festnetz, Mobil und E-Mail. Ein eigenes Kontaktformular gibt es noch nicht.

## Capabilities and Constraints

- Objekte nie fest ins HTML schreiben, immer aus den Objektdaten erzeugen.
- Feste Adresse pro Objekt (`/immobilien/<id>/`).
- Pflichtseiten: Impressum, Datenschutz (fehlen auf der alten Seite).
- Leistungen laut Logo: Immobilien, Finanzierungen, Hausverwaltung. Laut ImmoScout24-Profil: Verkauf und Vermietung.
- Offen und mit dem Kunden zu klären: Umfang von Finanzierungen und Hausverwaltung, Wertermittlung,
  Jahre Erfahrung, Mitgliedschaften, Foto vom Inhaber, Öffnungszeiten, ob die Provision genannt wird.

## Brand Commitments

- Firmenname: **FORUM IMMOBILIEN** bzw. „Forum Immobilien“. Inhaber: Dipl. Betriebswirt Hans-Eckhard Röher
  (auf ImmoScout24 „Eckhard Röher“).
- Markenfarbe der alten Seite: Marineblau `#272e61`.
- Logo: „FORUM [Säule] IMMOBILIEN“ in blauen Serifen-Versalien, Unterzeile „Immobilien · Finanzierungen · Hausverwaltung“.
  Für die Vorführung überarbeitet (Gold-Kapitell, feinere Schrift) in `logo/final/`. Original von Herrn Röher anfragen.
- Anrede: **Sie**.
- Domain: forum-roeher.de, E-Mail immo@forum-roeher.de.

## Evidence on Hand

Belegt aus öffentlichen Quellen, Stand 2026-11-03:

- Adresse: Lindelbrunnstr. 4, 76767 Hagenbach. Tel. 07273 800365, Fax 07273 800366, Mobil 01520 1725277, immo@forum-roeher.de.
- Titel: Dipl. Betriebswirt (Kontaktseite der alten Website, ImmoScout-Exposé).
- Eigene Aussage der alten Website: „mit langjähriger Erfahrung“. Keine Jahreszahl belegt.
- 6 aktuelle Kaufangebote auf ImmoScout24, alle in 76767 Hagenbach (Bungalow, Wohnungen, Haushälften, Einfamilienhaus).
- ImmoScout24 **Silber Partner seit 2025** (Siegel im Profil), 42 Follower.
- Bewertungen: Google 4,0 von 5 (6 Bewertungen), ImmoScout24 4,4 von 5 (3 Bewertungen). Nicht auf die Seite, bevor der Kunde zustimmt.
- Einträge bei Gelbe Seiten, makler-empfehlung.de, Trustlocal, StarOfService.

Nicht vorhanden und nicht erfinden: Kundenzitate, Verkaufszahlen, Auszeichnungen, Mitgliedschaften, Jahre Erfahrung,
Antwortzeiten, Preise für Bewertungen.

## Product Principles

1. Vertrauen vor Werbung: Person, Ort und echte Angebote zeigen, keine großen Versprechen.
2. Der Weg zum Gespräch ist immer einen Klick entfernt (Telefon, Formular).
3. Lokal statt allgemein: Hagenbach und die Südpfalz konkret benennen.
4. Daten statt Handarbeit: Angebote kommen aus einer Quelle und erscheinen überall gleich.

## Accessibility & Inclusion

Viele Eigentümer sind älter. Gut lesbare Schriftgrößen, hohe Kontraste, große Klickflächen, Telefonnummer gut sichtbar.
Ziel: WCAG 2.2 AA.
