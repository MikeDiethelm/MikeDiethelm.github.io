import { Injectable, signal } from '@angular/core';

export interface Translations {
  [key: string]: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private currentLang = signal<'de' | 'en'>('de');
  
  private translations: Record<'de' | 'en', Translations> = {
    de: {
      // Navigation
      'nav.home': 'Home',
      'nav.weather': 'Wetter',
      'nav.features': 'Features',
      
      // Home Component
      'home.subtitle': 'Fullstack Developer',
      'home.intro': 'Willkommen auf meiner Portfolio-Seite! Ich bin ein leidenschaftlicher Entwickler mit Fokus auf Angular und moderne Webtechnologien. Hier demonstriere ich meine Kenntnisse durch verschiedene Features und Projekte.',
      'home.linkedin': 'LinkedIn',
      'home.skills.frontend': 'Frontend',
      'home.skills.backend': 'Backend & APIs',
      
      // Weather Component
      'weather.title': 'Wettervorhersage',
      'weather.subtitle': 'Aktuelle Wetterdaten für deine Stadt',
      'weather.search.label': 'Stadt eingeben',
      'weather.search.placeholder': 'z.B. Berlin, München, Zürich...',
      'weather.search.button': 'Suchen',
      'weather.loading': 'Lädt...',
      'weather.error': 'Fehler beim Laden der Wetterdaten',
      'weather.popular.title': 'Beliebte Städte',
      
      // Footer
      'footer.copyright': '2025 Mike Diethelm. Built with Angular 20.',
      'footer.github.title': 'GitHub Profile',
      'footer.linkedin.title': 'LinkedIn Profile',
      'footer.techstack': 'Angular • Material Design 3 • TypeScript'
    },
    en: {
      // Navigation
      'nav.home': 'Home',
      'nav.weather': 'Weather',
      'nav.features': 'Features',
      
      // Home Component
      'home.subtitle': 'Fullstack Developer',
      'home.intro': 'Welcome to my portfolio site! I am a passionate developer focused on Angular and modern web technologies. Here I demonstrate my skills through various features and projects.',
      'home.linkedin': 'LinkedIn',
      'home.skills.frontend': 'Frontend',
      'home.skills.backend': 'Backend & APIs',
      
      // Weather Component
      'weather.title': 'Weather Forecast',
      'weather.subtitle': 'Current weather data for your city',
      'weather.search.label': 'Enter city',
      'weather.search.placeholder': 'e.g. Berlin, Munich, Zurich...',
      'weather.search.button': 'Search',
      'weather.loading': 'Loading...',
      'weather.error': 'Error loading weather data',
      'weather.popular.title': 'Popular Cities',
      
      // Footer
      'footer.copyright': '2025 Mike Diethelm. Built with Angular 20.',
      'footer.github.title': 'GitHub Profile',
      'footer.linkedin.title': 'LinkedIn Profile',
      'footer.techstack': 'Angular • Material Design 3 • TypeScript'
    }
  };

  getCurrentLang = this.currentLang.asReadonly();

  setLanguage(lang: 'de' | 'en') {
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
    const saved = localStorage.getItem('language') as 'de' | 'en';
    if (saved && (saved === 'de' || saved === 'en')) {
      this.currentLang.set(saved);
    } else {
      // Fallback to browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('en')) {
        this.currentLang.set('en');
      } else {
        this.currentLang.set('de');
      }
    }
  }
}