# Zukunft: Makler-Portal, Bildbearbeitung und Portal-Export

Stand 2026-11-03. Wunsch von Nine to Done: Die Website soll mit Systemen zusammenarbeiten, die wir später bauen.

## Ziel (später, nicht Teil der ersten Website)

1. **Makler-Portal (CRM):** Herr Röhrer lädt ein Exposé hoch (Daten und Fotos).
2. **Bildbearbeitung automatisch:** Belichtung, Weißabgleich, gerade Linien, Himmel, Größen für jedes Portal.
3. **Veröffentlichung automatisch:** ImmoScout24, Immowelt/Kleinanzeigen und andere Portale, gleichzeitig auf der eigenen Website.

## Was die erste Website dafür schon richtig machen muss

- **Objekte sind Daten, kein fest eingebautes HTML.** Die Seite liest ihre Immobilien aus einer Datei bzw. Schnittstelle
  (anfangs `daten/objekte.json`, später die API des Portals). Wird ein Objekt im Portal angelegt, erscheint es automatisch auf der Seite.
- **Datenmodell nach OpenImmo.** OpenImmo ist der deutsche Standard für den Austausch von Immobiliendaten
  (Objektart, Vermarktungsart, Preise, Flächen, Zimmer, Energieausweis, Bilder). Fast alle Portale und Makler-CRMs sprechen ihn.
  Die Felder der Website heißen von Anfang an so wie in OpenImmo, damit später nichts umgebaut werden muss.
- **Feste Adressen pro Objekt**, z. B. `/immobilien/<objekt-id>/`, damit Links aus Portalen und Google stabil bleiben.
- **Bilder getrennt vom Code** in einem eigenen Ordner bzw. Speicher, mit Originalen und bearbeiteten Fassungen.
- **Kontaktformular mit Objektbezug**, damit Anfragen später direkt im CRM beim richtigen Objekt landen.

## Wege zu den Portalen

| Portal | Üblicher Weg |
|---|---|
| ImmoScout24 | REST-API (Import/Export), Zugang als Software-Partner beantragen |
| Immowelt / Immonet | OpenImmo-XML per FTP-Import |
| Kleinanzeigen und weitere | OpenImmo oder eigene Schnittstelle, je Portal prüfen |

Alternative zum Eigenbau: ein bestehendes Makler-CRM (z. B. onOffice, FLOWFACT, Propstack) mit Portal-Export.
Unser Portal wäre dann vor allem die Bildbearbeitung und die Website-Anbindung. Das entscheiden wir vor dem Bau des Portals.

## Rechtlicher Hinweis zur Bildbearbeitung

Fotos verbessern (Licht, Farben, Perspektive) ist üblich. Fotos dürfen das Objekt aber nicht falsch darstellen
(z. B. Mängel wegretuschieren, Aussicht hinzufügen). Virtuell eingerichtete Räume (Virtual Staging) müssen als solche gekennzeichnet sein.
Sonst droht eine Abmahnung wegen irreführender Werbung. Keine Rechtsberatung, vor dem Start prüfen lassen.
