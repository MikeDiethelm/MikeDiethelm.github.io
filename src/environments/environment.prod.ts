export const environment = {
    production: true,
    weather: {
        // Open-Meteo API - komplett kostenlos, keine Registrierung nötig
        baseUrl: 'https://api.open-meteo.com/v1',
        geocodingUrl: 'https://geocoding-api.open-meteo.com/v1'
    },
    crypto: {
        // CoinGecko API - kostenlos, keine Registrierung nötig
        baseUrl: 'https://api.coingecko.com/api/v3',
        coinsEndpoint: '/coins/markets'
    }
};