---
name: Forum Immobilien
description: Die Verkaufsmappe eines Maklers aus Hagenbach als Website
colors:
  cover: "#272e61"
  cover-deep: "#1d2350"
  cover-hi: "#3a4384"
  on-cover: "#f2f5f9"
  on-cover-soft: "#bfc5e0"
  sheet: "#ffffff"
  ink: "#16273c"
  ink-soft: "#44566b"
  rule: "#cfd7df"
  form: "#6f87a0"
  form-fill: "#f4f7fa"
  stamp: "#5a3c8e"
  tab-sand: "#8f4636"
  tab-brass: "#d8b24e"
  tab-green: "#8aa58f"
  tab-blue: "#9dbad3"
  tab-rose: "#c98d7c"
  tab-grey: "#c9c3b6"
  brass: "#a8834a"
  error: "#a3302a"
typography:
  display:
    fontFamily: "Barlow Semi Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2.2rem, 1.3rem + 2.4vw, 3.6rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "Barlow Semi Condensed, Arial Narrow, sans-serif"
    fontSize: "clamp(2rem, 1.5rem + 2vw, 3.3rem)"
    fontWeight: 700
    lineHeight: 1.02
  title:
    fontFamily: "Barlow Semi Condensed, Arial Narrow, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 700
    lineHeight: 1.12
  body:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 1.6
  lead:
    fontFamily: "Atkinson Hyperlegible Next, system-ui, sans-serif"
    fontSize: "1.28rem"
    fontWeight: 400
    lineHeight: 1.5
  typed:
    fontFamily: "Courier Prime, Courier New, monospace"
    fontSize: "1.1rem"
    fontWeight: 700
rounded:
  none: "0px"
  sm: "3px"
  tab: "7px"
spacing:
  gutter-mobile: "16px"
  gutter: "28px"
  sheet-pad: "clamp(22px, 4vw, 64px)"
  rail: "150px"
  sheet-max: "1060px"
components:
  button-primary:
    backgroundColor: "{colors.cover}"
    textColor: "{colors.on-cover}"
    rounded: "{rounded.sm}"
    padding: "15px 20px"
  button-primary-hover:
    backgroundColor: "{colors.cover-deep}"
  button-line:
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "15px 20px"
  tick-box:
    backgroundColor: "{colors.form-fill}"
    textColor: "{colors.ink}"
    padding: "14px"
  field:
    backgroundColor: "{colors.form-fill}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 10px"
  register-tab:
    textColor: "{colors.ink}"
    rounded: "{rounded.tab}"
    padding: "14px 12px 14px 18px"
    width: "124px"
---

# Design System: Forum Immobilien

## Overview

**Creative North Star: "Die Verkaufsmappe"**

Die Website ist die Mappe, die Herr Röher beim Hausbesuch auf den Küchentisch legt: ein Deckel aus marineblauem Pressspan, darin hochweiße Blätter, an der Seite farbige Registerreiter. Jeder Abschnitt ist ein Blatt mit einer echten Funktion aus dem Maklerbüro: Lageplan, Bewertungsbogen, Laufzettel, Objektblätter, Merkblatt. Der Rückdeckel ist der Kontakt.

Die Seite ist ruhig und dokumentarisch, nicht dekorativ. Bewegung kommt aus dem Büroalltag: Stempel landen auf dem Laufzettel, Säulen werden aufgebaut, ein Eingang wird gestempelt. Die Zielgruppe ist oft älter, deshalb große Schrift, hohe Kontraste und eine Schrift, die für Sehschwäche gebaut ist.

Abgelehnt: die Makler-Vorlage (Hausfoto, Überschrift, Button, Leistungskarten), Creme-Papier, imitiertes Metall, Etiketten über Überschriften.

**Key Characteristics:**
- Pressspan-Grund in Marineblau, Blätter in reinem Weiß
- Registerreiter als einzige Navigation
- Formular-Sprache: Kästchen, Haarlinien, Schreibmaschinen-Eintragungen
- Violette Stempelfarbe als einziger Signalton

## Colors

Ein dunkles Indigo-Marineblau trägt die Fläche, Weiß trägt den Inhalt, Violett markiert.

### Primary
- **Pressspan-Marineblau** (#272e61): Grund der Seite, Deckel, Buttons. Aus der Kopfleiste der alten Website von Forum Immobilien. Tiefer Ton #1d2350 für Innen- und Rückdeckel, heller Ton #3a4384 für Scrollleiste und Kanten.

### Secondary
- **Stempelviolett** (#5a3c8e): Stempelabdrücke, Kreuze im Bogen, „Ihr Haus?“, Hagenbach auf der Karte. Nie als Fläche.

### Tertiary
- **Registerkarton** (#8f4636 Sandstein, #d8b24e Messinggelb, #8aa58f Graugrün, #9dbad3 Taubenblau, #c98d7c Altrosa, #c9c3b6 Grau): ausschließlich auf Registerreitern, je Blatt ein Ton. Sandstein zusätzlich als Säulenfarbe in der Zeichnung.
- **Messing** (#a8834a): Kapitelle der Säulen, Kopf der Musterklammer.

### Neutral
- **Blattweiß** (#ffffff): jedes Blatt.
- **Tinte** (#16273c): Text auf Blättern.
- **Tinte hell** (#44566b): Nebentext.
- **Formularblau** (#6f87a0 Linie, #f4f7fa Fläche): Kästchen, Felder, Tabellenlinien.
- **Haarlinie** (#cfd7df): Rahmen von Karten und Zeichnungen.

### Named Rules
**Die Stempel-Regel.** Violett erscheint nur als Tinte: Stempel, Kreuze, Markierungen. Nie als Hintergrund, nie auf Buttons.
**Die Kein-Creme-Regel.** Blätter sind hochweiß. Getöntes Papier gibt es nicht.

## Typography

**Display Font:** Barlow Semi Condensed (Arial Narrow)
**Body Font:** Atkinson Hyperlegible Next (system-ui)
**Label/Mono Font:** Courier Prime (Courier New)

**Character:** Barlow ist die Aktenbeschriftung, schmal und kräftig wie Schilder und Formulare. Atkinson trägt den Lesetext und ist für Menschen mit Sehschwäche gebaut. Courier ist alles, was eingetragen oder getippt ist: Telefonnummern, Flurstücke, Preise, Eingaben.

### Hierarchy
- **Display** (700, clamp 2.2–3.6rem, 0.98): nur die H1 auf dem Rückenschild.
- **Headline** (700, clamp 2–3.3rem, 1.02): Überschrift jedes Blatts, höchstens 18 Zeichen breit.
- **Title** (700, 1.3–1.5rem): Stationen im Laufzettel, Fragen im Bogen, Karteikarten-Titel.
- **Body** (400, 1.15rem, 1.6): Lesetext, höchstens 64 Zeichen pro Zeile.
- **Lead** (400, 1.28rem, 1.5): erster Absatz eines Blatts.
- **Typed** (Courier 400/700): Eintragungen, Zahlen, Bildunterschriften der Zeichnungen.

### Named Rules
**Die Eintragungs-Regel.** Was ein Mensch eingetragen hätte, steht in Courier: Telefonnummern, Preise, Flächen, Formulareingaben. Fließtext nie.

## Layout

Eine Spalte mit Blättern (max. 1060 px) und rechts daneben die Registerleiste (150 px, ab 1100 px Breite). Unter 1100 px wird die Leiste zu einer waagerechten Reiterleiste oben, die mitscrollt. Der erste Bildschirm ist die aufgeschlagene Mappe: links Innendeckel (0,84 fr), rechts das erste Blatt (1,16 fr). Unter 980 px liegen beide untereinander. Die Blätter liegen ohne Abstand aufeinander, links läuft ein durchgehender Heftstreifen, jedes Blatt hat zwei Lochungen. Innenabstand 22 px am Handy bis 64 px am Desktop, Seitenrand 16 px bzw. 28 px. Innerhalb eines Blatts zwei Spalten ab 900 px.

## Elevation & Depth

Tiefe kommt aus dem Stapel, nicht aus schwebenden Karten. Blätter werfen nur einen weichen Schatten nach oben auf das darunterliegende Blatt. Lose Dinge (Visitenkarte, Karteikarten, Notiz) liegen leicht gedreht obenauf und haben einen weichen Schatten nach unten.

### Shadow Vocabulary
- **Blattkante** (`box-shadow: 0 -1px 0 #d9dee6, 0 -14px 24px -18px #0006`): Übergang zwischen zwei Blättern.
- **Loses Papier** (`box-shadow: 0 12px 24px -12px #000c`): Visitenkarte, Notiz, Karteikarten.
- **Mappe** (`box-shadow: 0 30px 60px -30px #000c`): aufgeschlagene Mappe und Rückdeckel.

### Named Rules
**Die Stapel-Regel.** Keine harten Versatzschatten, keine schwebenden Karten mit Abstand auf blauem Grund.

## Shapes

Rechte Winkel. Radius nur an Buttons (3 px) und an Registerreitern (7 px auf der Außenseite). Kästchen, Felder, Tabellen und Blätter sind eckig. Lose Papiere sind um 0,4 bis 1,6 Grad gedreht. Stempel sind um 1,5 bis 7 Grad gedreht und doppelt umrandet.

## Components

### Buttons
- **Shape:** fast eckig (3px)
- **Primary:** Marineblau mit hellem Text, Barlow 600, 15px 20px
- **Hover / Focus:** dunkleres Blau, 1px nach oben. Fokusring 3px Messinggelb mit 3px Abstand.
- **Line:** transparent, 2px Rahmen in Tinte, beim Darüberfahren mit Tinte gefüllt.

### Ankreuzkästchen
- **Style:** Raster aus Formularfeldern mit 1px Formularblau, Kästchen 22px mit Rahmen in Tinte.
- **State:** Angekreuzt zeigt ein violettes „X“ in Courier und fetten Text. Einstieg und Bogen sind synchron.

### Eingabefelder
- **Style:** Formularfläche, nur Unterstrich 1,5px, Eingabe in Courier.
- **Focus:** weiß, Unterstrich in Tinte.
- **Error:** Unterstrich rot (#a3302a), Meldung direkt darunter.

### Navigation (Register)
- **Desktop:** Reiter 124px breit in Kartonfarben, rechts an die Blätter angesetzt. Aktiver Reiter steht 16px weiter heraus. Telefonnummer als weißer Reiter darunter.
- **Mobil:** waagerechte Reiterleiste oben, mitscrollend, aktiver Reiter rollt in Sicht.

### Laufzettel (Signatur)
Tabelle Station · Was passiert · Vermerk. Beim Scrollen landet je Zeile ein violetter Stempel („Besichtigt“ bis „Beurkundet“), 0,38s, aus 2-facher Größe. Am Handy werden die Zeilen gestapelt.

### Stempel „Eingegangen“
Erscheint nach dem Absenden des Bewertungsbogens mit Tagesdatum, doppelt umrandet, gedreht.

### Karteikarte (Objekt)
Weiße Karte mit roter Kopflinie unter dem Titel, blau linierten Zeilen für die Daten in Courier, Parzelle als Platzhalter mit „Fotos folgen“.

## Do's and Don'ts

### Do:
- **Do** jedes neue Thema als eigenes Blatt mit eigenem Registerreiter anlegen.
- **Do** Eintragungen, Zahlen und Telefonnummern in Courier setzen, Telefonnummern nie umbrechen.
- **Do** Bewegung aus dem Büro nehmen: stempeln, abhaken, aufbauen. Alles abschaltbar über `prefers-reduced-motion`.
- **Do** echte Dokumente des Maklers zeigen: Lageplan, Bogen, Laufzettel, Exposé.

### Don't:
- **Don't** kleine Etiketten über Überschriften setzen. Der Dokumenttyp steht auf dem Reiter.
- **Don't** Metall, Leder oder Papier mit Verläufen imitieren.
- **Don't** Creme oder getöntes Papier verwenden.
- **Don't** Blätter mit Abstand auf dem blauen Grund verteilen. Sie liegen gestapelt in der Mappe.
- **Don't** Leistungen als gleiche Karten nebeneinander zeigen oder in unterschiedlicher Höhe darstellen.
