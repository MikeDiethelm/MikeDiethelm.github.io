import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { WeatherComponent } from './components/weather/weather';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'weather', component: WeatherComponent },
  { path: 'features', redirectTo: '', pathMatch: 'full' }, // Platzhalter für zukünftige Features
  { path: '**', redirectTo: '' }
];
