# ⚡ Gedankenblitz – Anleitung

Sprich einen Gedanken ins Handy → die KI schreibt ihn auf, sortiert ihn und legt eine Notiz an.
Sachen für den Einkauf landen automatisch in **deiner bestehenden Einkaufsliste**.

## Was die App kann
- 🎙️ Aufnahme per Knopfdruck (bis 2 Minuten), alternativ eintippen oder eine Sprachmemo hochladen
- 🤖 Die KI (Google Gemini) erkennt, ob es um **Einkauf, Aufgaben, eine Idee oder eine Notiz** geht
- 🛒 Einkaufs-Sachen werden an die vorhandene Liste angehängt (keine doppelten Einträge; Abgehaktes kommt wieder auf die Liste)
- 💡 Ideen bekommen Titel, Zusammenfassung und Gliederung; passt ein Gedanke zu einer alten Idee, wird diese ergänzt
- 🧩 Ein Satz mit mehreren Themen („Milch kaufen … und ich hab eine Idee für …“) wird auf mehrere Notizen verteilt
- ✅ Abhaken, Einträge von Hand ergänzen, Erledigtes entfernen
- 📤 Jede Notiz als Datei (.md) speichern oder teilen (z. B. an WhatsApp, Notizen, Google Drive)
- 💾 Backup als .json und wieder einlesen

## Dateien
| Datei | Wofür |
|---|---|
| `index.html` | Die komplette App (Aussehen + Logik) |
| `manifest.json` | Macht sie installierbar (Name, Icon) |
| `sw.js` | Lässt sie schnell starten wie eine echte App |
| `icon-192.png`, `icon-512.png` | App-Symbol |

## In 3 Schritten aufs Handy

### 1. Kostenlosen KI-Schlüssel holen
1. Öffne <https://aistudio.google.com/apikey> und melde dich mit einem Google-Konto an.
2. „API-Schlüssel erstellen“ → Schlüssel kopieren (beginnt mit `AQ.`, das ist das neue Format von Google).

### 2. App online stellen (nötig, weil das Mikrofon nur über https funktioniert)
**Variante A – Netlify (am einfachsten):**
1. Gehe am Computer auf <https://app.netlify.com/drop>.
2. Ziehe den ganzen Ordner `gedanken-app` in das Feld.
3. Du bekommst eine Adresse wie `https://irgendwas.netlify.app`.

**Variante B – GitHub Pages:**
1. Neues Repository auf GitHub anlegen, alle Dateien hochladen.
2. *Settings → Pages → Branch: main* → speichern.
3. Nach ca. 1 Minute läuft die App unter `https://DEINNAME.github.io/REPO/`.

### 3. Auf dem Handy installieren
1. Adresse am Handy öffnen.
2. **iPhone (Safari):** Teilen-Symbol → „Zum Home-Bildschirm“.
   **Android (Chrome):** Menü ⋮ → „App installieren“ / „Zum Startbildschirm hinzufügen“.
3. App öffnen → ⚙️ → Schlüssel einfügen → Speichern.
4. Mikrofon erlauben, wenn gefragt. Fertig!

## Gut zu wissen
- **Deine Notizen liegen nur auf deinem Handy** (im Speicher der App). Mach ab und zu ein Backup (⚙️ → Backup).
  Wenn du die App löschst oder die Browserdaten leerst, sind die Notizen weg.
- **Der Schlüssel** wird nur auf deinem Gerät gespeichert, nicht in den Dateien. Gib die App-Adresse ruhig weiter – jeder braucht seinen eigenen Schlüssel.
- **Kostenlos:** Die Gratis-Stufe von Gemini reicht für viele Aufnahmen pro Tag. Bei der Gratis-Stufe darf Google die Daten aber zur Verbesserung nutzen – sprich also keine Passwörter o. Ä. ein.
- **Fehler „Modell nicht gefunden“:** In ⚙️ ein anderes Modell aus der Liste wählen (z. B. `gemini-2.5-flash`).

## Weiterbauen mit deinem KI-Coding-Agenten
Öffne den Ordner in deinem Coding-Tool und probiere z. B. diese Aufträge:
- „Füge eine Suche über alle Notizen hinzu.“
- „Sortiere die Einkaufsliste automatisch nach Supermarkt-Abteilungen (Obst, Kühlregal, Drogerie …).“
- „Lass mich eine Notiz von Hand bearbeiten (Titel und Text).“
- „Speichere die Notizen zusätzlich in Google Drive.“

Die wichtigste Stelle zum Anpassen ist `SYSTEM_PROMPT` in `index.html` – dort steht, wie die KI sortieren soll.
