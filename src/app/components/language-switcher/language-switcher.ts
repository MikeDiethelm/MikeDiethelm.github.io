import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { TranslationService } from '../../services/translation.service';

@Component({
    selector: 'app-language-switcher',
    standalone: true,
    imports: [MatButtonModule, MatIconModule, MatMenuModule],
    template: `
    <button mat-icon-button [matMenuTriggerFor]="languageMenu">
      <mat-icon>translate</mat-icon>
    </button>
    <mat-menu #languageMenu="matMenu">
      <button mat-menu-item (click)="switchLanguage('de')" [class.active]="currentLang() === 'de'">
        <mat-icon>flag</mat-icon>
        <span>Deutsch</span>
      </button>
      <button mat-menu-item (click)="switchLanguage('en')" [class.active]="currentLang() === 'en'">
        <mat-icon>flag</mat-icon>
        <span>English</span>
      </button>
    </mat-menu>
  `,
    styles: [`
    .active {
      background-color: var(--mat-sys-primary-container);
      color: var(--mat-sys-on-primary-container);
    }
  `]
})
export class LanguageSwitcherComponent {
    private translationService = inject(TranslationService);
    
    currentLang = this.translationService.getCurrentLang;

    switchLanguage(lang: 'de' | 'en') {
        this.translationService.setLanguage(lang);
    }
}