# Angular Code Playground

Ein vollständig funktionsfähiger Online-Code-Editor für Angular, der wie VS Code aussieht und funktioniert.

## Features

### 🎨 **VS Code ähnliche Benutzeroberfläche**
- Dunkles Theme mit originalgetreuen VS Code Farben
- Activity Bar mit Icons für Explorer, Search und Settings
- Resizable Panels (Editor, Preview, Terminal)
- Tab-basiertes Editing mit Multi-File-Support

### 📁 **File Explorer**
- Hierarchische Datei- und Ordnerstruktur
- Erstellen, Umbenennen und Löschen von Dateien/Ordnern
- Kontextmenü mit Rechtsklick
- Dateisymbole basierend auf Dateityp (TypeScript, HTML, SCSS, etc.)
- Expandierbare/Kollapsierbare Ordner

### 💻 **Monaco Code Editor**
- Vollständiger Monaco Editor (VS Code's Editor)
- Syntax-Highlighting für TypeScript, HTML, SCSS, CSS, JSON
- IntelliSense und Auto-Completion
- Fehlerprüfung und Linting
- Multi-Cursor Support
- Code-Formatierung

### 🔄 **Live Preview**
- Echtzeit-Vorschau des Angular Codes
- Automatisches Kompilieren bei Code-Änderungen
- Fehlerbehandlung mit aussagekräftigen Meldungen
- Isolierte Sandbox-Umgebung

### 🖥️ **Terminal**
- Build-Ausgabe und Logs
- Farbcodierte Nachrichten (Info, Success, Error, Warning)
- Automatisches Scrollen zu neuen Nachrichten
- Clear-Funktion

### 🚀 **Compiler & Runtime**
- TypeScript zu JavaScript Kompilierung
- Angular Template Parsing
- Style Processing (SCSS)
- Reaktives State Management
- Event Binding

## Technologie-Stack

- **Angular 20+** - Framework
- **Monaco Editor 0.52.2** - Code Editor
- **TypeScript** - Programmiersprache
- **RxJS** - Reactive Programming
- **Angular Signals** - State Management

## Architektur

### Services

#### `PlaygroundFileSystemService`
Verwaltet das virtuelle Dateisystem:
- Erstellen/Löschen/Umbenennen von Dateien und Ordnern
- Tab-Management
- File Content Updates
- Import/Export von Projekten

#### `PlaygroundCompilerService`
Kompiliert und rendert Angular Code:
- TypeScript Validierung
- Template Extraktion
- Style Processing
- HTML Generierung für Preview
- Error Handling

### Components

#### `CodePlaygroundComponent`
Haupt-Container mit VS Code Layout:
- Activity Bar
- Sidebar mit File Explorer
- Editor Section
- Preview Panel
- Terminal
- Toolbar mit Run/Stop Buttons

#### `FileExplorerComponent`
Datei-Explorer mit:
- Hierarchischer Baum-Ansicht
- Kontextmenü
- Datei/Ordner Operationen
- Icons basierend auf Dateityp

#### `CodeEditorComponent`
Monaco Editor Integration:
- Tab-Management
- Syntax-Highlighting
- IntelliSense
- File Switching
- Content Synchronisation

#### `PreviewPanelComponent`
Live-Vorschau:
- iframe-basiertes Rendering
- Refresh-Funktion
- Error Display
- Loading States

#### `TerminalComponent`
Simulated Terminal:
- Log Output
- Timestamp Display
- Color-coded Messages
- Auto-scroll

## Verwendung

1. Navigieren Sie zu `/playground`
2. Bearbeiten Sie die Dateien im Editor
3. Klicken Sie auf "Run" um den Code zu kompilieren
4. Sehen Sie die Live-Vorschau im Preview Panel
5. Überprüfen Sie Build-Logs im Terminal

### Tastenkombinationen

- `Cmd/Ctrl + S` - Datei speichern (automatisch)
- `Cmd/Ctrl + /` - Kommentar toggle
- `Cmd/Ctrl + D` - Nächstes Vorkommen auswählen
- `Cmd/Ctrl + F` - Suchen
- `Alt + ↑/↓` - Zeile verschieben

## Beispiel-Projekt

Das Playground startet mit einem vordefinierten Angular-Projekt:

```
src/
├── app/
│   ├── app.component.ts
│   └── app.module.ts
├── main.ts
├── index.html
└── styles.scss
```

## Features in Entwicklung

- [ ] Git Integration
- [ ] Package Manager (npm install)
- [ ] Multi-File Templates
- [ ] Code Snippets
- [ ] Keyboard Shortcuts Customization
- [ ] Theme Switcher (Light/Dark/Custom)
- [ ] Export to StackBlitz/CodeSandbox
- [ ] Collaborative Editing
- [ ] Code History/Undo

## Performance

- Lazy Loading von Monaco Editor
- Signal-basiertes State Management
- OnPush Change Detection
- Effiziente DOM-Updates
- Optimierte Bundle-Größe

## Browser-Kompatibilität

- Chrome/Edge (empfohlen)
- Firefox
- Safari
- Opera

## Best Practices

1. **Kleine Dateien**: Halten Sie Dateien klein für bessere Performance
2. **Fehlerbehandlung**: Überprüfen Sie das Terminal auf Fehler
3. **Regelmäßiges Speichern**: Exportieren Sie Ihr Projekt regelmäßig
4. **Browser-Cache**: Leeren Sie den Cache bei Problemen

## Troubleshooting

### Monaco Editor lädt nicht
- Überprüfen Sie Ihre Internetverbindung (CDN-Abhängigkeit)
- Leeren Sie Browser-Cache
- Deaktivieren Sie Ad-Blocker

### Compilation Fehler
- Prüfen Sie TypeScript Syntax
- Stellen Sie sicher, dass alle Importe korrekt sind
- Überprüfen Sie das Terminal für Details

### Preview zeigt nichts
- Klicken Sie auf "Run" Button
- Prüfen Sie auf Compilation Errors
- Aktualisieren Sie die Preview manuell

## Lizenz

Dieses Feature ist Teil des Portfolio-Projekts und für Demonstrationszwecke.
