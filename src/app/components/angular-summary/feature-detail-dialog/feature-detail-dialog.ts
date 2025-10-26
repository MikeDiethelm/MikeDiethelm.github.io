import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { TranslatePipe } from '../../../pipes/translate.pipe';

interface DialogData {
    title: string;
    description: string;
    icon: string;
    color: string;
    detailTitle?: string;
    explanation?: string;
    codeExample?: string;
    useCases?: string[];
    benefits?: string[];
}

@Component({
    selector: 'app-feature-detail-dialog',
    templateUrl: './feature-detail-dialog.html',
    styleUrl: './feature-detail-dialog.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
        TranslatePipe
    ]
})
export class FeatureDetailDialogComponent {
    readonly dialogRef = inject(MatDialogRef<FeatureDetailDialogComponent>);
    readonly data = inject<DialogData>(MAT_DIALOG_DATA);

    close(): void {
        this.dialogRef.close();
    }
}
