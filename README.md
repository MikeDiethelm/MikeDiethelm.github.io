# diethmik.github.io
WBE HS23 - 4Gewinnt


# Connect Four
## Teammitglieder
- Mike Diethelm
- Ismail Kassem

## Play at:
[https://github.zhaw.ch/pages/diethmik/VierGewinnt/](https://github.zhaw.ch/pages/diethmik/diethmik.github.io/)

## Spielbeschreibung
Connect Four ist ein Zwei-Spieler-Strategiespiel, bei dem die Spieler abwechselnd farbige Spielsteine in ein vertikal stehendes Spielbrett werfen. Ziel ist es, als Erster vier seiner Spielsteine horizontal, vertikal oder diagonal in einer Linie zu verbinden.

## Funktionsübersicht

### Spielfeld
- **Raster:** 7 Spalten x 6 Reihen, die das Spielbrett darstellen.
- **Spielsteinfall:** Spielsteine fallen von oben in die Spalten und füllen die niedrigste verfügbare Stelle.

### Spielmechanik
- **Spielzug:** Spieler wählen eine Spalte, um ihren Spielstein fallen zu lassen.
- **Spielerwechsel:** Nach jedem Spielzug wechselt der aktive Spieler.
- **Gewinnbedingung:** Vier in einer Reihe (horizontal, vertikal, oder diagonal) bedeutet Sieg.

### Spielsteuerung
- **Neues Spiel:** Startet das Spiel von vorne.
- **Spiel speichern:** Aktuellen Spielstand für später speichern.
- **Spiel laden:** Einen gespeicherten Spielstand wiederherstellen.
- **Rückgängig:** Den letzten Zug rückgängig machen.

### Benutzeroberfläche
- **Spielstandsanzeige:** Zeigt an, welcher Spieler aktuell an der Reihe ist.
- **Gewinnmeldung:** Informiert über den Gewinner des Spiels.

## Technische Details

- **Spiellogik:** Implementiert in JavaScript, Verwendung von Zustandsmanagement für Spielzüge und Gewinnbedingungen.
- **Speicherung:** Spielstände werden im Local Storage des Browsers gespeichert.

