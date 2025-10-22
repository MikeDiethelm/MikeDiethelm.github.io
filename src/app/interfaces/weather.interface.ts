export interface WeatherData {
    name: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    weather: Array<{
        main: string;
        description: string;
        icon: string;
    }>;
    wind: {
        speed: number;
        deg: number;
    };
    sys: {
        country: string;
        sunrise: number;
        sunset: number;
    };
    coord: {
        lat: number;
        lon: number;
    };
    dt: number;
}

// Open-Meteo API Response Interfaces
export interface OpenMeteoWeatherResponse {
    latitude: number;
    longitude: number;
    timezone: string;
    current: {
        time: string;
        temperature_2m: number;
        relative_humidity_2m: number;
        apparent_temperature: number;
        surface_pressure: number;
        wind_speed_10m: number;
        wind_direction_10m: number;
        weather_code: number;
    };
    daily: {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        sunrise: string[];
        sunset: string[];
    };
}

export interface GeocodingResponse {
    results: Array<{
        id: number;
        name: string;
        latitude: number;
        longitude: number;
        country: string;
        country_code: string;
        admin1?: string;
        admin2?: string;
    }>;
}

export interface GeocodedLocation {
    name: string;
    coords: {
        lat: number;
        lon: number;
    };
    country?: string;
}

export interface WeatherError {
    message: string;
    code?: number;
}