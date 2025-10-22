import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { OpenMeteoWeatherResponse, GeocodingResponse, WeatherData, GeocodedLocation, WeatherError } from '../interfaces/weather.interface';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    private readonly http = inject(HttpClient);
    private readonly BASE_URL = environment.weather.baseUrl;
    private readonly GEOCODING_URL = environment.weather.geocodingUrl;

    /**
     * Holt Wetterdaten für eine bestimmte Stadt
     */
    getWeatherByCity(city: string): Observable<WeatherData> {
        // Zuerst Koordinaten für die Stadt abrufen, dann Wetter mit Stadtname
        return this.geocodeCity(city).pipe(
            switchMap(result => {
                const weatherUrl = `${this.BASE_URL}/forecast?latitude=${result.coords.lat}&longitude=${result.coords.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,surface_pressure,wind_speed_10m,wind_direction_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&timezone=auto`;

                return this.http.get<OpenMeteoWeatherResponse>(weatherUrl).pipe(
                    map(weather => this.mapOpenMeteoToWeatherData(weather, result.name, result.coords))
                );
            }),
            catchError(this.handleError)
        );
    }

    /**
     * Geocoding: Stadt zu Koordinaten und Name
     */
    private geocodeCity(city: string): Observable<GeocodedLocation> {
        const url = `${this.GEOCODING_URL}/search?name=${encodeURIComponent(city)}&count=1&language=de&format=json`;

        return this.http.get<GeocodingResponse>(url).pipe(
            map(response => {
                if (!response.results || response.results.length === 0) {
                    throw new Error(`Stadt "${city}" nicht gefunden`);
                }
                const result = response.results[0];

                // Vollständigen Ortsnamen zusammensetzen
                let fullName = result.name;
                if (result.admin1 && result.admin1 !== result.name) {
                    fullName += `, ${result.admin1}`;
                }
                if (result.country) {
                    fullName += `, ${result.country}`;
                }

                return {
                    name: fullName,
                    coords: {
                        lat: result.latitude,
                        lon: result.longitude
                    },
                    country: result.country
                };
            })
        );
    }



    /**
     * Mappt die Open-Meteo API-Response auf unser WeatherData Interface
     */
    private mapOpenMeteoToWeatherData(response: OpenMeteoWeatherResponse, locationName: string, coords: { lat: number; lon: number }): WeatherData {
        // WMO Weather Code zu Beschreibung mapping
        const weatherDescription = this.getWeatherDescription(response.current.weather_code);
        const weatherIcon = this.getWeatherIcon(response.current.weather_code);

        return {
            name: locationName,
            main: {
                temp: Math.round(response.current.temperature_2m),
                feels_like: Math.round(response.current.apparent_temperature),
                temp_min: Math.round(response.daily.temperature_2m_min[0]),
                temp_max: Math.round(response.daily.temperature_2m_max[0]),
                pressure: Math.round(response.current.surface_pressure),
                humidity: Math.round(response.current.relative_humidity_2m)
            },
            weather: [{
                main: weatherDescription.main,
                description: weatherDescription.description,
                icon: weatherIcon
            }],
            wind: {
                speed: Math.round(response.current.wind_speed_10m * 10) / 10, // km/h zu m/s (ungefähr)
                deg: response.current.wind_direction_10m
            },
            sys: {
                country: '', // Open-Meteo gibt kein Land zurück im Weather-Response
                sunrise: new Date(response.daily.sunrise[0]).getTime() / 1000,
                sunset: new Date(response.daily.sunset[0]).getTime() / 1000
            },
            coord: {
                lat: coords.lat,
                lon: coords.lon
            },
            dt: new Date(response.current.time).getTime() / 1000
        };
    }

    /**
     * Konvertiert WMO Weather Code zu Beschreibung
     */
    private getWeatherDescription(code: number): { main: string; description: string } {
        const weatherCodes: { [key: number]: { main: string; description: string } } = {
            0: { main: 'Clear', description: 'Klarer Himmel' },
            1: { main: 'Clear', description: 'Überwiegend klar' },
            2: { main: 'Clouds', description: 'Teilweise bewölkt' },
            3: { main: 'Clouds', description: 'Bedeckt' },
            45: { main: 'Fog', description: 'Nebel' },
            48: { main: 'Fog', description: 'Nebel mit Reifablagerung' },
            51: { main: 'Drizzle', description: 'Leichter Nieselregen' },
            53: { main: 'Drizzle', description: 'Mäßiger Nieselregen' },
            55: { main: 'Drizzle', description: 'Dichter Nieselregen' },
            61: { main: 'Rain', description: 'Leichter Regen' },
            63: { main: 'Rain', description: 'Mäßiger Regen' },
            65: { main: 'Rain', description: 'Starker Regen' },
            71: { main: 'Snow', description: 'Leichter Schneefall' },
            73: { main: 'Snow', description: 'Mäßiger Schneefall' },
            75: { main: 'Snow', description: 'Starker Schneefall' },
            77: { main: 'Snow', description: 'Schneekörner' },
            80: { main: 'Rain', description: 'Leichte Regenschauer' },
            81: { main: 'Rain', description: 'Mäßige Regenschauer' },
            82: { main: 'Rain', description: 'Heftige Regenschauer' },
            85: { main: 'Snow', description: 'Leichte Schneeschauer' },
            86: { main: 'Snow', description: 'Schwere Schneeschauer' },
            95: { main: 'Thunderstorm', description: 'Gewitter' },
            96: { main: 'Thunderstorm', description: 'Gewitter mit leichtem Hagel' },
            99: { main: 'Thunderstorm', description: 'Gewitter mit schwerem Hagel' }
        };

        return weatherCodes[code] || { main: 'Unknown', description: 'Unbekanntes Wetter' };
    }

    /**
     * Konvertiert WMO Weather Code zu Icon-Name
     */
    private getWeatherIcon(code: number): string {
        const iconMapping: { [key: number]: string } = {
            0: '01d', // Clear sky
            1: '02d', // Mainly clear
            2: '03d', // Partly cloudy
            3: '04d', // Overcast
            45: '50d', // Fog
            48: '50d', // Depositing rime fog
            51: '09d', // Drizzle: Light
            53: '09d', // Drizzle: Moderate
            55: '09d', // Drizzle: Dense
            61: '10d', // Rain: Slight
            63: '10d', // Rain: Moderate
            65: '10d', // Rain: Heavy
            71: '13d', // Snow fall: Slight
            73: '13d', // Snow fall: Moderate
            75: '13d', // Snow fall: Heavy
            77: '13d', // Snow grains
            80: '09d', // Rain showers: Slight
            81: '09d', // Rain showers: Moderate
            82: '09d', // Rain showers: Violent
            85: '13d', // Snow showers slight
            86: '13d', // Snow showers heavy
            95: '11d', // Thunderstorm: Slight or moderate
            96: '11d', // Thunderstorm with slight hail
            99: '11d'  // Thunderstorm with heavy hail
        };

        return iconMapping[code] || '01d';
    }

    /**
     * Behandelt HTTP-Fehler
     */
    private handleError = (error: any): Observable<never> => {
        let errorMessage: WeatherError;

        if (error.error instanceof ErrorEvent) {
            // Client-seitiger Fehler
            errorMessage = {
                message: `Netzwerkfehler: ${error.error.message}`
            };
        } else {
            // Server-seitiger Fehler
            switch (error.status) {
                case 401:
                    errorMessage = {
                        message: 'Ungültiger API-Schlüssel',
                        code: error.status
                    };
                    break;
                case 404:
                    errorMessage = {
                        message: 'Stadt nicht gefunden',
                        code: error.status
                    };
                    break;
                case 429:
                    errorMessage = {
                        message: 'API-Limit erreicht. Versuchen Sie es später erneut.',
                        code: error.status
                    };
                    break;
                default:
                    errorMessage = {
                        message: `Serverfehler: ${error.status} - ${error.message}`,
                        code: error.status
                    };
            }
        }

        console.error('WeatherService Error:', errorMessage);
        return throwError(() => errorMessage);
    };
}