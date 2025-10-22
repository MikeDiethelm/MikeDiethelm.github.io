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
      'nav.crypto': 'Krypto',
      'nav.features': 'Features',

      // Home Component
      'home.subtitle': 'Fullstack Developer',
      'home.intro': 'Willkommen auf meiner Portfolio-Seite! Ich bin ein leidenschaftlicher Entwickler mit Fokus auf Angular und moderne Webtechnologien. Hier demonstriere ich meine Kenntnisse durch verschiedene Features und Projekte.',
      'home.linkedin': 'LinkedIn',
      'home.skills.frontend': 'Frontend',
      'home.skills.backend': 'Backend & APIs',
      'home.features.title': 'Feature Demonstrationen',
      'home.features.weather.title': 'Wetter-App',
      'home.features.weather.description': 'Vollständige Wetter-Anwendung mit kostenloser API-Integration',
      'home.features.weather.button': 'Wetter ansehen',
      'home.features.crypto.title': 'Krypto-Tracker',
      'home.features.crypto.description': 'Live-Preise und 24h-Veränderungen der Top-Kryptowährungen',
      'home.features.crypto.button': 'Krypto ansehen',
      'home.features.all.button': 'Alle Features',

      // Weather Component
      'weather.title': 'Wettervorhersage',
      'weather.subtitle': 'Aktuelle Wetterdaten für deine Stadt',
      'weather.search.label': 'Stadt eingeben',
      'weather.search.placeholder': 'z.B. Berlin, München, Zürich...',
      'weather.search.button': 'Suchen',
      'weather.loading': 'Lädt...',
      'weather.error': 'Fehler beim Laden der Wetterdaten',
      'weather.popular.title': 'Beliebte Städte',

      // Crypto Component
      'crypto.title': 'Kryptowährungen',
      'crypto.subtitle': 'Live-Preise der Top Kryptowährungen',
      'crypto.loading': 'Lädt...',
      'crypto.refresh.button': 'Aktualisieren',
      'crypto.refresh.tooltip': 'Daten neu laden',
      'crypto.currency.label': 'Währung:',

      'crypto.error.title': 'Fehler beim Laden',
      'crypto.error.dismiss': 'Schließen',
      'crypto.lastUpdate': 'Letztes Update',
      'crypto.dataStale': 'Daten möglicherweise veraltet',
      'crypto.topCurrencies': 'Top Kryptowährungen',
      'crypto.table.rank': 'Rang',
      'crypto.table.name': 'Name',
      'crypto.table.price': 'Preis',
      'crypto.table.change24h': '24h Veränderung',
      'crypto.table.marketCap': 'Marktkapitalisierung',
      'crypto.marketSize.label': 'Marktgröße',
      'crypto.marketSize.top100': 'Top 100 Coins',
      'crypto.marketSize.top250': 'Top 250 Coins',
      'crypto.marketSize.top500': 'Top 500 Coins',
      'crypto.marketSize.top1000': 'Top 1.000 Coins',
      'crypto.marketSize.top2500': 'Top 2.500 Coins',
      'crypto.pageSize.label': 'Coins pro Seite',
      'crypto.pageSize.coinsPerPage': 'Coins pro Seite',
      'crypto.pagination.showing': 'Anzeige',
      'crypto.pagination.of': 'von',
      'crypto.pagination.previous': 'Vorherige Seite',
      'crypto.pagination.next': 'Nächste Seite',
      'crypto.empty.title': 'Keine Daten verfügbar',
      'crypto.empty.subtitle': 'Klicke auf "Daten laden" um die aktuellen Kryptowährungspreise zu sehen.',
      'crypto.loadData': 'Daten laden',
      'crypto.clickForDetails': 'Klicken für Details',
      'crypto.backToHome.button': 'Zur Startseite',
      'crypto.backToHome.tooltip': 'Zurück zur Startseite',

      // Crypto Detail Modal
      'crypto.detail.loading': 'Lade Details...',
      'crypto.detail.loadingSubtitle': 'Detaillierte Informationen werden geladen',
      'crypto.detail.error.title': 'Fehler beim Laden',
      'crypto.detail.error.retry': 'Erneut versuchen',
      'crypto.detail.close': 'Schließen',
      'crypto.detail.rank': 'Marktplatz',
      'crypto.detail.currentPrice': 'Aktueller Preis',
      'crypto.detail.marketStats': 'Marktstatistiken',
      'crypto.detail.marketCap': 'Marktkapitalisierung',
      'crypto.detail.volume24h': '24h Volumen',
      'crypto.detail.high24h': '24h Hoch',
      'crypto.detail.low24h': '24h Tief',
      'crypto.detail.supply': 'Versorgung',
      'crypto.detail.circulatingSupply': 'Umlaufende Versorgung',
      'crypto.detail.totalSupply': 'Gesamtversorgung',
      'crypto.detail.maxSupply': 'Maximale Versorgung',
      'crypto.detail.records': 'Rekorde',
      'crypto.detail.allTimeHigh': 'Allzeithoch',
      'crypto.detail.allTimeLow': 'Allzeittief',
      'crypto.detail.about': 'Über',
      'crypto.detail.links': 'Links',
      'crypto.detail.website': 'Website',

      // Weather Component
      'weather.backToHome.button': 'Zur Startseite',
      'weather.backToHome.tooltip': 'Zurück zur Startseite',

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
      'nav.crypto': 'Crypto',
      'nav.features': 'Features',

      // Home Component
      'home.subtitle': 'Fullstack Developer',
      'home.intro': 'Welcome to my portfolio site! I am a passionate developer focused on Angular and modern web technologies. Here I demonstrate my skills through various features and projects.',
      'home.linkedin': 'LinkedIn',
      'home.skills.frontend': 'Frontend',
      'home.skills.backend': 'Backend & APIs',
      'home.features.title': 'Feature Demonstrations',
      'home.features.weather.title': 'Weather App',
      'home.features.weather.description': 'Complete weather application with free API integration',
      'home.features.weather.button': 'View Weather',
      'home.features.crypto.title': 'Crypto Tracker',
      'home.features.crypto.description': 'Live prices and 24h changes of top cryptocurrencies',
      'home.features.crypto.button': 'View Crypto',
      'home.features.all.button': 'All Features',

      // Weather Component
      'weather.title': 'Weather Forecast',
      'weather.subtitle': 'Current weather data for your city',
      'weather.search.label': 'Enter city',
      'weather.search.placeholder': 'e.g. Berlin, Munich, Zurich...',
      'weather.search.button': 'Search',
      'weather.loading': 'Loading...',
      'weather.error': 'Error loading weather data',
      'weather.popular.title': 'Popular Cities',

      // Crypto Component
      'crypto.title': 'Cryptocurrencies',
      'crypto.subtitle': 'Live prices of top cryptocurrencies',
      'crypto.loading': 'Loading...',
      'crypto.refresh.button': 'Refresh',
      'crypto.refresh.tooltip': 'Reload data',
      'crypto.currency.label': 'Currency:',

      'crypto.error.title': 'Loading Error',
      'crypto.error.dismiss': 'Dismiss',
      'crypto.lastUpdate': 'Last Update',
      'crypto.dataStale': 'Data may be outdated',
      'crypto.topCurrencies': 'Top Cryptocurrencies',
      'crypto.table.rank': 'Rank',
      'crypto.table.name': 'Name',
      'crypto.table.price': 'Price',
      'crypto.table.change24h': '24h Change',
      'crypto.table.marketCap': 'Market Cap',
      'crypto.marketSize.label': 'Market Size',
      'crypto.marketSize.top100': 'Top 100 Coins',
      'crypto.marketSize.top250': 'Top 250 Coins',
      'crypto.marketSize.top500': 'Top 500 Coins',
      'crypto.marketSize.top1000': 'Top 1,000 Coins',
      'crypto.marketSize.top2500': 'Top 2,500 Coins',
      'crypto.pageSize.label': 'Coins per page',
      'crypto.pageSize.coinsPerPage': 'coins per page',
      'crypto.pagination.showing': 'Showing',
      'crypto.pagination.of': 'of',
      'crypto.pagination.previous': 'Previous page',
      'crypto.pagination.next': 'Next page',
      'crypto.empty.title': 'No data available',
      'crypto.empty.subtitle': 'Click "Load Data" to see current cryptocurrency prices.',
      'crypto.loadData': 'Load Data',
      'crypto.clickForDetails': 'Click for details',

      // Crypto Detail Modal
      'crypto.detail.loading': 'Loading Details...',
      'crypto.detail.loadingSubtitle': 'Fetching detailed information',
      'crypto.detail.error.title': 'Loading Error',
      'crypto.detail.error.retry': 'Retry',
      'crypto.detail.close': 'Close',
      'crypto.detail.rank': 'Market Rank',
      'crypto.detail.currentPrice': 'Current Price',
      'crypto.detail.marketStats': 'Market Statistics',
      'crypto.detail.marketCap': 'Market Cap',
      'crypto.detail.volume24h': '24h Volume',
      'crypto.detail.high24h': '24h High',
      'crypto.detail.low24h': '24h Low',
      'crypto.detail.supply': 'Supply',
      'crypto.detail.circulatingSupply': 'Circulating Supply',
      'crypto.detail.totalSupply': 'Total Supply',
      'crypto.detail.maxSupply': 'Max Supply',
      'crypto.detail.records': 'Records',
      'crypto.detail.allTimeHigh': 'All-Time High',
      'crypto.detail.allTimeLow': 'All-Time Low',
      'crypto.detail.about': 'About',
      'crypto.detail.links': 'Links',
      'crypto.detail.website': 'Website',

      // Footer
      'crypto.backToHome.button': 'Back to Home',
      'crypto.backToHome.tooltip': 'Return to homepage',

      // Weather Component  
      'weather.backToHome.button': 'Back to Home',
      'weather.backToHome.tooltip': 'Return to homepage',

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