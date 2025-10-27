import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatListModule } from '@angular/material/list';
import { TranslatePipe } from '../../../pipes/translate.pipe';

interface AdvancedTopicDialogData {
    title: string;
    icon: string;
    detailTitle?: string;
    explanation?: string;
    codeExample?: string;
    detailedItems?: Array<{
        title: string;
        description: string;
        example?: string;
    }>;
    benefits?: string[];
    antiPatterns?: string[];
}

@Component({
    selector: 'app-advanced-topic-dialog',
    standalone: true,
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatExpansionModule,
        MatChipsModule,
        MatListModule,
        TranslatePipe
    ],
    templateUrl: './advanced-topic-dialog.html',
    styleUrl: './advanced-topic-dialog.scss'
})
export class AdvancedTopicDialogComponent {
    readonly data = inject<AdvancedTopicDialogData>(MAT_DIALOG_DATA);
}
