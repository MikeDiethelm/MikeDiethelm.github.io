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
        <span>🇩🇪 Deutsch</span>
      </button>
      <button mat-menu-item (click)="switchLanguage('en')" [class.active]="currentLang() === 'en'">
        <span>🇬🇧 English</span>
      </button>
      <button mat-menu-item (click)="switchLanguage('fr')" [class.active]="currentLang() === 'fr'">
        <span>🇫🇷 Français</span>
      </button>
      <button mat-menu-item (click)="switchLanguage('it')" [class.active]="currentLang() === 'it'">
        <span>🇮🇹 Italiano</span>
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

  switchLanguage(lang: 'de' | 'en' | 'fr' | 'it') {
    this.translationService.setLanguage(lang);
  }
}