// CoinGecko API Response Interfaces
export interface CoinGeckoResponse {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number | null;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number | null;
    max_supply: number | null;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    roi: {
        times: number;
        currency: string;
        percentage: number;
    } | null;
    last_updated: string;
}

// Vereinfachte interne Datenstruktur
export interface CryptoCurrency {
    id: string;
    symbol: string;
    name: string;
    image: string;
    currentPrice: number;
    marketCapRank: number;
    priceChange24h: number;
    priceChangePercentage24h: number;
    marketCap: number;
    volume24h: number;
    high24h: number;
    low24h: number;
    lastUpdated: string;
}

// Error Interface
export interface CryptoError {
    message: string;
    code?: string;
    timestamp: number;
}

// Service State Interface
export interface CryptoState {
    currencies: CryptoCurrency[];
    loading: boolean;
    error: CryptoError | null;
    lastUpdate: number | null;
    totalCount: number;
    currentPage: number;
    pageSize: number;
}

// Supported currencies for price display
export type SupportedCurrency = 'usd' | 'eur' | 'chf';

export interface CurrencyInfo {
    code: SupportedCurrency;
    symbol: string;
    name: string;
}

// Detaillierte Coin-Informationen vom /coins/{id} Endpoint
export interface CoinDetails {
    id: string;
    symbol: string;
    name: string;
    image: {
        thumb: string;
        small: string;
        large: string;
    };
    market_cap_rank: number;
    market_data: {
        current_price: Record<string, number>;
        market_cap: Record<string, number>;
        total_volume: Record<string, number>;
        high_24h: Record<string, number>;
        low_24h: Record<string, number>;
        price_change_24h: number;
        price_change_percentage_24h: number;
        price_change_percentage_7d: number;
        price_change_percentage_30d: number;
        market_cap_change_24h: number;
        market_cap_change_percentage_24h: number;
        circulating_supply: number;
        total_supply: number | null;
        max_supply: number | null;
        ath: Record<string, number>;
        ath_change_percentage: Record<string, number>;
        ath_date: Record<string, string>;
        atl: Record<string, number>;
        atl_change_percentage: Record<string, number>;
        atl_date: Record<string, string>;
    };
    description: {
        en: string;
    };
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string | null;
    facebook_username: string | null;
    telegram_channel_identifier: string | null;
    subreddit_url: string | null;
    repos_url: {
        github: string[];
        bitbucket: string[];
    };
}

// Vereinfachte Detail-Struktur für das UI
export interface CryptoDetails {
    id: string;
    symbol: string;
    name: string;
    image: string;
    description: string;
    marketCapRank: number;
    currentPrice: number;
    marketCap: number;
    volume24h: number;
    high24h: number;
    low24h: number;
    priceChange24h: number;
    priceChangePercentage24h: number;
    priceChangePercentage7d: number;
    priceChangePercentage30d: number;
    circulatingSupply: number;
    totalSupply: number | null;
    maxSupply: number | null;
    ath: number;
    athChangePercentage: number;
    athDate: string;
    atl: number;
    atlChangePercentage: number;
    atlDate: string;
    homepage: string[];
    socialLinks: {
        twitter?: string;
        facebook?: string;
        telegram?: string;
        subreddit?: string;
        github?: string[];
    };
}