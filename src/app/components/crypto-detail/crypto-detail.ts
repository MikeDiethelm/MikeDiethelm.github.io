import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { NgOptimizedImage } from '@angular/common';
import { CryptoService } from '../../services/crypto.service';
import { CryptoDetails, CryptoError } from '../../interfaces/crypto.interface';
import { TranslatePipe } from '../../pipes/translate.pipe';

export interface CryptoDetailDialogData {
    coinId: string;
    coinName: string;
}

@Component({
    selector: 'app-crypto-detail',
    imports: [
        CommonModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MatChipsModule,
        NgOptimizedImage,
        TranslatePipe
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="crypto-detail-dialog">
      @if (loading()) {
        <div class="loading-container">
          <mat-spinner diameter="48"></mat-spinner>
          <h2 mat-dialog-title>{{ 'crypto.detail.loading' | translate }}</h2>
          <p>{{ 'crypto.detail.loadingSubtitle' | translate }}</p>
        </div>
      } @else if (error()) {
        <div class="error-container">
          <mat-icon class="error-icon">error</mat-icon>
          <h2 mat-dialog-title>{{ 'crypto.detail.error.title' | translate }}</h2>
          <p>{{ error()?.message }}</p>
          <div mat-dialog-actions>
            <button mat-button (click)="retry()" color="primary">
              <mat-icon>refresh</mat-icon>
              {{ 'crypto.detail.error.retry' | translate }}
            </button>
            <button mat-button (click)="close()">
              {{ 'crypto.detail.close' | translate }}
            </button>
          </div>
        </div>
      } @else if (coinDetails(); as details) {
        <div class="detail-header">
          <img 
            [ngSrc]="details.image" 
            [alt]="details.name"
            width="48"
            height="48"
            class="coin-image"
          />
          <div class="header-info">
            <h2 mat-dialog-title class="coin-title">
              {{ details.name }} 
              <span class="coin-symbol">({{ details.symbol }})</span>
            </h2>
            <div class="rank-badge">
              #{{ details.marketCapRank }} {{ 'crypto.detail.rank' | translate }}
            </div>
          </div>
          <button mat-icon-button (click)="close()" class="close-button">
            <mat-icon>close</mat-icon>
          </button>
        </div>

        <mat-divider></mat-divider>

        <div mat-dialog-content class="detail-content">
          <!-- Price Information -->
          <div class="price-section">
            <div class="current-price">
              <span class="price-label">{{ 'crypto.detail.currentPrice' | translate }}</span>
              <span class="price-value">{{ formatPrice(details.currentPrice) }}</span>
            </div>
            
            <div class="price-changes">
              <div class="change-item" [class]="getPriceChangeClass(details.priceChangePercentage24h)">
                <span class="change-label">24h</span>
                <span class="change-value">{{ formatPercentage(details.priceChangePercentage24h) }}</span>
              </div>
              <div class="change-item" [class]="getPriceChangeClass(details.priceChangePercentage7d)">
                <span class="change-label">7d</span>
                <span class="change-value">{{ formatPercentage(details.priceChangePercentage7d) }}</span>
              </div>
              <div class="change-item" [class]="getPriceChangeClass(details.priceChangePercentage30d)">
                <span class="change-label">30d</span>
                <span class="change-value">{{ formatPercentage(details.priceChangePercentage30d) }}</span>
              </div>
            </div>
          </div>

          <mat-divider></mat-divider>

          <!-- Market Statistics -->
          <div class="stats-section">
            <h3>{{ 'crypto.detail.marketStats' | translate }}</h3>
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-label">{{ 'crypto.detail.marketCap' | translate }}</span>
                <span class="stat-value">{{ formatMarketCap(details.marketCap) }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">{{ 'crypto.detail.volume24h' | translate }}</span>
                <span class="stat-value">{{ formatMarketCap(details.volume24h) }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">{{ 'crypto.detail.high24h' | translate }}</span>
                <span class="stat-value">{{ formatPrice(details.high24h) }}</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">{{ 'crypto.detail.low24h' | translate }}</span>
                <span class="stat-value">{{ formatPrice(details.low24h) }}</span>
              </div>
            </div>
          </div>

          <mat-divider></mat-divider>

          <!-- Supply Information -->
          <div class="supply-section">
            <h3>{{ 'crypto.detail.supply' | translate }}</h3>
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-label">{{ 'crypto.detail.circulatingSupply' | translate }}</span>
                <span class="stat-value">{{ formatSupply(details.circulatingSupply) }}</span>
              </div>
              @if (details.totalSupply) {
                <div class="stat-item">
                  <span class="stat-label">{{ 'crypto.detail.totalSupply' | translate }}</span>
                  <span class="stat-value">{{ formatSupply(details.totalSupply) }}</span>
                </div>
              }
              @if (details.maxSupply) {
                <div class="stat-item">
                  <span class="stat-label">{{ 'crypto.detail.maxSupply' | translate }}</span>
                  <span class="stat-value">{{ formatSupply(details.maxSupply) }}</span>
                </div>
              }
            </div>
          </div>

          <mat-divider></mat-divider>

          <!-- All-Time Records -->
          <div class="records-section">
            <h3>{{ 'crypto.detail.records' | translate }}</h3>
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-label">{{ 'crypto.detail.allTimeHigh' | translate }}</span>
                <div class="ath-info">
                  <span class="stat-value">{{ formatPrice(details.ath) }}</span>
                  <span class="ath-change" [class]="getPriceChangeClass(details.athChangePercentage)">
                    {{ formatPercentage(details.athChangePercentage) }}
                  </span>
                  <span class="ath-date">{{ formatDate(details.athDate) }}</span>
                </div>
              </div>
              <div class="stat-item">
                <span class="stat-label">{{ 'crypto.detail.allTimeLow' | translate }}</span>
                <div class="atl-info">
                  <span class="stat-value">{{ formatPrice(details.atl) }}</span>
                  <span class="atl-change" [class]="getPriceChangeClass(details.atlChangePercentage)">
                    {{ formatPercentage(details.atlChangePercentage) }}
                  </span>
                  <span class="atl-date">{{ formatDate(details.atlDate) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Description -->
          @if (details.description) {
            <mat-divider></mat-divider>
            <div class="description-section">
              <h3>{{ 'crypto.detail.about' | translate }} {{ details.name }}</h3>
              <p class="description-text">{{ getShortDescription(details.description) }}</p>
            </div>
          }

          <!-- Links -->
          <mat-divider></mat-divider>
          <div class="links-section">
            <h3>{{ 'crypto.detail.links' | translate }}</h3>
            <div class="links-container">
              @if (details.homepage.length > 0) {
                <a [href]="details.homepage[0]" target="_blank" rel="noopener noreferrer" mat-button class="link-button">
                  <mat-icon>language</mat-icon>
                  {{ 'crypto.detail.website' | translate }}
                </a>
              }
              @if (details.socialLinks.twitter) {
                <a [href]="details.socialLinks.twitter" target="_blank" rel="noopener noreferrer" mat-button class="link-button">
                  <mat-icon>alternate_email</mat-icon>
                  Twitter
                </a>
              }
              @if (details.socialLinks.github && details.socialLinks.github.length > 0) {
                <a [href]="details.socialLinks.github[0]" target="_blank" rel="noopener noreferrer" mat-button class="link-button">
                  <mat-icon>code</mat-icon>
                  GitHub
                </a>
              }
            </div>
          </div>
        </div>

        <div mat-dialog-actions class="dialog-actions">
          <button mat-button (click)="close()">
            {{ 'crypto.detail.close' | translate }}
          </button>
        </div>
      }
    </div>
  `,
    styleUrl: './crypto-detail.scss'
})
export class CryptoDetailComponent {
    private readonly dialogRef = inject(MatDialogRef<CryptoDetailComponent>);
    private readonly data = inject<CryptoDetailDialogData>(MAT_DIALOG_DATA);
    private readonly cryptoService = inject(CryptoService);

    readonly loading = signal(false);
    readonly error = signal<CryptoError | null>(null);
    readonly coinDetails = signal<CryptoDetails | null>(null);

    readonly currentCurrencyInfo = computed(() => this.cryptoService.currentCurrencyInfo());

    constructor() {
        this.loadCoinDetails();
    }

    private loadCoinDetails(): void {
        this.loading.set(true);
        this.error.set(null);

        this.cryptoService.getCoinDetails(this.data.coinId).subscribe({
            next: (details) => {
                this.coinDetails.set(details);
                this.loading.set(false);
            },
            error: (error) => {
                this.error.set(error);
                this.loading.set(false);
            }
        });
    }

    retry(): void {
        this.loadCoinDetails();
    }

    close(): void {
        this.dialogRef.close();
    }

    formatPrice(price: number): string {
        const currencyInfo = this.currentCurrencyInfo();
        return `${currencyInfo.symbol}${price.toLocaleString('de-CH', {
            minimumFractionDigits: price < 1 ? 4 : 2,
            maximumFractionDigits: price < 1 ? 4 : 2
        })}`;
    }

    formatPercentage(percentage: number): string {
        const sign = percentage >= 0 ? '+' : '';
        return `${sign}${percentage.toFixed(2)}%`;
    }

    formatMarketCap(value: number): string {
        const currencyInfo = this.currentCurrencyInfo();
        if (value >= 1e12) {
            return `${currencyInfo.symbol}${(value / 1e12).toFixed(2)}T`;
        }
        if (value >= 1e9) {
            return `${currencyInfo.symbol}${(value / 1e9).toFixed(2)}B`;
        }
        if (value >= 1e6) {
            return `${currencyInfo.symbol}${(value / 1e6).toFixed(2)}M`;
        }
        return `${currencyInfo.symbol}${value.toLocaleString('de-CH')}`;
    }

    formatSupply(supply: number): string {
        if (supply >= 1e12) {
            return `${(supply / 1e12).toFixed(2)}T`;
        }
        if (supply >= 1e9) {
            return `${(supply / 1e9).toFixed(2)}B`;
        }
        if (supply >= 1e6) {
            return `${(supply / 1e6).toFixed(2)}M`;
        }
        return supply.toLocaleString('de-CH');
    }

    formatDate(dateString: string): string {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('de-CH');
    }

    getPriceChangeClass(percentage: number): string {
        return percentage >= 0 ? 'positive-change' : 'negative-change';
    }

    getShortDescription(description: string): string {
        if (!description) return '';
        const maxLength = 300;
        return description.length > maxLength
            ? description.substring(0, maxLength) + '...'
            : description;
    }
}