import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, interval } from 'rxjs';
import { catchError, map, tap, startWith, switchMap } from 'rxjs/operators';
import {
    CoinGeckoResponse,
    CryptoCurrency,
    CryptoError,
    CryptoState,
    SupportedCurrency,
    CurrencyInfo,
    CoinDetails,
    CryptoDetails
} from '../interfaces/crypto.interface';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CryptoService {
    private readonly http = inject(HttpClient);
    private readonly BASE_URL = environment.crypto.baseUrl;
    private readonly COINS_ENDPOINT = environment.crypto.coinsEndpoint;

    // State signals
    private readonly _state = signal<CryptoState>({
        currencies: [],
        loading: false,
        error: null,
        lastUpdate: null,
        totalCount: 1000, // Maximum coins we want to support (1000 coins = good balance)
        currentPage: 1,
        pageSize: 50
    });

    private readonly _selectedCurrency = signal<SupportedCurrency>('usd');

    // Public readonly signals
    readonly state = this._state.asReadonly();
    readonly selectedCurrency = this._selectedCurrency.asReadonly();

    // Computed signals
    readonly currencies = computed(() => this._state().currencies);
    readonly loading = computed(() => this._state().loading);
    readonly error = computed(() => this._state().error);
    readonly lastUpdate = computed(() => this._state().lastUpdate);
    readonly currentPage = computed(() => this._state().currentPage);
    readonly pageSize = computed(() => this._state().pageSize);
    readonly totalCount = computed(() => this._state().totalCount);
    readonly totalPages = computed(() => Math.ceil(this._state().totalCount / this._state().pageSize));
    readonly hasNextPage = computed(() => this._state().currentPage < this.totalPages());
    readonly hasPreviousPage = computed(() => this._state().currentPage > 1);
    readonly pageInfo = computed(() => ({
        currentPage: this._state().currentPage,
        pageSize: this._state().pageSize,
        totalItems: this._state().totalCount,
        totalPages: this.totalPages(),
        startItem: (this._state().currentPage - 1) * this._state().pageSize + 1,
        endItem: Math.min(this._state().currentPage * this._state().pageSize, this._state().totalCount)
    }));

    // Computed currency info
    readonly currentCurrencyInfo = computed(() =>
        this.supportedCurrencies.find(c => c.code === this._selectedCurrency()) ?? this.supportedCurrencies[0]
    );

    // Static data
    readonly supportedCurrencies: CurrencyInfo[] = [
        { code: 'usd', symbol: '$', name: 'US Dollar' },
        { code: 'eur', symbol: '€', name: 'Euro' },
        { code: 'chf', symbol: 'CHF', name: 'Swiss Franc' }
    ];

    readonly pageSizeOptions = [25, 50, 100, 250];
    readonly maxCoins = 1000;

    // Auto-refresh observable (every 5 minutes)
    readonly autoRefresh$ = interval(5 * 60 * 1000).pipe(
        startWith(0),
        switchMap(() => this.loadCryptocurrencies())
    );

    /**
     * Lädt die Top Kryptowährungen mit Pagination
     */
    loadCryptocurrencies(page?: number, pageSize?: number): Observable<CryptoCurrency[]> {
        this._updateState({ loading: true, error: null });

        const currentState = this._state();
        const effectivePage = page ?? currentState.currentPage;
        const effectivePageSize = pageSize ?? currentState.pageSize;

        const params = new URLSearchParams({
            vs_currency: this._selectedCurrency(),
            order: 'market_cap_desc',
            per_page: effectivePageSize.toString(),
            page: effectivePage.toString(),
            sparkline: 'false',
            price_change_percentage: '24h'
        });

        const url = `${this.BASE_URL}${this.COINS_ENDPOINT}?${params}`;

        return this.http.get<CoinGeckoResponse[]>(url).pipe(
            map(response => response.map(coin => this.mapCoinGeckoToCryptoCurrency(coin))),
            tap(currencies => {
                this._updateState({
                    currencies,
                    loading: false,
                    error: null,
                    lastUpdate: Date.now(),
                    currentPage: effectivePage,
                    pageSize: effectivePageSize
                });
            }),
            catchError(error => {
                const cryptoError: CryptoError = {
                    message: this.getErrorMessage(error),
                    code: error.status?.toString(),
                    timestamp: Date.now()
                };

                this._updateState({
                    loading: false,
                    error: cryptoError
                });

                return throwError(() => cryptoError);
            })
        );
    }

    /**
 * Ändert die ausgewählte Währung
 */
    setCurrency(currency: SupportedCurrency): void {
        if (currency !== this._selectedCurrency()) {
            this._selectedCurrency.set(currency);
            // Zurück zur ersten Seite bei Währungswechsel
            this.loadCryptocurrencies(1).subscribe();
        }
    }

    /**
     * Setzt die Seitengröße
     */
    setPageSize(pageSize: number): void {
        if (pageSize !== this._state().pageSize) {
            // Zurück zur ersten Seite bei Größenwechsel
            this.loadCryptocurrencies(1, pageSize).subscribe();
        }
    }

    /**
     * Navigiert zu einer bestimmten Seite
     */
    goToPage(page: number): Observable<CryptoCurrency[]> {
        const totalPages = this.totalPages();
        if (page >= 1 && page <= totalPages) {
            return this.loadCryptocurrencies(page);
        }
        return throwError(() => new Error(`Invalid page number: ${page}`));
    }

    /**
     * Nächste Seite
     */
    nextPage(): Observable<CryptoCurrency[]> {
        const currentPage = this._state().currentPage;
        const totalPages = this.totalPages();
        if (currentPage < totalPages) {
            return this.goToPage(currentPage + 1);
        }
        return throwError(() => new Error('Already on last page'));
    }

    /**
     * Vorherige Seite
     */
    previousPage(): Observable<CryptoCurrency[]> {
        const currentPage = this._state().currentPage;
        if (currentPage > 1) {
            return this.goToPage(currentPage - 1);
        }
        return throwError(() => new Error('Already on first page'));
    }

    /**
     * Löscht Fehler
     */
    clearError(): void {
        this._updateState({ error: null });
    }

    /**
     * Setzt die maximale Anzahl der Coins (für dynamische Anpassung)
     */
    setMaxCoins(maxCoins: number): void {
        if (maxCoins > 0 && maxCoins <= 10000) { // API-Limit beachten
            this._updateState({
                totalCount: maxCoins,
                currentPage: 1 // Zurück zur ersten Seite
            });
        }
    }

    /**
     * Force refresh der Daten
     */
    refresh(): Observable<CryptoCurrency[]> {
        return this.loadCryptocurrencies();
    }

    /**
     * Lädt detaillierte Informationen für einen spezifischen Coin
     */
    getCoinDetails(coinId: string): Observable<CryptoDetails> {
        const url = `${this.BASE_URL}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;

        return this.http.get<any>(url).pipe(
            tap(response => {
                // Debug: API-Response loggen um die Struktur zu verstehen
                console.log('CoinGecko API Response für', coinId, ':', response);
            }),
            map(response => this.mapCoinDetailsToCryptoDetails(response)),
            catchError(error => {
                console.error('API Error:', error);
                const cryptoError: CryptoError = {
                    message: `Fehler beim Laden der Details für ${coinId}: ${this.getErrorMessage(error)}`,
                    code: error.status?.toString(),
                    timestamp: Date.now()
                };
                return throwError(() => cryptoError);
            })
        );
    }

    /**
     * Prüft ob Daten älter als 5 Minuten sind
     */
    readonly isDataStale = computed(() => {
        const lastUpdate = this.lastUpdate();
        if (!lastUpdate) return true;
        return Date.now() - lastUpdate > 5 * 60 * 1000; // 5 Minuten
    });

    // Private Hilfsmethoden

    private _updateState(partialState: Partial<CryptoState>): void {
        this._state.update(currentState => ({
            ...currentState,
            ...partialState
        }));
    }

    private mapCoinGeckoToCryptoCurrency(coin: CoinGeckoResponse): CryptoCurrency {
        return {
            id: coin.id,
            symbol: coin.symbol.toUpperCase(),
            name: coin.name,
            image: coin.image,
            currentPrice: coin.current_price,
            marketCapRank: coin.market_cap_rank,
            priceChange24h: coin.price_change_24h,
            priceChangePercentage24h: coin.price_change_percentage_24h,
            marketCap: coin.market_cap,
            volume24h: coin.total_volume,
            high24h: coin.high_24h,
            low24h: coin.low_24h,
            lastUpdated: coin.last_updated
        };
    }

    private mapCoinDetailsToCryptoDetails(coin: any): CryptoDetails {
        const currency = this._selectedCurrency();

        // Debug: Vollständige API-Response analysieren
        console.log('=== CoinGecko API Response Debug ===');
        console.log('Full coin object:', coin);
        console.log('Available top-level properties:', Object.keys(coin || {}));

        if (coin?.links) {
            console.log('Links object exists:', coin.links);
            console.log('Links properties:', Object.keys(coin.links));
        }

        if (coin?.market_data) {
            console.log('Market data exists, keys:', Object.keys(coin.market_data));
        }

        console.log('===================================');

        // Hilfsfunktion für sichere Eigenschaftszugriffe
        const safeGet = (obj: any, path: string, defaultValue: any = null) => {
            try {
                const result = path.split('.').reduce((current, key) => current?.[key], obj);
                console.log(`safeGet('${path}'):`, result);
                return result ?? defaultValue;
            } catch (error) {
                console.log(`safeGet('${path}') failed:`, error);
                return defaultValue;
            }
        };

        // Sichere Array-Filterung
        const safeArrayFilter = (arr: any, filterFn: (item: any) => boolean): any[] => {
            console.log('safeArrayFilter input:', arr, 'isArray:', Array.isArray(arr));
            try {
                return Array.isArray(arr) ? arr.filter(filterFn) : [];
            } catch (error) {
                console.log('safeArrayFilter failed:', error);
                return [];
            }
        };

        return {
            id: coin.id || '',
            symbol: (coin.symbol || '').toUpperCase(),
            name: coin.name || 'Unknown',
            image: safeGet(coin, 'image.large') || safeGet(coin, 'image.small') || safeGet(coin, 'image.thumb') || '',
            description: this.stripHtmlTags(safeGet(coin, 'description.en', '')),
            marketCapRank: coin.market_cap_rank || 0,
            currentPrice: safeGet(coin, `market_data.current_price.${currency}`, 0),
            marketCap: safeGet(coin, `market_data.market_cap.${currency}`, 0),
            volume24h: safeGet(coin, `market_data.total_volume.${currency}`, 0),
            high24h: safeGet(coin, `market_data.high_24h.${currency}`, 0),
            low24h: safeGet(coin, `market_data.low_24h.${currency}`, 0),
            priceChange24h: safeGet(coin, 'market_data.price_change_24h', 0),
            priceChangePercentage24h: safeGet(coin, 'market_data.price_change_percentage_24h', 0),
            priceChangePercentage7d: safeGet(coin, 'market_data.price_change_percentage_7d', 0),
            priceChangePercentage30d: safeGet(coin, 'market_data.price_change_percentage_30d', 0),
            circulatingSupply: safeGet(coin, 'market_data.circulating_supply', 0),
            totalSupply: safeGet(coin, 'market_data.total_supply'),
            maxSupply: safeGet(coin, 'market_data.max_supply'),
            ath: safeGet(coin, `market_data.ath.${currency}`, 0),
            athChangePercentage: safeGet(coin, `market_data.ath_change_percentage.${currency}`, 0),
            athDate: safeGet(coin, `market_data.ath_date.${currency}`, ''),
            atl: safeGet(coin, `market_data.atl.${currency}`, 0),
            atlChangePercentage: safeGet(coin, `market_data.atl_change_percentage.${currency}`, 0),
            atlDate: safeGet(coin, `market_data.atl_date.${currency}`, ''),
            // Korrigierte Pfade für Links-Informationen
            homepage: safeArrayFilter(safeGet(coin, 'links.homepage', []), (url: any) => Boolean(url && typeof url === 'string' && url.trim() !== '')),
            socialLinks: {
                twitter: safeGet(coin, 'links.twitter_screen_name') ? `https://twitter.com/${safeGet(coin, 'links.twitter_screen_name')}` : undefined,
                facebook: safeGet(coin, 'links.facebook_username') ? `https://facebook.com/${safeGet(coin, 'links.facebook_username')}` : undefined,
                telegram: safeGet(coin, 'links.telegram_channel_identifier') ? `https://t.me/${safeGet(coin, 'links.telegram_channel_identifier')}` : undefined,
                subreddit: safeGet(coin, 'links.subreddit_url') || undefined,
                github: safeArrayFilter(safeGet(coin, 'links.repos_url.github', []), (url: any) => Boolean(url && typeof url === 'string' && url.trim() !== ''))
            }
        };
    }

    private stripHtmlTags(html: string): string {
        if (!html) return '';
        return html.replace(/<[^>]*>/g, '').trim();
    }

    private getErrorMessage(error: unknown): string {
        if (error && typeof error === 'object' && 'message' in error) {
            return String(error.message);
        }
        if (error && typeof error === 'object' && 'error' in error) {
            const httpError = error as { error?: { message?: string } };
            return httpError.error?.message ?? 'Unbekannter Fehler beim Laden der Kryptowährungsdaten';
        }
        return 'Netzwerkfehler beim Laden der Kryptowährungsdaten';
    }
}