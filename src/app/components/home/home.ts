import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { NgIf, NgForOf } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { TranslationService } from '../../services/translation.service';

interface Stat {
  number: string;
  label: string;
}

@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatGridListModule, TranslatePipe, NgIf, NgForOf],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  protected imageError = false;

  protected readonly stats: Stat[] = [
    { number: '5+', label: 'home.stats.yearsExperience' },
    { number: '20+', label: 'home.stats.projects' },
    { number: '15+', label: 'home.stats.technologies' },
    { number: '100%', label: 'home.stats.engagement' }
  ];

  private readonly translationService = inject(TranslationService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.initializeLanguage();
  }

  protected viewPortfolio(): void {
    this.scrollToProjects();
  }

  protected openContact(): void {
    this.openEmailClient();
  }

  protected navigateToProject(route: string): void {
    this.router.navigate([route]);
  }

  private initializeLanguage(): void {
    this.translationService.initializeLanguage();
  }

  private scrollToProjects(): void {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private openEmailClient(): void {
    const email = 'mike_diethelm@bluewin.ch';
    const subject = 'Kontakt über Portfolio Website';
    const body = 'Hallo Mike,\n\nIch habe Ihr Portfolio besucht und würde gerne mit Ihnen in Kontakt treten.\n\nMit freundlichen Grüßen';

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}
