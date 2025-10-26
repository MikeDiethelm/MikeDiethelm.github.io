import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { WeatherComponent } from './components/weather/weather';
import { CryptoComponent } from './components/crypto/crypto';
import { AngularSummaryComponent } from './components/angular-summary/angular-summary';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'crypto', component: CryptoComponent },
  { path: 'angular', component: AngularSummaryComponent },
  { path: 'features', redirectTo: '', pathMatch: 'full' }, // Platzhalter für zukünftige Features
  { path: '**', redirectTo: '' }
];
