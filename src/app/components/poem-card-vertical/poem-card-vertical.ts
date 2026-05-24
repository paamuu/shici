import { Component, input, computed } from '@angular/core';
import type { Poem } from '../../services/poems.service';
import { themeClasses } from '../../theme-utils';
import type { ThemeId } from '../../services/settings.service';

@Component({
  selector: 'app-poem-card-vertical',
  imports: [],
  template: `
    <article class="border rounded-lg p-8 md:p-12 shadow-sm transition-all duration-300 overflow-x-auto"
      [class]="styles().card + ' ' + styles().border">
      <div class="flex flex-row-reverse justify-center gap-6 min-h-[400px]" style="writing-mode: vertical-rl">
        <div class="flex flex-col items-center gap-4">
          <span class="text-xs tracking-widest" [class]="styles().muted">{{ poem().cipai }}</span>
          <h2 class="text-2xl font-semibold tracking-wider"
            [class]="styles().title"
            style="font-family: 'Ma Shan Zheng', 'KaiTi', 'STKaiti', cursive">
            {{ poem().title }}
          </h2>
          <span class="text-xs" [class]="styles().muted">{{ poem().author }}</span>
          @if (poem().date) {
            <span class="text-xs" [class]="styles().muted">{{ poem().date }}</span>
          }
        </div>

        <div class="w-px h-full opacity-30"
          [class]="styles().accent.replace('text-', 'bg-')"></div>

        <div class="flex flex-row-reverse gap-4">
          @for (line of allLines(); track $index) {
            <p class="text-lg leading-relaxed tracking-widest"
              [class]="styles().text"
              style="font-family: 'Noto Serif SC', 'Songti SC', 'STSong', serif">
              {{ line }}
            </p>
          }
        </div>
      </div>

      <div class="mt-8 flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-30" [class]="styles().muted">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      </div>
    </article>
  `,
})
export class PoemCardVerticalComponent {
  poem = input.required<Poem>();
  theme = input.required<ThemeId>();

  styles = computed(() => themeClasses[this.theme()] ?? themeClasses.classic);

  allLines = computed(() => this.poem().paragraphs.flat());
}
