import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';
import type { Poem } from '../../services/poems.service';
import { shareClasses } from '../../theme-utils';
import type { ThemeId } from '../../services/settings.service';

@Component({
  selector: 'app-share-card',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="p-6 rounded-2xl shadow-2xl"
      [class]="styles().bg"
      style="aspect-ratio: 3/4; min-height: 480px">
      <div class="backdrop-blur-sm rounded-xl h-full flex flex-col p-6"
        [class]="styles().card">
        <div class="flex items-center justify-center gap-3 mb-6">
          <div class="w-8 h-px opacity-40" [class]="styles().accentBg"></div>
          <!-- Feather icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-60" [class]="styles().accent">
            <path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z"/>
            <path d="M16 8 2 22"/>
            <path d="M17.5 15H9"/>
          </svg>
          <div class="w-8 h-px opacity-40" [class]="styles().accentBg"></div>
        </div>

        <p class="text-xs text-center tracking-[0.4em] mb-4" [class]="styles().muted">
          {{ poem().cipai }}
        </p>

        <h2 class="text-2xl font-bold text-center mb-3 tracking-wider"
          [class]="styles().title"
          style="font-family: 'Ma Shan Zheng', cursive">
          {{ poem().title }}
        </h2>

        <p class="text-xs text-center mb-6" [class]="styles().muted">
          {{ poem().dynasty }} · {{ poem().author }}
        </p>

        <div class="w-12 h-px mx-auto mb-6 opacity-50" [class]="styles().accentBg"></div>

        <div class="flex-1 flex flex-col justify-center gap-3">
          @for (line of displayLines(); track $index) {
            <p class="text-base text-left leading-relaxed tracking-widest"
              [class]="styles().text"
              style="font-family: 'Noto Serif SC', serif">
              {{ line }}
            </p>
          }
          @if (allLines().length > 4) {
            <p class="text-sm text-left" [class]="styles().muted">......</p>
          }
        </div>

        <div class="mt-6 pt-4 border-t border-current/10">
          <div class="flex items-center justify-center gap-2">
            <!-- Feather icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" [class]="styles().accent">
              <path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z"/>
              <path d="M16 8 2 22"/>
              <path d="M17.5 15H9"/>
            </svg>
            <span class="text-xs tracking-wider" [class]="styles().muted">诗词集</span>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ShareCardComponent {
  poem = input.required<Poem>();
  theme = input.required<ThemeId>();

  styles = computed(() => shareClasses[this.theme()] ?? shareClasses.classic);

  allLines = computed(() => this.poem().paragraphs.flat());
  displayLines = computed(() => this.allLines().slice(0, 4));
}
