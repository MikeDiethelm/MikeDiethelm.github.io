import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CvViewerComponent } from './components/cv-viewer/cv-viewer.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cv', component: CvViewerComponent },
  { path: 'features', redirectTo: '', pathMatch: 'full' }, // Platzhalter für zukünftige Features
  { path: '**', redirectTo: '' }
];
