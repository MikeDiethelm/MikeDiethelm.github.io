import { Injectable, signal } from '@angular/core';
import { DE_TRANSLATIONS } from './translations/de';
import { EN_TRANSLATIONS } from './translations/en';
import { FR_TRANSLATIONS } from './translations/fr';
import { IT_TRANSLATIONS } from './translations/it';

export interface Translations {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = signal<'de' | 'en' | 'fr' | 'it'>('de');

  private translations: Record<'de' | 'en' | 'fr' | 'it', Translations> = {
    de: DE_TRANSLATIONS,
    en: EN_TRANSLATIONS,
    fr: FR_TRANSLATIONS,
    it: IT_TRANSLATIONS
  };

  getCurrentLang = this.currentLang.asReadonly();

  setLanguage(lang: 'de' | 'en' | 'fr' | 'it') {
    this.currentLang.set(lang);
    // Store in localStorage for persistence
    localStorage.setItem('language', lang);
  }

  translate(key: string): string {
    const lang = this.currentLang();
    return this.translations[lang][key] || key;
  }

  // Initialize language from localStorage or browser locale
  initializeLanguage() {
    const saved = localStorage.getItem('language') as 'de' | 'en' | 'fr' | 'it';
    if (saved && (saved === 'de' || saved === 'en' || saved === 'fr' || saved === 'it')) {
      this.currentLang.set(saved);
    } else {
      // Fallback to browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('en')) {
        this.currentLang.set('en');
      } else if (browserLang.startsWith('fr')) {
        this.currentLang.set('fr');
      } else if (browserLang.startsWith('it')) {
        this.currentLang.set('it');
      } else {
        this.currentLang.set('de');
      }
    }
  }
}
