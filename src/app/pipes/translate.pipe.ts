import { Pipe, PipeTransform, inject, computed } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translate',
  pure: false,
  standalone: true
})
export class TranslatePipe implements PipeTransform {
  private translationService = inject(TranslationService);
  
  // Use computed for reactive updates
  private currentLang = this.translationService.getCurrentLang;

  transform(key: string): string {
    // Access current language to trigger reactivity
    this.currentLang();
    return this.translationService.translate(key);
  }
}