import { Component, signal, computed, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { WeatherService } from '../../services/weather.service';
import { WeatherData, WeatherError } from '../../interfaces/weather.interface';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-weather',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatChipsModule,
    MatTooltipModule,
    TranslatePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="weather-container">
      <!-- Header Card -->
      <mat-card class="weather-header-card">
        <mat-card-header>
          <div mat-card-avatar>
            <mat-icon class="header-icon">wb_sunny</mat-icon>
          </div>
          <mat-card-title>{{ 'weather.title' | translate }}</mat-card-title>
          <mat-card-subtitle>{{ 'weather.subtitle' | translate }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-actions align="start">
          <button 
            mat-button 
            (click)="navigateHome()"
            [matTooltip]="'weather.backToHome.tooltip' | translate"
            class="back-button"
          >
            <mat-icon>arrow_back</mat-icon>
            {{ 'weather.backToHome.button' | translate }}
          </button>
        </mat-card-actions>
      </mat-card>

      <!-- Search Card -->
      <mat-card class="search-card">
        <mat-card-content>
          <div class="search-section">
            <mat-form-field appearance="outline" class="city-input">
              <mat-label>{{ 'weather.search.label' | translate }}</mat-label>
              <input 
                matInput 
                [(ngModel)]="searchCity" 
                [placeholder]="'weather.search.placeholder' | translate"
                (keyup.enter)="loadWeatherByCity()"
              />
              <mat-icon matSuffix>location_city</mat-icon>
            </mat-form-field>
            
            @if (isLoading()) {
              <button 
                mat-raised-button 
                color="primary"
                [disabled]="true"
                class="search-btn"
                [attr.aria-busy]="true"
                [attr.aria-label]="'weather.loading' | translate"
              >
                <mat-spinner diameter="20"></mat-spinner>
                <span>{{ 'weather.loading' | translate }}</span>
              </button>
            } @else {
              <button 
                mat-raised-button 
                color="primary"
                (click)="loadWeatherByCity()" 
                [disabled]="!searchCity.trim()"
                class="search-btn"
                [attr.aria-label]="'weather.search.button' | translate"
              >
                <mat-icon>search</mat-icon>
                <span>{{ 'weather.search.button' | translate }}</span>
              </button>
            }
          </div>
          
          <mat-divider></mat-divider>
          
          <div class="quick-cities-section">
            <p class="cities-hint">{{ 'weather.popular.title' | translate }}</p>
            <mat-chip-set aria-label="Quick city selection" class="quick-cities">
              @for (city of quickCities; track city) {
                <mat-chip-option 
                  (click)="loadQuickCity(city)"
                  [selected]="selectedCity() === city"
                  [disabled]="isLoading()"
                  [attr.aria-label]="'Select ' + city"
                >
                  {{ city }}
                </mat-chip-option>
              }
            </mat-chip-set>
          </div>
        </mat-card-content>
      </mat-card>

            <!-- Error Card -->
      @if (error()) {
        <mat-card class="error-card" role="alert">
          <mat-card-header>
            <div mat-card-avatar>
              <mat-icon class="error-icon">error</mat-icon>
            </div>
            <mat-card-title>{{ 'weather.error.title' | translate }}</mat-card-title>
            <mat-card-subtitle>{{ error()?.message }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            @if (error()?.message?.includes('nicht gefunden')) {
              <p><strong>💡 {{ 'weather.error.tip' | translate }}:</strong> {{ 'weather.error.suggestion' | translate }}</p>
            }
          </mat-card-content>
          <mat-card-actions align="end">
            <button mat-button (click)="clearError()" [attr.aria-label]="'weather.error.close' | translate">
              <mat-icon>close</mat-icon>
              {{ 'weather.error.close' | translate }}
            </button>
          </mat-card-actions>
        </mat-card>
      }

      <!-- Weather Data Card -->
      @if (weatherData()) {
        <mat-card class="weather-data-card" role="region" [attr.aria-label]="'Weather data for ' + weatherData()!.name">
          <mat-card-header>
            <div mat-card-avatar>
              <img 
                [src]="weatherIconUrl()" 
                [alt]="weatherData()!.weather[0].description"
                class="weather-avatar-icon"
                loading="lazy"
              />
            </div>
            <mat-card-title>{{ weatherData()!.name }}</mat-card-title>
            <mat-card-subtitle>
              {{ weatherData()!.coord.lat.toFixed(2) }}°N, 
              {{ weatherData()!.coord.lon.toFixed(2) }}°{{ weatherData()!.coord.lon >= 0 ? 'E' : 'W' }}
            </mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content>
            <div class="temperature-section">
              <div class="main-temperature">
                <span class="temp-value">{{ weatherData()!.main.temp }}°C</span>
                <p class="weather-description">
                  {{ weatherData()!.weather[0].description | titlecase }}
                </p>
                <p class="feels-like">
                  {{ 'weather.feelsLike' | translate }} {{ weatherData()!.main.feels_like }}°C
                </p>
              </div>
            </div>
            
            
            <div class="weather-details">
              <div class="detail-grid">
                <div class="detail-item">
                  <mat-icon>thermostat</mat-icon>
                  <div class="detail-content">
                    <span class="detail-label">{{ 'weather.minMax' | translate }}</span>
                    <span class="detail-value">
                      {{ weatherData()!.main.temp_min }}° / {{ weatherData()!.main.temp_max }}°
                    </span>
                  </div>
                </div>

                <div class="detail-item">
                  <mat-icon>water_drop</mat-icon>
                  <div class="detail-content">
                    <span class="detail-label">{{ 'weather.humidity' | translate }}</span>
                    <span class="detail-value">{{ weatherData()!.main.humidity }}%</span>
                  </div>
                </div>

                <div class="detail-item">
                  <mat-icon>speed</mat-icon>
                  <div class="detail-content">
                    <span class="detail-label">{{ 'weather.pressure' | translate }}</span>
                    <span class="detail-value">{{ weatherData()!.main.pressure }} hPa</span>
                  </div>
                </div>

                <div class="detail-item">
                  <mat-icon>air</mat-icon>
                  <div class="detail-content">
                    <span class="detail-label">{{ 'weather.wind' | translate }}</span>
                    <span class="detail-value">
                      {{ weatherData()!.wind.speed.toFixed(1) }} m/s
                      @if (weatherData()!.wind.deg) {
                        ({{ windDirection() }})
                      }
                    </span>
                  </div>
                </div>

                <div class="detail-item">
                  <mat-icon>wb_twilight</mat-icon>
                  <div class="detail-content">
                    <span class="detail-label">{{ 'weather.sunrise' | translate }}</span>
                    <span class="detail-value">{{ sunriseTime() }}</span>
                  </div>
                </div>

                <div class="detail-item">
                  <mat-icon>nights_stay</mat-icon>
                  <div class="detail-content">
                    <span class="detail-label">{{ 'weather.sunset' | translate }}</span>
                    <span class="detail-value">{{ sunsetTime() }}</span>
                  </div>
                </div>
              </div>
            </div>
          </mat-card-content>
          
          <mat-card-actions align="end">
            <span class="last-updated">
              {{ 'weather.lastUpdated' | translate }}: {{ lastUpdateTime() }}
            </span>
            <button 
              mat-button 
              (click)="refreshWeather()" 
              [attr.aria-label]="'weather.refresh' | translate"
            >
              <mat-icon>refresh</mat-icon>
              {{ 'weather.refresh' | translate }}
            </button>
          </mat-card-actions>
        </mat-card>
      }



      <!-- Welcome Card -->
      @if (!weatherData() && !error() && !isLoading()) {
        <div class="welcome-placeholder">
          <!-- Kein Inhalt erforderlich - nur Platzhalter -->
        </div>
      }
    </div>
  `,
  styleUrl: './weather.scss'
})
export class WeatherComponent implements OnInit {
  private readonly weatherService = inject(WeatherService);
  private readonly router = inject(Router);

  // Signals für reaktive Daten
  weatherData = signal<WeatherData | null>(null);
  isLoading = signal(false);
  error = signal<WeatherError | null>(null);
  selectedCity = signal<string | null>(null); // Track selected city

  // Eingabefeld für Stadt-Suche
  searchCity = '';

  // Beliebte Städte für schnellen Zugriff
  quickCities = ['Zürich', 'Berlin', 'London', 'Paris', 'Rom', 'Moskau', 'Warschau', 'New York'];

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
        this.selectedCity.set(this.searchCity.trim()); // Set selected city
      },
      error: (err) => {
        this.error.set(err);
        this.isLoading.set(false);
        this.weatherData.set(null);
        this.selectedCity.set(null); // Clear selection on error
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

  navigateHome(): void {
    this.router.navigate(['/']);
  }

  private loadDefaultWeather(): void {
    // Beispiel: Automatisch Wetter für Berlin laden
    this.searchCity = 'Berlin';
    this.loadWeatherByCity();
  }
}