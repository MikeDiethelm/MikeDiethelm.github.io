import { Component, ChangeDetectionStrategy, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PlaygroundCompilerService } from '../../../services/playground-compiler.service';

@Component({
    selector: 'app-preview-panel',
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="preview-panel">
      <div class="preview-header">
        <div class="header-left">
          <svg width="16" height="16" viewBox="0 0 16 16" class="preview-icon">
            <path fill="currentColor" d="M1 3l1-1h12l1 1v10l-1 1H2l-1-1V3zm1 0v10h12V3H2z"/>
            <path fill="currentColor" d="M13 6H3V5h10v1zm0 2H3V7h10v1zm-6 2H3V9h4v1z"/>
          </svg>
          <span class="header-title">Preview</span>
        </div>
        
        <div class="header-actions">
          <button 
            class="action-button"
            (click)="refresh()"
            [disabled]="isCompiling()"
            title="Refresh Preview"
            aria-label="Refresh preview">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path fill="currentColor" d="M13.451 5.609l-.579-.939-1.068.812-.076.094c-.335.415-.927 1.341-1.124 2.876l-.021.165.033.163.071.345c0 1.654-1.346 3-3 3-.795 0-1.545-.311-2.107-.868l-.115-.125-.193.25-.176.228c-.371.48-.879 1.075-1.507 1.446l-.244.143.221.22 1.021 1.02.516-.513c.591-.591 1.243-1.367 1.688-2.107.314.095.618.147.935.147 2.206 0 4-1.794 4-4 0-1.111-.433-2.117-1.139-2.867l.149-.191.106-.163.157-.24.173-.259.103-.163.087-.155.071-.15.054-.161.035-.177.017-.204-.017-.204-.035-.177-.054-.161-.071-.15-.087-.155-.103-.163-.173-.259-.157-.24-.106-.163-.149-.191z"/>
            </svg>
          </button>
          
          <button 
            class="action-button"
            (click)="openInNewTab()"
            [disabled]="!previewUrl()"
            title="Open in New Tab"
            aria-label="Open preview in new tab">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path fill="currentColor" d="M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14 8.5 9.5 3z"/>
              <path fill="currentColor" d="M2 7h8v2H2V7z"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="preview-content">
        @if (isCompiling()) {
          <div class="preview-loading">
            <div class="spinner"></div>
            <p>Compiling...</p>
          </div>
        } @else if (error()) {
          <div class="preview-error">
            <svg width="48" height="48" viewBox="0 0 16 16">
              <path fill="#f48771" d="M8.568 1.031A6.8 6.8 0 0 1 12.76 3.05a7.06 7.06 0 0 1 .46 9.39 6.85 6.85 0 0 1-8.58 1.74 7 7 0 0 1-3.12-3.5 7.12 7.12 0 0 1-.23-4.71 7 7 0 0 1 2.77-3.79 6.8 6.8 0 0 1 4.508-1.149zM9.04 13.88a5.89 5.89 0 0 0 3.41-2.07 6.07 6.07 0 0 0-.4-8.06 5.82 5.82 0 0 0-7.43-.74 6.06 6.06 0 0 0 .5 10.29 5.81 5.81 0 0 0 3.92.58zM7.375 6h1.25V5h-1.25v1zm1.25 1v4h-1.25V7h1.25z"/>
            </svg>
            <h3>Compilation Error</h3>
            <pre>{{ error() }}</pre>
          </div>
        } @else if (previewUrl()) {
          <iframe 
            [src]="previewUrl()"
            class="preview-iframe"
            sandbox="allow-scripts allow-same-origin"
            title="Code Preview">
          </iframe>
        } @else {
          <div class="preview-empty">
            <svg width="64" height="64" viewBox="0 0 16 16">
              <path fill="#858585" d="M14.5 2H7.71l-.85-.85L6.51 1h-5l-.5.5v11l.5.5h13l.5-.5v-10L14.5 2zM7 5V2h7v3H7zm7 8H2V3h4.29l.85.85.36.15H13v9z"/>
            </svg>
            <p>No preview available</p>
            <p class="hint">Click "Run" to compile and preview your code</p>
          </div>
        }
      </div>
    </div>
  `,
    styles: [`
    .preview-panel {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: #1e1e1e;
      color: #cccccc;
    }

    .preview-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      background: #252526;
      border-bottom: 1px solid #1e1e1e;
      font-size: 11px;
      font-weight: 600;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .preview-icon {
      flex-shrink: 0;
    }

    .header-title {
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .header-actions {
      display: flex;
      gap: 4px;
    }

    .action-button {
      background: transparent;
      border: none;
      color: #cccccc;
      padding: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
      transition: background-color 0.15s;

      &:hover:not(:disabled) {
        background: #2a2d2e;
      }

      &:active:not(:disabled) {
        background: #1e1e1e;
      }

      &:disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }

      svg {
        display: block;
      }
    }

    .preview-content {
      flex: 1;
      position: relative;
      overflow: hidden;
      background: #1e1e1e;
    }

    .preview-iframe {
      width: 100%;
      height: 100%;
      border: none;
      background: white;
    }

    .preview-loading,
    .preview-error,
    .preview-empty {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
      padding: 32px;
      text-align: center;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #3c3c3c;
      border-top-color: #007acc;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .preview-error {
      color: #f48771;

      h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 500;
      }

      pre {
        background: #1e1e1e;
        border: 1px solid #3c3c3c;
        border-radius: 4px;
        padding: 16px;
        max-width: 600px;
        overflow: auto;
        text-align: left;
        font-size: 13px;
        line-height: 1.5;
        color: #cccccc;
      }
    }

    .preview-empty {
      color: #858585;

      p {
        margin: 0;
        font-size: 14px;

        &.hint {
          font-size: 13px;
          color: #6a6a6a;
        }
      }
    }
  `]
})
export class PreviewPanelComponent {
    protected readonly isCompiling = this.compiler.compiling;
    protected readonly error = signal<string | null>(null);
    protected readonly previewUrl = signal<SafeResourceUrl | null>(null);

    constructor(
        private compiler: PlaygroundCompilerService,
        private sanitizer: DomSanitizer
    ) {
        // Watch for compilation results
        effect(() => {
            if (!this.isCompiling()) {
                const errors = this.compiler.errors();
                if (errors.length > 0) {
                    this.error.set(errors.join('\n'));
                    this.previewUrl.set(null);
                }
            }
        });
    }

    async refresh(): Promise<void> {
        this.error.set(null);

        const result = await this.compiler.compile();

        if (result.success && result.output) {
            // Create a blob URL for the preview
            const blob = new Blob([result.output], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
            this.previewUrl.set(safeUrl);
        } else if (result.error) {
            this.error.set(result.error);
            this.previewUrl.set(null);
        }
    }

    openInNewTab(): void {
        const url = this.previewUrl();
        if (url) {
            // Extract the actual URL from SafeResourceUrl
            const urlString = (url as any).changingThisBreaksApplicationSecurity;
            window.open(urlString, '_blank');
        }
    }
}
