import { Component, signal, computed, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService } from '../../services/weather.service';
import { WeatherData, WeatherError } from '../../interfaces/weather.interface';

@Component({
  selector: 'app-weather',
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="weather-container">
      <header class="weather-header">
        <h1>🌤️ Wettervorhersage</h1>
        <p>Aktuelle Wetterdaten für deine Stadt</p>
      </header>

      <div class="weather-search">
        <div class="search-controls">
          <input 
            type="text" 
            [(ngModel)]="searchCity" 
            placeholder="Stadt eingeben (z.B. Berlin, München...)"
            class="city-input"
            (keyup.enter)="loadWeatherByCity()"
          />
          <button 
            (click)="loadWeatherByCity()" 
            [disabled]="isLoading() || !searchCity.trim()"
            class="search-btn"
          >
            @if (isLoading()) {
              🔄 Laden...
            } @else {
              🔍 Suchen
            }
          </button>
        </div>
        
        <div class="quick-cities-section">
          <p class="cities-hint">
            💡 Oder wähle eine dieser beliebten Städte:
          </p>
          <div class="quick-cities">
            @for (city of quickCities; track city) {
              <button 
                (click)="loadQuickCity(city)"
                [disabled]="isLoading()"
                class="quick-city-btn"
              >
                {{ city }}
              </button>
            }
          </div>
        </div>
      </div>

      @if (error()) {
        <div class="error-message">
          <h3>❌ Fehler</h3>
          <p>{{ error()?.message }}</p>

          @if (error()?.message?.includes('nicht gefunden')) {
            <div class="error-help">
              <p><strong>💡 Tipp:</strong> Prüfe die Schreibweise oder versuche es mit einem anderen Stadtnamen.</p>
            </div>
          }
          <button (click)="clearError()" class="clear-error-btn">
            Schließen
          </button>
        </div>
      }

      @if (weatherData()) {
        <div class="weather-card">
          <div class="weather-main">
            <div class="location-info">
              <h2>{{ weatherData()!.name }}, {{ weatherData()!.sys.country }}</h2>
              <p class="coordinates">
                {{ weatherData()!.coord.lat.toFixed(2) }}°N, 
                {{ weatherData()!.coord.lon.toFixed(2) }}°O
              </p>
            </div>
            
            <div class="temperature-section">
              <div class="current-temp">
                <span class="temp-value">{{ weatherData()!.main.temp }}°</span>
                <img 
                  [src]="weatherIconUrl()" 
                  [alt]="weatherData()!.weather[0].description"
                  class="weather-icon"
                />
              </div>
              <p class="weather-description">
                {{ weatherData()!.weather[0].description | titlecase }}
              </p>
              <p class="feels-like">
                Gefühlt {{ weatherData()!.main.feels_like }}°C
              </p>
            </div>
          </div>

          <div class="weather-details">
            <div class="detail-grid">
              <div class="detail-item">
                <span class="detail-icon">🌡️</span>
                <div class="detail-content">
                  <span class="detail-label">Min/Max</span>
                  <span class="detail-value">
                    {{ weatherData()!.main.temp_min }}° / {{ weatherData()!.main.temp_max }}°
                  </span>
                </div>
              </div>

              <div class="detail-item">
                <span class="detail-icon">💧</span>
                <div class="detail-content">
                  <span class="detail-label">Luftfeuchtigkeit</span>
                  <span class="detail-value">{{ weatherData()!.main.humidity }}%</span>
                </div>
              </div>

              <div class="detail-item">
                <span class="detail-icon">📊</span>
                <div class="detail-content">
                  <span class="detail-label">Luftdruck</span>
                  <span class="detail-value">{{ weatherData()!.main.pressure }} hPa</span>
                </div>
              </div>

              <div class="detail-item">
                <span class="detail-icon">💨</span>
                <div class="detail-content">
                  <span class="detail-label">Wind</span>
                  <span class="detail-value">
                    {{ weatherData()!.wind.speed.toFixed(1) }} m/s
                    @if (weatherData()!.wind.deg) {
                      ({{ windDirection() }})
                    }
                  </span>
                </div>
              </div>

              <div class="detail-item">
                <span class="detail-icon">🌅</span>
                <div class="detail-content">
                  <span class="detail-label">Sonnenaufgang</span>
                  <span class="detail-value">{{ sunriseTime() }}</span>
                </div>
              </div>

              <div class="detail-item">
                <span class="detail-icon">🌇</span>
                <div class="detail-content">
                  <span class="detail-label">Sonnenuntergang</span>
                  <span class="detail-value">{{ sunsetTime() }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="weather-footer">
            <p class="last-updated">
              Zuletzt aktualisiert: {{ lastUpdateTime() }}
            </p>
            <button (click)="refreshWeather()" class="refresh-btn">
              🔄 Aktualisieren
            </button>
          </div>
        </div>
      }

      @if (!weatherData() && !error() && !isLoading()) {
        <div class="welcome-message">
          <h2>🌍 Willkommen bei der Wettervorhersage!</h2>
          <p>Gib eine Stadt ein oder nutze deinen aktuellen Standort, um die Wetterdaten zu sehen.</p>
        </div>
      }
    </div>
  `,
  styleUrls: ['./weather.scss']
})
export class WeatherComponent implements OnInit {
  private readonly weatherService = inject(WeatherService);

  // Signals für reaktive Daten
  weatherData = signal<WeatherData | null>(null);
  isLoading = signal(false);
  error = signal<WeatherError | null>(null);

  // Eingabefeld für Stadt-Suche
  searchCity = '';

  // Beliebte Städte für schnellen Zugriff
  quickCities = ['Berlin', 'München', 'Hamburg', 'Köln', 'Frankfurt', 'Stuttgart'];

  // Berechnete Werte
  weatherIconUrl = computed(() => {
    const weather = this.weatherData();
    return weather
      ? `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
      : '';
  });

  windDirection = computed(() => {
    const weather = this.weatherData();
    if (!weather?.wind.deg) return '';

    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
      'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(weather.wind.deg / 22.5) % 16;
    return directions[index];
  });

  sunriseTime = computed(() => {
    const weather = this.weatherData();
    return weather
      ? new Date(weather.sys.sunrise * 1000).toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit'
      })
      : '';
  });

  sunsetTime = computed(() => {
    const weather = this.weatherData();
    return weather
      ? new Date(weather.sys.sunset * 1000).toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit'
      })
      : '';
  });

  lastUpdateTime = computed(() => {
    const weather = this.weatherData();
    return weather
      ? new Date(weather.dt * 1000).toLocaleString('de-DE')
      : '';
  });

  ngOnInit(): void {
    // Optional: Automatisch Wetter für Standard-Stadt laden
    // this.loadDefaultWeather();
  }

  loadWeatherByCity(): void {
    if (!this.searchCity.trim()) return;

    this.clearError();
    this.isLoading.set(true);

    this.weatherService.getWeatherByCity(this.searchCity.trim()).subscribe({
      next: (data) => {
        this.weatherData.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set(err);
        this.isLoading.set(false);
        this.weatherData.set(null);
      }
    });
  }

  refreshWeather(): void {
    if (this.weatherData()) {
      // Aktualisiere mit letzter Stadt oder Koordinaten
      this.loadWeatherByCity();
    }
  }

  loadQuickCity(city: string): void {
    this.searchCity = city;
    this.loadWeatherByCity();
  }

  clearError(): void {
    this.error.set(null);
  }

  private loadDefaultWeather(): void {
    // Beispiel: Automatisch Wetter für Berlin laden
    this.searchCity = 'Berlin';
    this.loadWeatherByCity();
  }
}