import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlaygroundFileSystemService, FileNode } from '../../../services/playground-file-system.service';

// Monaco Editor types
declare const monaco: any;

@Component({
    selector: 'app-code-editor',
    imports: [CommonModule, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="code-editor">
      <div class="editor-tabs">
        @for (tab of tabs(); track tab.id) {
          <div 
            class="tab"
            [class.active]="activeTab()?.id === tab.id"
            (click)="selectTab(tab)">
            <div class="tab-icon">
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path [attr.fill]="getFileIconColor(tab.name)" d="M13.71 4.29l-3-3L10 1H4L3 2v12l1 1h9l1-1V5l-.29-.71zM13 14H4V2h5v4h4v8zm-3-9V2l3 3h-3z"/>
              </svg>
            </div>
            <span class="tab-label">{{ tab.name }}</span>
            <button 
              class="tab-close"
              (click)="closeTab($event, tab)"
              aria-label="Close {{ tab.name }}">
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path fill="currentColor" d="M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z"/>
              </svg>
            </button>
          </div>
        }
      </div>

      <div class="editor-container" #editorContainer></div>
    </div>
  `,
    styles: [`
    .code-editor {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: #1e1e1e;
    }

    .editor-tabs {
      display: flex;
      background: #252526;
      border-bottom: 1px solid #1e1e1e;
      overflow-x: auto;
      
      &::-webkit-scrollbar {
        height: 3px;
      }

      &::-webkit-scrollbar-track {
        background: #252526;
      }

      &::-webkit-scrollbar-thumb {
        background: #424242;
      }
    }

    .tab {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 12px;
      background: #2d2d30;
      color: #969696;
      border-right: 1px solid #1e1e1e;
      cursor: pointer;
      font-size: 13px;
      white-space: nowrap;
      min-width: 120px;
      transition: background-color 0.15s;

      &:hover {
        background: #2a2d2e;

        .tab-close {
          opacity: 1;
        }
      }

      &.active {
        background: #1e1e1e;
        color: #ffffff;
        border-bottom: 2px solid #007acc;
      }
    }

    .tab-icon {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        display: block;
      }
    }

    .tab-label {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .tab-close {
      flex-shrink: 0;
      background: transparent;
      border: none;
      padding: 2px;
      cursor: pointer;
      color: inherit;
      opacity: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
      transition: opacity 0.15s, background-color 0.15s;

      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }

      svg {
        display: block;
      }
    }

    .editor-container {
      flex: 1;
      overflow: hidden;
    }
  `]
})
export class CodeEditorComponent implements OnInit, OnDestroy {
    protected readonly tabs = this.fileSystem.tabs;
    protected readonly activeTab = this.fileSystem.activeEditor;

    private editor: any = null;
    private monacoLoaded = signal(false);
    private isLoadingFile = false; // Prevent circular updates

    constructor(private fileSystem: PlaygroundFileSystemService) {
        // Watch for active tab changes
        effect(() => {
            const tab = this.activeTab();
            if (tab && this.editor && this.monacoLoaded()) {
                this.loadFileIntoEditor(tab);
            }
        });
    }

    ngOnInit(): void {
        this.loadMonacoEditor();
    }

    ngOnDestroy(): void {
        if (this.editor) {
            this.editor.dispose();
        }
    }

    private async loadMonacoEditor(): Promise<void> {
        // Load Monaco Editor from CDN
        if (typeof monaco !== 'undefined') {
            this.initializeEditor();
            return;
        }

        // Load Monaco Editor dynamically
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs/loader.min.js';
        script.onload = () => {
            (window as any).require.config({
                paths: {
                    vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.52.2/min/vs'
                }
            });

            (window as any).require(['vs/editor/editor.main'], () => {
                this.initializeEditor();
            });
        };

        document.head.appendChild(script);
    }

    private initializeEditor(): void {
        const container = document.querySelector('.editor-container');
        if (!container) return;

        this.editor = monaco.editor.create(container, {
            value: '',
            language: 'typescript',
            theme: 'vs-dark',
            automaticLayout: true,
            fontSize: 14,
            lineNumbers: 'on',
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            wrappingStrategy: 'advanced',
            tabSize: 2,
            insertSpaces: true,
            formatOnPaste: true,
            formatOnType: true,
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnCommitCharacter: true,
            quickSuggestions: {
                other: true,
                comments: true,
                strings: true
            },
            parameterHints: {
                enabled: true
            },
            hover: {
                enabled: true
            }
        });

        // Listen for content changes
        this.editor.onDidChangeModelContent(() => {
            if (this.isLoadingFile) return; // Skip updates during file loading

            const currentFile = this.activeTab();
            if (currentFile) {
                const content = this.editor.getValue();
                // Only update if content actually changed
                if (content !== currentFile.content) {
                    this.fileSystem.updateFileContent(currentFile, content);
                }
            }
        });

        // Configure TypeScript compiler options
        if (monaco.languages.typescript) {
            monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
                target: monaco.languages.typescript.ScriptTarget.ES2020,
                allowNonTsExtensions: true,
                moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
                module: monaco.languages.typescript.ModuleKind.CommonJS,
                noEmit: true,
                esModuleInterop: true,
                jsx: monaco.languages.typescript.JsxEmit.React,
                allowJs: true,
                typeRoots: ['node_modules/@types']
            });

            // Add Angular types
            monaco.languages.typescript.typescriptDefaults.addExtraLib(`
        declare module '@angular/core' {
          export function Component(options: any): any;
          export function NgModule(options: any): any;
          export function Injectable(options: any): any;
          export function Input(): any;
          export function Output(): any;
          export class EventEmitter<T> {}
        }
        
        declare module '@angular/platform-browser' {
          export class BrowserModule {}
        }
        
        declare module '@angular/platform-browser-dynamic' {
          export function platformBrowserDynamic(): any;
        }
      `, 'ts:angular-core.d.ts');
        }

        this.monacoLoaded.set(true);

        // Load initial file if one is active
        const currentTab = this.activeTab();
        if (currentTab) {
            this.loadFileIntoEditor(currentTab);
        }
    }

    private loadFileIntoEditor(file: FileNode): void {
        if (!this.editor) return;

        this.isLoadingFile = true; // Prevent content change events

        // Dispose old model to prevent memory leaks
        const oldModel = this.editor.getModel();

        const language = this.getMonacoLanguage(file.name);
        const uri = monaco.Uri.file(file.path || file.name);

        // Check if model already exists
        let model = monaco.editor.getModel(uri);

        if (!model) {
            // Create new model
            model = monaco.editor.createModel(
                file.content || '',
                language,
                uri
            );
        } else {
            // Update existing model content if different
            const currentContent = model.getValue();
            if (currentContent !== (file.content || '')) {
                model.setValue(file.content || '');
            }
        }

        this.editor.setModel(model);

        // Dispose old model only if it's different and not used anymore
        if (oldModel && oldModel !== model) {
            // Check if any other tab uses this model
            const stillInUse = this.tabs().some(tab => {
                const tabUri = monaco.Uri.file(tab.path || tab.name);
                return oldModel === monaco.editor.getModel(tabUri);
            });

            if (!stillInUse) {
                oldModel.dispose();
            }
        }

        // Re-enable content change events after a short delay
        setTimeout(() => {
            this.isLoadingFile = false;
        }, 100);
    }

    private getMonacoLanguage(filename: string): string {
        const ext = filename.split('.').pop()?.toLowerCase() || '';
        const languageMap: Record<string, string> = {
            'ts': 'typescript',
            'js': 'javascript',
            'html': 'html',
            'css': 'css',
            'scss': 'scss',
            'json': 'json',
            'md': 'markdown'
        };

        return languageMap[ext] || 'plaintext';
    }

    protected getFileIconColor(filename: string): string {
        const ext = filename.split('.').pop()?.toLowerCase() || '';
        const iconColors: Record<string, string> = {
            'ts': '#3178c6',
            'html': '#e34c26',
            'scss': '#cc6699',
            'css': '#1572b6',
            'json': '#f0db4f',
            'md': '#083fa1'
        };

        return iconColors[ext] || '#cccccc';
    }

    protected selectTab(tab: FileNode): void {
        this.fileSystem.setActiveTab(tab);
    }

    protected closeTab(event: MouseEvent, tab: FileNode): void {
        event.stopPropagation();
        this.fileSystem.closeTab(tab);
    }
}
