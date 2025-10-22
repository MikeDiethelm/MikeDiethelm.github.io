import { Component, signal, computed, inject, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { NgOptimizedImage } from '@angular/common';
import { Subscription } from 'rxjs';
import { CryptoService } from '../../services/crypto.service';
import { CryptoCurrency, SupportedCurrency } from '../../interfaces/crypto.interface';
import { CryptoDetailComponent } from '../crypto-detail/crypto-detail';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
    selector: 'app-crypto',
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MatChipsModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatSelectModule,
        MatFormFieldModule,
        NgOptimizedImage,
        TranslatePipe
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="crypto-container">
      <!-- Header Card -->
      <mat-card class="crypto-header-card">
        <mat-card-header>
          <div mat-card-avatar>
            <mat-icon class="header-icon">trending_up</mat-icon>
          </div>
          <mat-card-title>{{ 'crypto.title' | translate }}</mat-card-title>
          <mat-card-subtitle>{{ 'crypto.subtitle' | translate }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-actions>
          <button 
            mat-button 
            (click)="navigateHome()"
            [matTooltip]="'crypto.backToHome.tooltip' | translate"
            class="back-button"
          >
            <mat-icon>arrow_back</mat-icon>
            {{ 'crypto.backToHome.button' | translate }}
          </button>
          
          @if (cryptoService.loading()) {
            <button mat-raised-button [disabled]="true">
              <mat-spinner diameter="20"></mat-spinner>
              {{ 'crypto.loading' | translate }}
            </button>
          } @else {
            <button 
              mat-raised-button 
              color="primary" 
              (click)="refreshData()"
              [matTooltip]="'crypto.refresh.tooltip' | translate"
            >
              <mat-icon>refresh</mat-icon>
              {{ 'crypto.refresh.button' | translate }}
            </button>
          }
        </mat-card-actions>
      </mat-card>

      <!-- Controls -->
      <mat-card class="controls-card">
        <mat-card-content>
          <div class="controls-section">
            <!-- Currency Selection -->
            <div class="currency-selection">
              <span class="currency-label">{{ 'crypto.currency.label' | translate }}</span>
              <div class="currency-chips">
                @for (currency of cryptoService.supportedCurrencies; track currency.code) {
                  <mat-chip-option 
                    [selected]="currency.code === cryptoService.selectedCurrency()"
                    (click)="selectCurrency(currency.code)"
                    [disabled]="cryptoService.loading()"
                    class="currency-chip"
                  >
                    {{ currency.symbol }} {{ currency.name }}
                  </mat-chip-option>
                }
              </div>
            </div>

            <mat-divider></mat-divider>

            <!-- Controls Row -->
            <div class="controls-row">
              <!-- Market Size Selection -->
              <mat-form-field appearance="outline" class="market-size-field">
                <mat-label>{{ 'crypto.marketSize.label' | translate }}</mat-label>
                <mat-select 
                  [value]="cryptoService.totalCount()" 
                  (selectionChange)="onMarketSizeChange($event.value)"
                  [disabled]="cryptoService.loading()"
                >
                  @for (size of marketSizeOptions; track size.value) {
                    <mat-option [value]="size.value">
                      {{ size.label | translate }}
                    </mat-option>
                  }
                </mat-select>
              </mat-form-field>

              <!-- Page Size Selection -->
              <mat-form-field appearance="outline" class="page-size-field">
                <mat-label>{{ 'crypto.pageSize.label' | translate }}</mat-label>
                <mat-select 
                  [value]="cryptoService.pageSize()" 
                  (selectionChange)="onPageSizeChange($event.value)"
                  [disabled]="cryptoService.loading()"
                >
                  @for (size of cryptoService.pageSizeOptions; track size) {
                    <mat-option [value]="size">
                      {{ size }} {{ 'crypto.pageSize.coinsPerPage' | translate }}
                    </mat-option>
                  }
                </mat-select>
              </mat-form-field>
            </div>

            <!-- Page Info -->
            <div class="page-info">
              <span class="page-info-text">
                {{ 'crypto.pagination.showing' | translate }}: 
                {{ cryptoService.pageInfo().startItem }} - {{ cryptoService.pageInfo().endItem }} 
                {{ 'crypto.pagination.of' | translate }} {{ cryptoService.pageInfo().totalItems }}
              </span>
            </div>
          </div>
        </mat-card-content>
      </mat-card>

      <!-- Error Display -->
      @if (cryptoService.error(); as error) {
        <mat-card class="error-card">
          <mat-card-content>
            <div class="error-content">
              <mat-icon class="error-icon">error</mat-icon>
              <div class="error-text">
                <h3>{{ 'crypto.error.title' | translate }}</h3>
                <p>{{ error.message }}</p>
              </div>
              <button 
                mat-button 
                color="primary" 
                (click)="clearError()"
              >
                {{ 'crypto.error.dismiss' | translate }}
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      }

      <!-- Data Status -->
      @if (cryptoService.lastUpdate() && !cryptoService.loading()) {
        <div class="data-status">
          <mat-icon 
            [class]="cryptoService.isDataStale() ? 'stale-icon' : 'fresh-icon'"
          >
            {{ cryptoService.isDataStale() ? 'schedule' : 'check_circle' }}
          </mat-icon>
          <span class="status-text">
            {{ 'crypto.lastUpdate' | translate }}: {{ formatLastUpdate() }}
            @if (cryptoService.isDataStale()) {
              <span class="stale-warning">({{ 'crypto.dataStale' | translate }})</span>
            }
          </span>
        </div>
      }

      <!-- Cryptocurrencies Table -->
      @if (cryptoService.currencies().length > 0 && !cryptoService.loading()) {
        <mat-card class="crypto-table-card">
          <mat-card-header>
            <mat-card-title>{{ 'crypto.topCurrencies' | translate }}</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="crypto-table-container">
              <table mat-table [dataSource]="cryptoService.currencies()" class="crypto-table">
                <!-- Rank Column -->
                <ng-container matColumnDef="rank">
                  <th mat-header-cell *matHeaderCellDef class="rank-header">
                    {{ 'crypto.table.rank' | translate }}
                  </th>
                  <td mat-cell *matCellDef="let crypto" class="rank-cell">
                    {{ crypto.marketCapRank }}
                  </td>
                </ng-container>

                <!-- Name Column -->
                <ng-container matColumnDef="name">
                  <th mat-header-cell *matHeaderCellDef class="name-header">
                    {{ 'crypto.table.name' | translate }}
                  </th>
                  <td mat-cell *matCellDef="let crypto" class="name-cell">
                    <div class="crypto-name">
                      <img 
                        [ngSrc]="crypto.image" 
                        [alt]="crypto.name"
                        width="24"
                        height="24"
                        class="crypto-icon"
                      />
                      <div class="name-info">
                        <span class="crypto-full-name">{{ crypto.name }}</span>
                        <span class="crypto-symbol">{{ crypto.symbol }}</span>
                      </div>
                    </div>
                  </td>
                </ng-container>

                <!-- Price Column -->
                <ng-container matColumnDef="price">
                  <th mat-header-cell *matHeaderCellDef class="price-header">
                    {{ 'crypto.table.price' | translate }}
                  </th>
                  <td mat-cell *matCellDef="let crypto" class="price-cell">
                    <span class="current-price">
                      {{ formatPrice(crypto.currentPrice) }}
                    </span>
                  </td>
                </ng-container>

                <!-- 24h Change Column -->
                <ng-container matColumnDef="change24h">
                  <th mat-header-cell *matHeaderCellDef class="change-header">
                    {{ 'crypto.table.change24h' | translate }}
                  </th>
                  <td mat-cell *matCellDef="let crypto" class="change-cell">
                    <div class="price-change" [class]="getPriceChangeClass(crypto.priceChangePercentage24h)">
                      <mat-icon class="change-icon">
                        {{ crypto.priceChangePercentage24h >= 0 ? 'trending_up' : 'trending_down' }}
                      </mat-icon>
                      <span class="change-percentage">
                        {{ formatPercentage(crypto.priceChangePercentage24h) }}
                      </span>
                    </div>
                  </td>
                </ng-container>

                <!-- Market Cap Column -->
                <ng-container matColumnDef="marketCap">
                  <th mat-header-cell *matHeaderCellDef class="market-cap-header">
                    {{ 'crypto.table.marketCap' | translate }}
                  </th>
                  <td mat-cell *matCellDef="let crypto" class="market-cap-cell">
                    {{ formatMarketCap(crypto.marketCap) }}
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr 
                  mat-row 
                  *matRowDef="let row; columns: displayedColumns;" 
                  class="crypto-row clickable-row"
                  (click)="openCoinDetail(row)"
                  [matTooltip]="'crypto.clickForDetails' | translate"
                ></tr>
              </table>
            </div>
          </mat-card-content>
          
          <!-- Pagination -->
          <mat-card-actions class="pagination-actions">
            <div class="pagination-controls">
              <button 
                mat-icon-button 
                [disabled]="!cryptoService.hasPreviousPage() || cryptoService.loading()"
                (click)="previousPage()"
                [matTooltip]="'crypto.pagination.previous' | translate"
              >
                <mat-icon>chevron_left</mat-icon>
              </button>

              <div class="page-numbers">
                @for (page of getPageNumbers(); track page) {
                  <button 
                    mat-button 
                    [class]="page === cryptoService.currentPage() ? 'current-page' : 'page-button'"
                    [disabled]="cryptoService.loading()"
                    (click)="goToPage(page)"
                  >
                    {{ page }}
                  </button>
                }
              </div>

              <button 
                mat-icon-button 
                [disabled]="!cryptoService.hasNextPage() || cryptoService.loading()"
                (click)="nextPage()"
                [matTooltip]="'crypto.pagination.next' | translate"
              >
                <mat-icon>chevron_right</mat-icon>
              </button>
            </div>
          </mat-card-actions>
        </mat-card>
      }

      <!-- Loading State -->
      @if (cryptoService.loading() && cryptoService.currencies().length === 0) {
        <mat-card class="loading-card">
          <mat-card-content>
            <div class="loading-content">
              <mat-spinner diameter="48"></mat-spinner>
              <p>{{ 'crypto.loading' | translate }}</p>
            </div>
          </mat-card-content>
        </mat-card>
      }

      <!-- Empty State -->
      @if (!cryptoService.loading() && cryptoService.currencies().length === 0 && !cryptoService.error()) {
        <mat-card class="empty-card">
          <mat-card-content>
            <div class="empty-content">
              <mat-icon class="empty-icon">trending_up</mat-icon>
              <h3>{{ 'crypto.empty.title' | translate }}</h3>
              <p>{{ 'crypto.empty.subtitle' | translate }}</p>
              <button 
                mat-raised-button 
                color="primary" 
                (click)="loadInitialData()"
              >
                {{ 'crypto.loadData' | translate }}
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      }
    </div>
  `,
    styleUrl: './crypto.scss'
})
export class CryptoComponent implements OnInit, OnDestroy {
    readonly cryptoService = inject(CryptoService);
    private readonly router = inject(Router);
    private readonly dialog = inject(MatDialog);

    private subscription?: Subscription;

    readonly displayedColumns = ['rank', 'name', 'price', 'change24h', 'marketCap'];

    readonly marketSizeOptions = [
        { value: 100, label: 'crypto.marketSize.top100' },
        { value: 250, label: 'crypto.marketSize.top250' },
        { value: 500, label: 'crypto.marketSize.top500' },
        { value: 1000, label: 'crypto.marketSize.top1000' },
        { value: 2500, label: 'crypto.marketSize.top2500' }
    ];

    ngOnInit(): void {
        this.loadInitialData();
    }

    ngOnDestroy(): void {
        this.subscription?.unsubscribe();
    }

    loadInitialData(): void {
        this.subscription = this.cryptoService.loadCryptocurrencies().subscribe();
    }

    refreshData(): void {
        this.subscription?.unsubscribe();
        this.subscription = this.cryptoService.refresh().subscribe();
    }

    selectCurrency(currency: SupportedCurrency): void {
        this.cryptoService.setCurrency(currency);
    }

    onPageSizeChange(pageSize: number): void {
        this.subscription?.unsubscribe();
        this.cryptoService.setPageSize(pageSize);
    }

    onMarketSizeChange(marketSize: number): void {
        this.subscription?.unsubscribe();
        this.cryptoService.setMaxCoins(marketSize);
        // Daten neu laden nach Änderung der Marktgröße
        this.subscription = this.cryptoService.loadCryptocurrencies(1).subscribe();
    }

    goToPage(page: number): void {
        this.subscription?.unsubscribe();
        this.subscription = this.cryptoService.goToPage(page).subscribe();
    }

    nextPage(): void {
        this.subscription?.unsubscribe();
        this.subscription = this.cryptoService.nextPage().subscribe();
    }

    previousPage(): void {
        this.subscription?.unsubscribe();
        this.subscription = this.cryptoService.previousPage().subscribe();
    }

    getPageNumbers(): number[] {
        const currentPage = this.cryptoService.currentPage();
        const totalPages = this.cryptoService.totalPages();
        const pages: number[] = [];

        // Show max 5 page numbers around current page
        const maxVisible = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        let endPage = Math.min(totalPages, startPage + maxVisible - 1);

        // Adjust if we're near the end
        if (endPage - startPage < maxVisible - 1) {
            startPage = Math.max(1, endPage - maxVisible + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    }

    clearError(): void {
        this.cryptoService.clearError();
    }

    navigateHome(): void {
        this.router.navigate(['/']);
    }

    openCoinDetail(crypto: CryptoCurrency): void {
        const dialogRef = this.dialog.open(CryptoDetailComponent, {
            data: {
                coinId: crypto.id,
                coinName: crypto.name
            },
            width: '90vw',
            maxWidth: '600px',
            maxHeight: '90vh',
            panelClass: 'crypto-detail-dialog-container'
        });

        // Optional: Handle dialog result if needed
        dialogRef.afterClosed().subscribe(result => {
            // Dialog closed
        });
    }

    formatPrice(price: number): string {
        const currencyInfo = this.cryptoService.currentCurrencyInfo();
        return `${currencyInfo.symbol}${price.toLocaleString('de-CH', {
            minimumFractionDigits: price < 1 ? 4 : 2,
            maximumFractionDigits: price < 1 ? 4 : 2
        })}`;
    }

    formatPercentage(percentage: number): string {
        const sign = percentage >= 0 ? '+' : '';
        return `${sign}${percentage.toFixed(2)}%`;
    }

    formatMarketCap(marketCap: number): string {
        const currencyInfo = this.cryptoService.currentCurrencyInfo();
        if (marketCap >= 1e12) {
            return `${currencyInfo.symbol}${(marketCap / 1e12).toFixed(2)}T`;
        }
        if (marketCap >= 1e9) {
            return `${currencyInfo.symbol}${(marketCap / 1e9).toFixed(2)}B`;
        }
        if (marketCap >= 1e6) {
            return `${currencyInfo.symbol}${(marketCap / 1e6).toFixed(2)}M`;
        }
        return `${currencyInfo.symbol}${marketCap.toLocaleString('de-CH')}`;
    }

    formatLastUpdate(): string {
        const lastUpdate = this.cryptoService.lastUpdate();
        if (!lastUpdate) return '';

        const date = new Date(lastUpdate);
        return date.toLocaleTimeString('de-CH', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    getPriceChangeClass(percentage: number): string {
        return percentage >= 0 ? 'positive-change' : 'negative-change';
    }
}