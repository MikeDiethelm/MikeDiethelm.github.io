import { Pipe, PipeTransform, inject, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { effect, Injector, EffectRef } from '@angular/core';

@Pipe({
  name: 'translate',
  pure: true
})
export class TranslatePipe implements PipeTransform, OnDestroy {
  private readonly translationService = inject(TranslationService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly injector = inject(Injector);
  private effectRef?: EffectRef;

  constructor() {
    // Use effect to mark component for check when language changes
    this.effectRef = effect(() => {
      // Track language changes
      this.translationService.getCurrentLang();
      // Mark for check when language changes
      this.cdr.markForCheck();
    }, { injector: this.injector, allowSignalWrites: true });
  }

  transform(key: string): string {
    return this.translationService.translate(key);
  }

  ngOnDestroy(): void {
    this.effectRef?.destroy();
  }
}