import { Injectable, signal, computed } from '@angular/core';

export interface FileNode {
    id: string;
    name: string;
    type: 'file' | 'folder';
    content?: string;
    language?: string;
    children?: FileNode[];
    parent?: FileNode;
    isExpanded?: boolean;
    isSelected?: boolean;
    path?: string;
}

@Injectable({
    providedIn: 'root'
})
export class PlaygroundFileSystemService {
    private fileTree = signal<FileNode[]>(this.getDefaultFileStructure());
    private selectedFile = signal<FileNode | null>(null);
    private openTabs = signal<FileNode[]>([]);
    private activeTab = signal<FileNode | null>(null);

    readonly files = this.fileTree.asReadonly();
    readonly currentFile = this.selectedFile.asReadonly();
    readonly tabs = this.openTabs.asReadonly();
    readonly activeEditor = this.activeTab.asReadonly();

    private getDefaultFileStructure(): FileNode[] {
        const appComponent: FileNode = {
            id: 'app-component-ts',
            name: 'app.component.ts',
            type: 'file',
            language: 'typescript',
            path: 'src/app/app.component.ts',
            content: `import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: \`
    <div class="container">
      <h1>{{ title }}</h1>
      <p>{{ message }}</p>
      <button (click)="onClick()">Click me!</button>
    </div>
  \`,
  styles: [\`
    .container {
      padding: 20px;
      text-align: center;
    }
    
    h1 {
      color: #1976d2;
      font-size: 2.5rem;
    }
    
    button {
      padding: 10px 20px;
      font-size: 1rem;
      background: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    button:hover {
      background: #1565c0;
    }
  \`]
})
export class AppComponent {
  title = 'Angular Playground';
  message = 'Edit this code to see changes live!';
  
  onClick() {
    this.message = 'Button clicked at ' + new Date().toLocaleTimeString();
  }
}
`
        };

        const appModule: FileNode = {
            id: 'app-module-ts',
            name: 'app.module.ts',
            type: 'file',
            language: 'typescript',
            path: 'src/app/app.module.ts',
            content: `import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
`
        };

        const mainTs: FileNode = {
            id: 'main-ts',
            name: 'main.ts',
            type: 'file',
            language: 'typescript',
            path: 'src/main.ts',
            content: `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
`
        };

        const indexHtml: FileNode = {
            id: 'index-html',
            name: 'index.html',
            type: 'file',
            language: 'html',
            path: 'src/index.html',
            content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Angular Playground</title>
</head>
<body>
  <app-root></app-root>
</body>
</html>
`
        };

        const stylesScss: FileNode = {
            id: 'styles-scss',
            name: 'styles.scss',
            type: 'file',
            language: 'scss',
            path: 'src/styles.scss',
            content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: #f5f5f5;
}
`
        };

        const appFolder: FileNode = {
            id: 'app-folder',
            name: 'app',
            type: 'folder',
            path: 'src/app',
            isExpanded: true,
            children: [appComponent, appModule]
        };

        const srcFolder: FileNode = {
            id: 'src-folder',
            name: 'src',
            type: 'folder',
            path: 'src',
            isExpanded: true,
            children: [appFolder, mainTs, indexHtml, stylesScss]
        };

        // Set parent references
        [appComponent, appModule].forEach(child => child.parent = appFolder);
        [appFolder, mainTs, indexHtml, stylesScss].forEach(child => child.parent = srcFolder);

        return [srcFolder];
    }

    createFile(parent: FileNode, name: string, language: string = 'typescript'): void {
        if (parent.type !== 'folder') return;

        const newFile: FileNode = {
            id: `${Date.now()}-${name}`,
            name,
            type: 'file',
            language,
            content: '',
            parent,
            path: `${parent.path}/${name}`
        };

        const updatedTree = [...this.fileTree()];
        parent.children = [...(parent.children || []), newFile];
        this.fileTree.set(updatedTree);
    }

    createFolder(parent: FileNode, name: string): void {
        if (parent.type !== 'folder') return;

        const newFolder: FileNode = {
            id: `${Date.now()}-${name}`,
            name,
            type: 'folder',
            children: [],
            parent,
            isExpanded: false,
            path: `${parent.path}/${name}`
        };

        const updatedTree = [...this.fileTree()];
        parent.children = [...(parent.children || []), newFolder];
        this.fileTree.set(updatedTree);
    }

    deleteNode(node: FileNode): void {
        if (!node.parent) return;

        const updatedTree = [...this.fileTree()];
        node.parent.children = node.parent.children?.filter(child => child.id !== node.id);

        // Remove from open tabs if it's open
        const tabs = this.openTabs().filter(tab => tab.id !== node.id);
        this.openTabs.set(tabs);

        if (this.activeTab()?.id === node.id) {
            this.activeTab.set(tabs[0] || null);
        }

        this.fileTree.set(updatedTree);
    }

    renameNode(node: FileNode, newName: string): void {
        const updatedTree = [...this.fileTree()];
        node.name = newName;
        const oldPath = node.path || '';
        const newPath = oldPath.substring(0, oldPath.lastIndexOf('/') + 1) + newName;

        // Update path recursively for folders
        this.updatePaths(node, oldPath, newPath);

        this.fileTree.set(updatedTree);
    }

    private updatePaths(node: FileNode, oldPath: string, newPath: string): void {
        if (node.path) {
            node.path = node.path.replace(oldPath, newPath);
        }

        if (node.type === 'folder' && node.children) {
            node.children.forEach(child => this.updatePaths(child, oldPath, newPath));
        }
    }

    toggleFolder(folder: FileNode): void {
        if (folder.type !== 'folder') return;

        const updatedTree = [...this.fileTree()];
        folder.isExpanded = !folder.isExpanded;
        this.fileTree.set(updatedTree);
    }

    selectFile(file: FileNode): void {
        if (file.type !== 'file') return;

        this.selectedFile.set(file);

        // Add to tabs if not already open
        const tabs = this.openTabs();
        if (!tabs.find(tab => tab.id === file.id)) {
            this.openTabs.set([...tabs, file]);
        }

        this.activeTab.set(file);
    }

    updateFileContent(file: FileNode, content: string): void {
        const updatedTree = [...this.fileTree()];
        file.content = content;
        this.fileTree.set(updatedTree);
    }

    closeTab(file: FileNode): void {
        const tabs = this.openTabs().filter(tab => tab.id !== file.id);
        this.openTabs.set(tabs);

        if (this.activeTab()?.id === file.id) {
            this.activeTab.set(tabs[tabs.length - 1] || null);
            this.selectedFile.set(tabs[tabs.length - 1] || null);
        }
    }

    setActiveTab(file: FileNode): void {
        this.activeTab.set(file);
        this.selectedFile.set(file);
    }

    getAllFiles(): FileNode[] {
        const files: FileNode[] = [];

        const traverse = (nodes: FileNode[]) => {
            nodes.forEach(node => {
                if (node.type === 'file') {
                    files.push(node);
                } else if (node.children) {
                    traverse(node.children);
                }
            });
        };

        traverse(this.fileTree());
        return files;
    }

    getFileByPath(path: string): FileNode | null {
        const files = this.getAllFiles();
        return files.find(file => file.path === path) || null;
    }

    exportProject(): string {
        return JSON.stringify(this.fileTree(), null, 2);
    }

    importProject(jsonData: string): void {
        try {
            const tree = JSON.parse(jsonData);
            this.fileTree.set(tree);
            this.openTabs.set([]);
            this.activeTab.set(null);
            this.selectedFile.set(null);
        } catch (error) {
            console.error('Failed to import project:', error);
        }
    }
}
