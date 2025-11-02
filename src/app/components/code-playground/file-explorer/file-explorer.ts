import { Component, output, ChangeDetectionStrategy, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaygroundFileSystemService, FileNode } from '../../../services/playground-file-system.service';

interface TreeItem {
    node: FileNode;
    depth: number;
    icon: string;
}

@Component({
    selector: 'app-file-explorer',
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="file-explorer">
      <div class="explorer-header">
        <span class="header-title">EXPLORER</span>
        <div class="header-actions">
          <button 
            class="icon-button" 
            (click)="onNewFile()" 
            title="New File"
            aria-label="Create new file">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path fill="currentColor" d="M9.5 1.1l3.4 3.5.1.4v2h-1V6H8V2H3v11h4v1H2.5l-.5-.5v-12l.5-.5h6.7l.3.1zM9 2v3h2.9L9 2zm4 14h-1v-3H9v-1h3V9h1v3h3v1h-3v3z"/>
            </svg>
          </button>
          <button 
            class="icon-button" 
            (click)="onNewFolder()" 
            title="New Folder"
            aria-label="Create new folder">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path fill="currentColor" d="M14.5 2H7.71l-.85-.85L6.51 1h-5l-.5.5v11l.5.5H7v-1H1.5V6h13v4h1V2.5l-.5-.5zM7 5V2h7v3H7zm7 9h-3v3h-1v-3H7v-1h3v-3h1v3h3v1z"/>
            </svg>
          </button>
          <button 
            class="icon-button" 
            (click)="onRefresh()" 
            title="Refresh Explorer"
            aria-label="Refresh file explorer">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path fill="currentColor" d="M13.451 5.609l-.579-.939-1.068.812-.076.094c-.335.415-.927 1.341-1.124 2.876l-.021.165.033.163.071.345c0 1.654-1.346 3-3 3-.795 0-1.545-.311-2.107-.868l-.115-.125-.193.25-.176.228c-.371.48-.879 1.075-1.507 1.446l-.244.143.221.22 1.021 1.02.516-.513c.591-.591 1.243-1.367 1.688-2.107.314.095.618.147.935.147 2.206 0 4-1.794 4-4 0-1.111-.433-2.117-1.139-2.867l.149-.191.106-.163.157-.24.173-.259.103-.163.087-.155.071-.15.054-.161.035-.177.017-.204-.017-.204-.035-.177-.054-.161-.071-.15-.087-.155-.103-.163-.173-.259-.157-.24-.106-.163-.149-.191z"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="file-tree">
        @for (item of flatTree(); track item.node.id) {
          <div 
            class="tree-item" 
            [class.selected]="isSelected(item.node.id)"
            [style.padding-left.px]="item.depth * 16 + 8"
            (click)="handleNodeClick(item.node.id, $event)"
            (contextmenu)="handleContextMenu($event, item.node.id)">
            
            @if (item.node.type === 'folder') {
              <span 
                class="folder-icon" 
                (click)="toggleFolder(item.node.id, $event)">
                {{ item.node.isExpanded ? '▼' : '▶' }}
              </span>
            } @else {
              <span class="folder-icon"></span>
            }
            
            <span class="item-icon" [innerHTML]="item.icon"></span>
            <span class="item-name">{{ item.node.name }}</span>
          </div>
        }
      </div>

      @if (contextMenuVisible()) {
        <div 
          class="context-menu"
          [style.left.px]="contextMenuPosition().x"
          [style.top.px]="contextMenuPosition().y">
          <div class="menu-item" (click)="renameNode()">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path fill="currentColor" d="M13.23 1h-1.46L3.52 9.25l-.16.22L1 13.59 2.41 15l4.12-2.36.22-.16L15 4.23V2.77L13.23 1zM2.41 13.59l1.51-3 1.45 1.45-2.96 1.55zm3.83-2.06L4.47 9.76l8-8 1.77 1.77-8 8z"/>
            </svg>
            <span>Rename</span>
          </div>
          <div class="menu-item" (click)="duplicateNode()">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path fill="currentColor" d="M4 4l1-1h5.414L14 6.586V14l-1 1H5l-1-1V4zm9 3l-3-3H5v10h8V7z"/>
              <path fill="currentColor" d="M3 1L2 2v10l1 1V2h6.414l-1-1H3z"/>
            </svg>
            <span>Duplicate</span>
          </div>
          <div class="menu-divider"></div>
          <div class="menu-item danger" (click)="deleteNode()">
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path fill="currentColor" d="M10 3h3v1h-1v9l-1 1H4l-1-1V4H2V3h3V2a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v1zM9 2H6v1h3V2zM4 13h7V4H4v9zm2-8H5v7h1V5zm1 0h1v7H7V5zm2 0h1v7H9V5z"/>
            </svg>
            <span>Delete</span>
          </div>
        </div>
      }
    </div>
  `,
    styles: [`
    .file-explorer {
      height: 100%;
      background: #252526;
      color: #cccccc;
      display: flex;
      flex-direction: column;
      user-select: none;
    }

    .explorer-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      background: #252526;
      border-bottom: 1px solid #1e1e1e;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .header-title {
      color: #cccccc;
    }

    .header-actions {
      display: flex;
      gap: 4px;
    }

    .icon-button {
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

    .file-tree {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 4px 0;

      &::-webkit-scrollbar {
        width: 10px;
      }

      &::-webkit-scrollbar-track {
        background: #252526;
      }

      &::-webkit-scrollbar-thumb {
        background: #424242;
        border-radius: 5px;

        &:hover {
          background: #4e4e4e;
        }
      }
    }

    .tree-item {
      display: flex;
      align-items: center;
      padding: 2px 8px;
      cursor: pointer;
      font-size: 13px;
      line-height: 22px;
      white-space: nowrap;
      position: relative;

      &:hover {
        background: #2a2d2e;
      }

      &.selected {
        background: #094771;
      }
    }

    .folder-icon {
      width: 16px;
      margin-right: 2px;
      flex-shrink: 0;
      cursor: pointer;
      user-select: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
    }

    .item-icon {
      margin-right: 6px;
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;

      :global(svg) {
        display: block;
      }
    }

    .item-name {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .context-menu {
      position: fixed;
      background: #3c3c3c;
      border: 1px solid #454545;
      border-radius: 3px;
      padding: 4px 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
      z-index: 1000;
      min-width: 180px;
    }

    .menu-item {
      display: flex;
      align-items: center;
      padding: 6px 12px;
      cursor: pointer;
      font-size: 13px;
      gap: 8px;

      &:hover {
        background: #094771;
      }

      &.danger {
        color: #f48771;

        &:hover {
          background: #5a1d1d;
        }
      }

      svg {
        flex-shrink: 0;
      }
    }

    .menu-divider {
      height: 1px;
      background: #454545;
      margin: 4px 0;
    }
  `]
})
export class FileExplorerComponent {
    private fileSystem = inject(PlaygroundFileSystemService);

    fileSelected = output<string>();

    protected fileTree = this.fileSystem.files;
    protected selectedFile = this.fileSystem.currentFile;

    protected contextMenuVisible = signal(false);
    protected contextMenuPosition = signal({ x: 0, y: 0 });
    protected contextMenuNodeId = signal<string | null>(null);

    // Flatten tree into a computed signal that auto-updates
    protected flatTree = computed(() => {
        const items: TreeItem[] = [];
        const flatten = (nodes: FileNode[], depth: number) => {
            for (const node of nodes) {
                items.push({
                    node,
                    depth,
                    icon: this.getIcon(node)
                });
                if (node.type === 'folder' && node.isExpanded && node.children) {
                    flatten(node.children, depth + 1);
                }
            }
        };
        flatten(this.fileTree(), 0);
        return items;
    });

    protected isSelected(nodeId: string): boolean {
        return this.selectedFile()?.id === nodeId;
    }

    protected handleNodeClick(nodeId: string, event: MouseEvent): void {
        event.stopPropagation();

        const node = this.findNode(this.fileTree(), nodeId);
        if (!node) return;

        if (node.type === 'file') {
            this.fileSystem.selectFile(node);
            this.fileSelected.emit(nodeId);
        }
    }

    protected toggleFolder(nodeId: string, event: MouseEvent): void {
        event.stopPropagation();
        const node = this.findNode(this.fileTree(), nodeId);
        if (node && node.type === 'folder') {
            this.fileSystem.toggleFolder(node);
        }
    }

    protected handleContextMenu(event: MouseEvent, nodeId: string): void {
        event.preventDefault();
        event.stopPropagation();

        this.contextMenuNodeId.set(nodeId);
        this.contextMenuPosition.set({ x: event.clientX, y: event.clientY });
        this.contextMenuVisible.set(true);
    }

    protected closeContextMenu(): void {
        this.contextMenuVisible.set(false);
    }

    protected renameNode(): void {
        const nodeId = this.contextMenuNodeId();
        if (!nodeId) return;

        const node = this.findNode(this.fileTree(), nodeId);
        if (!node) return;

        const newName = prompt('Enter new name:', node.name);
        if (newName && newName !== node.name) {
            this.fileSystem.renameNode(node, newName);
        }
        this.closeContextMenu();
    }

    protected duplicateNode(): void {
        const nodeId = this.contextMenuNodeId();
        if (!nodeId) return;

        const node = this.findNode(this.fileTree(), nodeId);
        if (!node || node.type !== 'file') return;

        const baseName = node.name.split('.')[0];
        const extension = node.name.split('.').pop() || 'ts';
        const newName = `${baseName}-copy.${extension}`;

        const parent = this.findParentNode(this.fileTree(), nodeId);
        if (parent) {
            this.fileSystem.createFile(parent, newName, node.language || 'typescript');
        }
        this.closeContextMenu();
    }

    protected deleteNode(): void {
        const nodeId = this.contextMenuNodeId();
        if (!nodeId) return;

        const node = this.findNode(this.fileTree(), nodeId);
        if (!node) return;

        if (confirm(`Are you sure you want to delete "${node.name}"?`)) {
            this.fileSystem.deleteNode(node);
        }
        this.closeContextMenu();
    }

    protected onNewFile(): void {
        const name = prompt('Enter file name:', 'new-file.ts');
        if (name) {
            const srcFolder = this.fileTree().find(n => n.name === 'src');
            if (srcFolder) {
                this.fileSystem.createFile(srcFolder, name);
            }
        }
    }

    protected onNewFolder(): void {
        const name = prompt('Enter folder name:', 'new-folder');
        if (name) {
            const srcFolder = this.fileTree().find(n => n.name === 'src');
            if (srcFolder) {
                this.fileSystem.createFolder(srcFolder, name);
            }
        }
    }

    protected onRefresh(): void {
        // Computed signal updates automatically
    }

    protected getIcon(node: FileNode): string {
        if (node.type === 'folder') {
            return node.isExpanded ? `
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path fill="#dcb67a" d="M1.5 14h13l.5-.5v-9l-.5-.5H8.7L7.4 2.7l-.4-.2H1.5l-.5.5v10.5l.5.5z"/>
        </svg>
      ` : `
        <svg width="16" height="16" viewBox="0 0 16 16">
          <path fill="#dcb67a" d="M14.5 3H7.71l-.85-.85L6.51 2h-5l-.5.5v11l.5.5h13l.5-.5v-10L14.5 3zM13 13H2V3h4.29l.85.85.36.15H13v9z"/>
        </svg>
      `;
        }

        const ext = node.name.split('.').pop() || '';
        const iconColors: Record<string, string> = {
            'ts': '#3178c6',
            'html': '#e34c26',
            'scss': '#cc6699',
            'css': '#1572b6',
            'json': '#f0db4f',
            'md': '#083fa1'
        };

        const color = iconColors[ext] || '#cccccc';

        return `
      <svg width="16" height="16" viewBox="0 0 16 16">
        <path fill="${color}" d="M13.71 4.29l-3-3L10 1H4L3 2v12l1 1h9l1-1V5l-.29-.71zM13 14H4V2h5v4h4v8zm-3-9V2l3 3h-3z"/>
      </svg>
    `;
    }

    private findNode(nodes: FileNode[], nodeId: string): FileNode | null {
        for (const node of nodes) {
            if (node.id === nodeId) return node;
            if (node.children) {
                const found = this.findNode(node.children, nodeId);
                if (found) return found;
            }
        }
        return null;
    }

    private findParentNode(nodes: FileNode[], childId: string, parent: FileNode | null = null): FileNode | null {
        for (const node of nodes) {
            if (node.id === childId) return parent;
            if (node.children) {
                const found = this.findParentNode(node.children, childId, node);
                if (found) return found;
            }
        }
        return null;
    }
}
