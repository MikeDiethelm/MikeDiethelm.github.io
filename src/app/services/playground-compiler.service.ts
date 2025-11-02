import { Injectable, signal } from '@angular/core';
import { PlaygroundFileSystemService, FileNode } from './playground-file-system.service';

export interface CompileResult {
    success: boolean;
    output?: string;
    error?: string;
    logs: string[];
}

@Injectable({
    providedIn: 'root'
})
export class PlaygroundCompilerService {
    private isCompiling = signal(false);
    private compileErrors = signal<string[]>([]);
    private compileLogs = signal<string[]>([]);

    readonly compiling = this.isCompiling.asReadonly();
    readonly errors = this.compileErrors.asReadonly();
    readonly logs = this.compileLogs.asReadonly();

    constructor(private fileSystem: PlaygroundFileSystemService) { }

    async compile(): Promise<CompileResult> {
        this.isCompiling.set(true);
        this.compileErrors.set([]);
        this.compileLogs.set(['Starting compilation...']);

        try {
            const files = this.fileSystem.getAllFiles();
            const appComponentFile = files.find(f => f.name === 'app.component.ts');

            if (!appComponentFile || !appComponentFile.content) {
                throw new Error('app.component.ts not found or empty');
            }

            // Extract component metadata from code
            const componentCode = appComponentFile.content;
            const templateMatch = componentCode.match(/template:\s*`([^`]*)`/s);
            const stylesMatch = componentCode.match(/styles:\s*\[`([^`]*)`\]/s);

            if (!templateMatch) {
                throw new Error('No template found in component');
            }

            const template = templateMatch[1];
            const styles = stylesMatch ? stylesMatch[1] : '';

            this.addLog('Template extracted successfully');
            this.addLog('Styles extracted successfully');

            // Basic TypeScript validation
            this.validateTypeScript(componentCode);

            this.addLog('Compilation successful!');

            this.isCompiling.set(false);

            return {
                success: true,
                output: this.generatePreviewHTML(template, styles, componentCode),
                logs: this.compileLogs()
            };
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            this.compileErrors.set([errorMessage]);
            this.addLog(`Error: ${errorMessage}`);

            this.isCompiling.set(false);

            return {
                success: false,
                error: errorMessage,
                logs: this.compileLogs()
            };
        }
    }

    private validateTypeScript(code: string): void {
        // Basic syntax checks
        const braceCount = (code.match(/{/g) || []).length - (code.match(/}/g) || []).length;
        if (braceCount !== 0) {
            throw new Error(`Syntax error: Mismatched braces (${braceCount > 0 ? 'missing }' : 'extra }'}`);
        }

        const parenCount = (code.match(/\(/g) || []).length - (code.match(/\)/g) || []).length;
        if (parenCount !== 0) {
            throw new Error(`Syntax error: Mismatched parentheses`);
        }

        // Check for common syntax errors
        if (code.includes('import {') && !code.includes("from '@angular/core'")) {
            this.addLog('Warning: Missing Angular core imports');
        }

        if (!code.includes('@Component')) {
            throw new Error('No @Component decorator found');
        }

        if (!code.includes('export class')) {
            throw new Error('No exported class found');
        }

        this.addLog('TypeScript validation passed');
    }

    private generatePreviewHTML(template: string, styles: string, componentCode: string): string {
        // Extract class properties and methods
        const classMatch = componentCode.match(/export class \w+ {([^}]*)}/s);
        const classBody = classMatch ? classMatch[1] : '';

        // Extract properties with initial values
        const properties = this.extractProperties(classBody);
        const methods = this.extractMethods(classBody);

        return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Preview</title>
  <style>
    ${styles}
    body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
  </style>
</head>
<body>
  <div id="app"></div>
  
  <script>
    // Simple reactive system
    class ComponentState {
      constructor(initialData) {
        this.data = initialData;
        this.listeners = [];
      }
      
      update(key, value) {
        this.data[key] = value;
        this.notify();
      }
      
      subscribe(listener) {
        this.listeners.push(listener);
      }
      
      notify() {
        this.listeners.forEach(listener => listener(this.data));
      }
    }
    
    // Initialize component state
    const state = new ComponentState(${JSON.stringify(properties)});
    
    // Component methods
    const methods = {
      ${methods}
    };
    
    // Bind methods to state
    Object.keys(methods).forEach(key => {
      methods[key] = methods[key].bind({ 
        ...state.data, 
        update: (k, v) => state.update(k, v)
      });
    });
    
    // Render function
    function render() {
      const template = \`${this.escapeTemplate(template)}\`;
      const data = state.data;
      
      // Simple template interpolation
      let html = template.replace(/{{\\s*([^}]+)\\s*}}/g, (match, expr) => {
        try {
          return eval(expr.trim()) || '';
        } catch (e) {
          return match;
        }
      });
      
      document.getElementById('app').innerHTML = html;
      
      // Re-attach event listeners
      ${this.generateEventListeners(template)}
    }
    
    // Subscribe to state changes
    state.subscribe(render);
    
    // Initial render
    render();
  </script>
</body>
</html>
    `;
    }

    private extractProperties(classBody: string): Record<string, any> {
        const properties: Record<string, any> = {};
        const propRegex = /(\w+)\s*=\s*([^;]+);/g;
        let match;

        while ((match = propRegex.exec(classBody)) !== null) {
            const [, name, value] = match;
            try {
                // Try to evaluate simple values
                if (value.startsWith("'") || value.startsWith('"')) {
                    properties[name] = value.slice(1, -1);
                } else if (!isNaN(Number(value))) {
                    properties[name] = Number(value);
                } else if (value === 'true' || value === 'false') {
                    properties[name] = value === 'true';
                } else {
                    properties[name] = value.trim();
                }
            } catch (e) {
                properties[name] = value.trim();
            }
        }

        return properties;
    }

    private extractMethods(classBody: string): string {
        const methods: string[] = [];
        const methodRegex = /(\w+)\s*\([^)]*\)\s*{([^}]*)}/g;
        let match;

        while ((match = methodRegex.exec(classBody)) !== null) {
            const [, name, body] = match;
            // Convert Angular property updates to state updates
            let methodBody = body
                .replace(/this\.(\w+)\s*=/g, "this.update('$1',")
                .replace(/;/g, ');');

            methods.push(`${name}: function() { ${methodBody} }`);
        }

        return methods.join(',\n      ');
    }

    private generateEventListeners(template: string): string {
        const listeners: string[] = [];
        const eventRegex = /\((\w+)\)="(\w+)\(\)"/g;
        let match;

        while ((match = eventRegex.exec(template)) !== null) {
            const [, event, method] = match;
            listeners.push(`
      document.querySelectorAll('[data-${event}="${method}"]').forEach(el => {
        el.addEventListener('${event}', methods.${method});
      });
      `);
        }

        // Replace event bindings with data attributes
        return listeners.join('\n');
    }

    private escapeTemplate(template: string): string {
        return template
            .replace(/`/g, '\\`')
            .replace(/\((\w+)\)="(\w+)\(\)"/g, 'data-$1="$2"')
            .replace(/\n/g, ' ');
    }

    private addLog(message: string): void {
        this.compileLogs.set([...this.compileLogs(), `[${new Date().toLocaleTimeString()}] ${message}`]);
    }

    clearLogs(): void {
        this.compileLogs.set([]);
        this.compileErrors.set([]);
    }

    async run(): Promise<CompileResult> {
        this.addLog('Running application...');
        return this.compile();
    }
}
