import { Component, ChangeDetectionStrategy, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileExplorerComponent } from './file-explorer/file-explorer';
import { CodeEditorComponent } from './code-editor/code-editor';
import { PreviewPanelComponent } from './preview-panel/preview-panel';
import { TerminalComponent } from './terminal/terminal';
import { PlaygroundFileSystemService } from '../../services/playground-file-system.service';
import { PlaygroundCompilerService } from '../../services/playground-compiler.service';

@Component({
    selector: 'app-code-playground',
    imports: [
        CommonModule,
        FileExplorerComponent,
        CodeEditorComponent,
        PreviewPanelComponent,
        TerminalComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="playground-container">
      <!-- Activity Bar (VS Code Style) -->
      <div class="activity-bar">
        <div class="activity-items">
          <button 
            class="activity-item"
            [class.active]="activeView() === 'explorer'"
            (click)="setActiveView('explorer')"
            title="Explorer"
            aria-label="Open file explorer">
            <svg width="24" height="24" viewBox="0 0 16 16">
              <path fill="currentColor" d="M14.5 2H7.71l-.85-.85L6.51 1h-5l-.5.5v11l.5.5h13l.5-.5v-10L14.5 2zM7 5V2h7v3H7zm7 8H2V3h4.29l.85.85.36.15H13v9z"/>
            </svg>
          </button>
          
          <button 
            class="activity-item"
            [class.active]="activeView() === 'search'"
            (click)="setActiveView('search')"
            title="Search"
            aria-label="Search files">
            <svg width="24" height="24" viewBox="0 0 16 16">
              <path fill="currentColor" d="M15.7 13.3l-3.81-3.83A5.93 5.93 0 0 0 13 6c0-3.31-2.69-6-6-6S1 2.69 1 6s2.69 6 6 6c1.3 0 2.48-.41 3.47-1.11l3.83 3.81c.19.2.45.3.7.3.25 0 .52-.09.7-.3a.996.996 0 0 0 0-1.41v.01zM7 10.7c-2.59 0-4.7-2.11-4.7-4.7 0-2.59 2.11-4.7 4.7-4.7 2.59 0 4.7 2.11 4.7 4.7 0 2.59-2.11 4.7-4.7 4.7z"/>
            </svg>
          </button>
          
          <button 
            class="activity-item"
            title="Settings"
            aria-label="Open settings">
            <svg width="24" height="24" viewBox="0 0 16 16">
              <path fill="currentColor" d="M9.1 4.4L8.6 2H7.4l-.5 2.4-.7.3-2-1.3-.9.8 1.3 2-.3.7-2.4.5v1.2l2.4.5.3.7-1.3 2 .8.9 2-1.3.7.3.5 2.4h1.2l.5-2.4.7-.3 2 1.3.9-.8-1.3-2 .3-.7 2.4-.5V7.4l-2.4-.5-.3-.7 1.3-2-.8-.9-2 1.3-.7-.3zM9.4 1l.5 2.4L12 2.1l2 2-1.4 2.1 2.4.4v2.8l-2.4.5L14 12l-2 2-2.1-1.4-.5 2.4H6.6l-.5-2.4L4 13.9l-2-2 1.4-2.1L1 9.4V6.6l2.4-.5L2.1 4l2-2 2.1 1.4.4-2.4h2.8zm.6 7c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zM8 9c.6 0 1-.4 1-1s-.4-1-1-1-1 .4-1 1 .4 1 1 1z"/>
            </svg>
          </button>
        </div>

        <div class="activity-bottom">
          <button 
            class="activity-item"
            (click)="exportProject()"
            title="Export Project"
            aria-label="Export project">
            <svg width="24" height="24" viewBox="0 0 16 16">
              <path fill="currentColor" d="M13.85 4.44l-3.28-3.3-.35-.14H2.5l-.5.5v13l.5.5h11l.5-.5V4.8l-.15-.36zM13 14H3V2h6v3h4v9zm-3-9V2l3 3h-3z"/>
            </svg>
          </button>
          
          <button 
            class="activity-item"
            (click)="importProject()"
            title="Import Project"
            aria-label="Import project">
            <svg width="24" height="24" viewBox="0 0 16 16">
              <path fill="currentColor" d="M14 2v12H2V2h12zm1-1H1v14h14V1zm-4.354 5.646l-.708.708L12.293 9H6v1h6.293l-2.355 2.354.708.707L14 9.707V9l-3.354-3.354z"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Sidebar -->
      <div class="sidebar" [class.collapsed]="activeView() === null">
        @if (activeView() === 'explorer') {
          <app-file-explorer />
        }
      </div>

      <!-- Main Content -->
      <div class="main-content">
        <!-- Top Toolbar -->
        <div class="toolbar">
          <div class="toolbar-left">
            <span class="toolbar-title">Angular Playground</span>
          </div>
          
          <div class="toolbar-center">
            <div class="action-buttons">
              <button 
                class="toolbar-button primary"
                (click)="runCode()"
                [disabled]="isRunning()"
                aria-label="Run code">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path fill="currentColor" d="M4 2.5v11L13 8 4 2.5z"/>
                </svg>
                <span>Run</span>
              </button>
              
              <button 
                class="toolbar-button"
                (click)="stopCode()"
                [disabled]="!isRunning()"
                aria-label="Stop execution">
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path fill="currentColor" d="M12 3H4v10h8V3z"/>
                </svg>
                <span>Stop</span>
              </button>
            </div>
          </div>
          
          <div class="toolbar-right">
            <button 
              class="toolbar-button icon-only"
              (click)="togglePreview()"
              [title]="showPreview() ? 'Hide Preview' : 'Show Preview'"
              [attr.aria-label]="showPreview() ? 'Hide preview panel' : 'Show preview panel'">
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path fill="currentColor" d="M1 3l1-1h12l1 1v10l-1 1H2l-1-1V3zm1 0v10h6V3H2zm7 0v10h5V3H9z"/>
              </svg>
            </button>
            
            <button 
              class="toolbar-button icon-only"
              (click)="toggleTerminal()"
              [title]="showTerminal() ? 'Hide Terminal' : 'Show Terminal'"
              [attr.aria-label]="showTerminal() ? 'Hide terminal' : 'Show terminal'">
              <svg width="16" height="16" viewBox="0 0 16 16">
                <path fill="currentColor" d="M13.655 3.56L8.918.75a1.785 1.785 0 0 0-1.836 0L2.345 3.56a1.794 1.794 0 0 0-.91 1.557v5.766c0 .639.342 1.229.91 1.556l4.737 2.811a1.785 1.785 0 0 0 1.836 0l4.737-2.81a1.794 1.794 0 0 0 .91-1.557V5.117a1.794 1.794 0 0 0-.91-1.556z"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Editor and Preview Area -->
        <div class="content-area">
          <div class="editor-section" [class.full-width]="!showPreview()">
            <app-code-editor />
          </div>

          @if (showPreview()) {
            <div class="resizer" 
                 (mousedown)="startResize($event)"></div>
            
            <div class="preview-section" [style.width.%]="previewWidth()">
              <app-preview-panel />
            </div>
          }
        </div>

        <!-- Terminal Panel -->
        @if (showTerminal()) {
          <div class="terminal-section">
            <div class="horizontal-resizer"
                 (mousedown)="startVerticalResize($event)"></div>
            <div class="terminal-wrapper" [style.height.px]="terminalHeight()">
              <app-terminal />
            </div>
          </div>
        }
      </div>
    </div>
  `,
    styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .playground-container {
      display: flex;
      width: 100%;
      height: 100%;
      background: #1e1e1e;
      color: #cccccc;
      overflow: hidden;
    }

    .activity-bar {
      width: 48px;
      background: #333333;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-right: 1px solid #1e1e1e;
      flex-shrink: 0;
    }

    .activity-items,
    .activity-bottom {
      display: flex;
      flex-direction: column;
    }

    .activity-item {
      width: 48px;
      height: 48px;
      background: transparent;
      border: none;
      color: #cccccc;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background-color 0.15s;
      border-left: 2px solid transparent;

      &:hover {
        background: #2a2d2e;
      }

      &.active {
        background: #1e1e1e;
        border-left-color: #007acc;
      }

      svg {
        display: block;
      }
    }

    .sidebar {
      width: 250px;
      background: #252526;
      border-right: 1px solid #1e1e1e;
      transition: width 0.2s ease;
      overflow: hidden;
      flex-shrink: 0;

      &.collapsed {
        width: 0;
      }
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8px 16px;
      background: #2d2d30;
      border-bottom: 1px solid #1e1e1e;
      min-height: 50px;
    }

    .toolbar-left,
    .toolbar-center,
    .toolbar-right {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .toolbar-title {
      font-weight: 600;
      font-size: 14px;
    }

    .action-buttons {
      display: flex;
      gap: 8px;
    }

    .toolbar-button {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 16px;
      background: #3c3c3c;
      border: 1px solid #3c3c3c;
      color: #cccccc;
      border-radius: 3px;
      cursor: pointer;
      font-size: 13px;
      transition: all 0.15s;

      &:hover:not(:disabled) {
        background: #505050;
        border-color: #505050;
      }

      &:active:not(:disabled) {
        background: #2d2d30;
      }

      &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      &.primary {
        background: #0e639c;
        border-color: #0e639c;

        &:hover:not(:disabled) {
          background: #1177bb;
          border-color: #1177bb;
        }

        &:active:not(:disabled) {
          background: #0d5a91;
        }
      }

      &.icon-only {
        padding: 6px;
      }

      svg {
        display: block;
      }
    }

    .content-area {
      flex: 1;
      display: flex;
      overflow: hidden;
      position: relative;
    }

    .editor-section {
      flex: 1;
      min-width: 200px;
      overflow: hidden;

      &.full-width {
        flex: 1;
        max-width: 100%;
      }
    }

    .resizer {
      width: 4px;
      background: #1e1e1e;
      cursor: col-resize;
      transition: background-color 0.15s;
      flex-shrink: 0;

      &:hover {
        background: #007acc;
      }
    }

    .preview-section {
      min-width: 200px;
      overflow: hidden;
    }

    .terminal-section {
      border-top: 1px solid #1e1e1e;
      display: flex;
      flex-direction: column;
    }

    .horizontal-resizer {
      height: 4px;
      background: #1e1e1e;
      cursor: row-resize;
      transition: background-color 0.15s;

      &:hover {
        background: #007acc;
      }
    }

    .terminal-wrapper {
      overflow: hidden;
    }
  `]
})
export class CodePlaygroundComponent {
    @ViewChild(PreviewPanelComponent)
    private previewPanel?: PreviewPanelComponent;

    @ViewChild(TerminalComponent)
    private terminal?: TerminalComponent;

    protected readonly activeView = signal<'explorer' | 'search' | null>('explorer');
    protected readonly showPreview = signal(true);
    protected readonly showTerminal = signal(true);
    protected readonly isRunning = signal(false);
    protected readonly previewWidth = signal(50);
    protected readonly terminalHeight = signal(200);

    private isResizing = false;
    private isVerticalResizing = false;

    constructor(
        private fileSystem: PlaygroundFileSystemService,
        private compiler: PlaygroundCompilerService
    ) { }

    protected setActiveView(view: 'explorer' | 'search'): void {
        if (this.activeView() === view) {
            this.activeView.set(null);
        } else {
            this.activeView.set(view);
        }
    }

    protected togglePreview(): void {
        this.showPreview.set(!this.showPreview());
    }

    protected toggleTerminal(): void {
        this.showTerminal.set(!this.showTerminal());
    }

    protected async runCode(): Promise<void> {
        this.isRunning.set(true);

        if (this.terminal) {
            this.terminal.command('npm run build');
        }

        try {
            if (this.previewPanel) {
                await this.previewPanel.refresh();
            }

            if (this.terminal) {
                this.terminal.success('Build completed successfully!');
            }
        } catch (error) {
            if (this.terminal) {
                this.terminal.error(`Build failed: ${error}`);
            }
        } finally {
            this.isRunning.set(false);
        }
    }

    protected stopCode(): void {
        this.isRunning.set(false);
        if (this.terminal) {
            this.terminal.warning('Execution stopped');
        }
    }

    protected exportProject(): void {
        const json = this.fileSystem.exportProject();
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'playground-project.json';
        a.click();
        URL.revokeObjectURL(url);

        if (this.terminal) {
            this.terminal.success('Project exported successfully');
        }
    }

    protected importProject(): void {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const json = event.target?.result as string;
                    this.fileSystem.importProject(json);

                    if (this.terminal) {
                        this.terminal.success('Project imported successfully');
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    protected startResize(event: MouseEvent): void {
        this.isResizing = true;
        event.preventDefault();

        const onMouseMove = (e: MouseEvent) => {
            if (!this.isResizing) return;

            const container = document.querySelector('.content-area');
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const percentage = ((e.clientX - rect.left) / rect.width) * 100;

            this.previewWidth.set(Math.max(20, Math.min(80, 100 - percentage)));
        };

        const onMouseUp = () => {
            this.isResizing = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    protected startVerticalResize(event: MouseEvent): void {
        this.isVerticalResizing = true;
        event.preventDefault();

        const onMouseMove = (e: MouseEvent) => {
            if (!this.isVerticalResizing) return;

            const container = document.querySelector('.main-content');
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const height = rect.bottom - e.clientY;

            this.terminalHeight.set(Math.max(100, Math.min(600, height)));
        };

        const onMouseUp = () => {
            this.isVerticalResizing = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }
}
