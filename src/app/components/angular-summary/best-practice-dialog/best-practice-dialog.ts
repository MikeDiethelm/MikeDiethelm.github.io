import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { TranslatePipe } from '../../../pipes/translate.pipe';

interface DetailedItem {
    title: string;
    description: string;
    example?: string;
}

interface DialogData {
    category: string;
    icon: string;
    items: string[];
    color?: string;
    detailTitle?: string;
    explanation?: string;
    codeExample?: string;
    detailedItems?: DetailedItem[];
    benefits?: string[];
    antiPatterns?: string[];
}

@Component({
    selector: 'app-best-practice-dialog',
    templateUrl: './best-practice-dialog.html',
    styleUrl: './best-practice-dialog.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        MatExpansionModule,
        MatListModule,
        TranslatePipe
    ]
})
export class BestPracticeDialogComponent {
    readonly dialogRef = inject(MatDialogRef<BestPracticeDialogComponent>);
    readonly data = inject<DialogData>(MAT_DIALOG_DATA);

    close(): void {
        this.dialogRef.close();
    }
}
