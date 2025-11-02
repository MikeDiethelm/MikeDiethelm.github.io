import { Component, ChangeDetectionStrategy, signal, effect, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundCompilerService } from '../../../services/playground-compiler.service';

interface TerminalLine {
    type: 'info' | 'success' | 'error' | 'warning' | 'command';
    text: string;
    timestamp: Date;
}

@Component({
    selector: 'app-terminal',
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="terminal">
      <div class="terminal-header">
        <div class="header-tabs">
          <div class="tab active">
            <svg width="16" height="16" viewBox="0 0 16 16" class="tab-icon">
              <path fill="currentColor" d="M13.655 3.56L8.918.75a1.785 1.785 0 0 0-1.836 0L2.345 3.56a1.794 1.794 0 0 0-.91 1.557v5.766c0 .639.342 1.229.91 1.556l4.737 2.811a1.785 1.785 0 0 0 1.836 0l4.737-2.81a1.794 1.794 0 0 0 .91-1.557V5.117a1.794 1.794 0 0 0-.91-1.556zm-4.563 8.91v.458a.131.131 0 0 1-.066.115.132.132 0 0 1-.131 0l-.349-.202a.402.402 0 0 1-.201-.349V12.1a1.189 1.189 0 0 1-.561-.262 1.256 1.256 0 0 1-.373-.552.13.13 0 0 1 .04-.126.131.131 0 0 1 .128-.025l.418.153a.394.394 0 0 0 .296-.013.4.4 0 0 0 .199-.232c.024-.076.025-.156.003-.233a.4.4 0 0 0-.137-.209.385.385 0 0 0-.23-.084.69.69 0 0 0-.372.11 2.043 2.043 0 0 1-.933.298.579.579 0 0 1-.508-.159.582.582 0 0 1-.168-.496v-3.87a.582.582 0 0 1 .168-.496.579.579 0 0 1 .508-.159 2.043 2.043 0 0 1 .933.298.69.69 0 0 0 .372.11c.088.003.173-.025.23-.084a.4.4 0 0 0 .137-.209.399.399 0 0 0-.003-.233.4.4 0 0 0-.199-.232.394.394 0 0 0-.296-.013l-.418.153a.131.131 0 0 1-.128-.025.13.13 0 0 1-.04-.126c.06-.213.196-.398.373-.552.177-.154.385-.243.561-.262V5.63a.131.131 0 0 1 .066-.115.132.132 0 0 1 .131 0l.349.202c.125.072.201.208.201.349v.393a1.189 1.189 0 0 1 .561.262c.177.154.313.339.373.552a.13.13 0 0 1-.04.126.131.131 0 0 1-.128.025l-.418-.153a.394.394 0 0 0-.296.013.4.4 0 0 0-.199.232.399.399 0 0 0-.003.233.4.4 0 0 0 .137.209c.057.059.142.087.23.084a.69.69 0 0 0 .372-.11 2.043 2.043 0 0 1 .933-.298.579.579 0 0 1 .508.159.582.582 0 0 1 .168.496v3.87a.582.582 0 0 1-.168.496.579.579 0 0 1-.508.159 2.043 2.043 0 0 1-.933-.298.69.69 0 0 0-.372-.11.385.385 0 0 0-.23.084.4.4 0 0 0-.137.209.399.399 0 0 0 .003.233.4.4 0 0 0 .199.232c.094.046.199.058.296.013l.418-.153a.131.131 0 0 1 .128.025.13.13 0 0 1 .04.126 1.256 1.256 0 0 1-.373.552 1.189 1.189 0 0 1-.561.262z"/>
            </svg>
            <span>Terminal</span>
          </div>
        </div>
        
        <div class="header-actions">
          <button 
            class="action-button"
            (click)="clearTerminal()"
            title="Clear Terminal"
            aria-label="Clear terminal output">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path fill="currentColor" d="M10 3h3v1h-1v9l-1 1H4l-1-1V4H2V3h3V2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1zM9 2H6v1h3V2zM4 13h7V4H4v9zm2-8H5v7h1V5zm1 0h1v7H7V5zm2 0h1v7H9V5z"/>
            </svg>
          </button>
          
          <button 
            class="action-button"
            (click)="toggleTerminal()"
            title="Minimize Terminal"
            aria-label="Toggle terminal visibility">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path fill="currentColor" d="M14 7v1H3V7h11z"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="terminal-content" #terminalContent>
        <div class="terminal-lines">
          @for (line of lines(); track $index) {
            <div class="terminal-line" [class]="'line-' + line.type">
              <span class="line-timestamp">{{ formatTime(line.timestamp) }}</span>
              <span class="line-text">{{ line.text }}</span>
            </div>
          }
          
          @if (lines().length === 0) {
            <div class="terminal-welcome">
              <p>Welcome to Angular Playground Terminal</p>
              <p class="hint">Build output and logs will appear here</p>
            </div>
          }
        </div>
      </div>
    </div>
  `,
    styles: [`
    .terminal {
      display: flex;
      flex-direction: column;
      height: 100%;
      background: #1e1e1e;
      color: #cccccc;
      font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
    }

    .terminal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #252526;
      border-bottom: 1px solid #1e1e1e;
    }

    .header-tabs {
      display: flex;
    }

    .tab {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      background: #1e1e1e;
      color: #cccccc;
      font-size: 13px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      border-right: 1px solid #252526;

      &.active {
        background: #1e1e1e;
        border-bottom: 2px solid #007acc;
      }
    }

    .tab-icon {
      flex-shrink: 0;
    }

    .header-actions {
      display: flex;
      padding: 4px 8px;
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

      &:hover {
        background: #2a2d2e;
      }

      &:active {
        background: #1e1e1e;
      }

      svg {
        display: block;
      }
    }

    .terminal-content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 8px 12px;

      &::-webkit-scrollbar {
        width: 10px;
      }

      &::-webkit-scrollbar-track {
        background: #1e1e1e;
      }

      &::-webkit-scrollbar-thumb {
        background: #424242;
        border-radius: 5px;

        &:hover {
          background: #4e4e4e;
        }
      }
    }

    .terminal-lines {
      font-size: 13px;
      line-height: 1.6;
    }

    .terminal-line {
      display: flex;
      gap: 12px;
      margin-bottom: 2px;
      padding: 2px 0;

      &.line-info {
        color: #cccccc;
      }

      &.line-success {
        color: #4ec9b0;
      }

      &.line-error {
        color: #f48771;
      }

      &.line-warning {
        color: #dcdcaa;
      }

      &.line-command {
        color: #569cd6;
      }
    }

    .line-timestamp {
      color: #858585;
      flex-shrink: 0;
      font-size: 11px;
      padding-top: 2px;
    }

    .line-text {
      flex: 1;
      word-break: break-word;
    }

    .terminal-welcome {
      padding: 32px 16px;
      text-align: center;
      color: #858585;

      p {
        margin: 0 0 8px 0;
        font-size: 14px;

        &.hint {
          font-size: 12px;
          color: #6a6a6a;
        }
      }
    }
  `]
})
export class TerminalComponent {
    @ViewChild('terminalContent', { static: false })
    private terminalContent?: ElementRef<HTMLDivElement>;

    protected readonly lines = signal<TerminalLine[]>([]);
    private isMinimized = signal(false);

    constructor(private compiler: PlaygroundCompilerService) {
        // Watch for compilation logs
        effect(() => {
            const logs = this.compiler.logs();
            if (logs.length > 0) {
                this.updateLogs(logs);
            }
        });

        // Watch for compilation errors
        effect(() => {
            const errors = this.compiler.errors();
            if (errors.length > 0) {
                errors.forEach(error => {
                    this.addLine('error', error);
                });
            }
        });

        // Add welcome message
        this.addLine('info', 'Angular Playground Terminal initialized');
    }

    private updateLogs(logs: string[]): void {
        const currentLines = this.lines();
        const newLines: TerminalLine[] = [];

        logs.forEach(log => {
            // Parse log type from message
            let type: TerminalLine['type'] = 'info';
            let text = log;

            if (log.toLowerCase().includes('error')) {
                type = 'error';
            } else if (log.toLowerCase().includes('warning')) {
                type = 'warning';
            } else if (log.toLowerCase().includes('success')) {
                type = 'success';
            } else if (log.startsWith('[')) {
                // Extract timestamp and message
                const match = log.match(/\[(.*?)\]\s*(.*)/);
                if (match) {
                    text = match[2];
                }
            }

            // Check if this log is already in the terminal
            if (!currentLines.some(line => line.text === text)) {
                newLines.push({
                    type,
                    text,
                    timestamp: new Date()
                });
            }
        });

        if (newLines.length > 0) {
            this.lines.set([...currentLines, ...newLines]);
            this.scrollToBottom();
        }
    }

    protected addLine(type: TerminalLine['type'], text: string): void {
        const line: TerminalLine = {
            type,
            text,
            timestamp: new Date()
        };

        this.lines.set([...this.lines(), line]);
        this.scrollToBottom();
    }

    protected clearTerminal(): void {
        this.lines.set([]);
        this.compiler.clearLogs();
        this.addLine('info', 'Terminal cleared');
    }

    protected toggleTerminal(): void {
        this.isMinimized.set(!this.isMinimized());
    }

    protected formatTime(date: Date): string {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    }

    private scrollToBottom(): void {
        setTimeout(() => {
            if (this.terminalContent) {
                const element = this.terminalContent.nativeElement;
                element.scrollTop = element.scrollHeight;
            }
        }, 0);
    }

    // Public methods for external use
    log(message: string): void {
        this.addLine('info', message);
    }

    success(message: string): void {
        this.addLine('success', message);
    }

    error(message: string): void {
        this.addLine('error', message);
    }

    warning(message: string): void {
        this.addLine('warning', message);
    }

    command(message: string): void {
        this.addLine('command', `$ ${message}`);
    }
}
