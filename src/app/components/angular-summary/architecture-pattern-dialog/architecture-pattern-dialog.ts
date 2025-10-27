import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslatePipe } from '../../../pipes/translate.pipe';

interface DialogData {
    title: string;
    description: string;
    icon: string;
    detailTitle?: string;
    explanation?: string;
    codeExample?: string;
    benefits?: string[];
    useCases?: string[];
    implementation?: string[];
    challenges?: string[];
}

@Component({
    selector: 'app-architecture-pattern-dialog',
    templateUrl: './architecture-pattern-dialog.html',
    styleUrl: './architecture-pattern-dialog.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        TranslatePipe
    ]
})
export class ArchitecturePatternDialogComponent {
    readonly dialogRef = inject(MatDialogRef<ArchitecturePatternDialogComponent>);
    readonly data = inject<DialogData>(MAT_DIALOG_DATA);

    close(): void {
        this.dialogRef.close();
    }
}
