import { Component, input, computed } from '@angular/core';
import type { Poem } from '../../services/poems.service';
import { themeClasses } from '../../theme-utils';
import type { ThemeId } from '../../services/settings.service';

@Component({
  selector: 'app-poem-card',
  imports: [],
  template: `
    <article class="border rounded-lg px-8 py-10 md:px-12 md:py-14 shadow-sm transition-all duration-300"
      [class]="styles().card + ' ' + styles().border">
      <header class="text-center mb-6">
        <span class="text-sm tracking-[0.5em] font-normal" [class]="styles().muted">
          {{ poem().cipai }}
        </span>
      </header>

      <h2 class="text-2xl md:text-3xl font-semibold text-center mb-4 tracking-wider"
        [class]="styles().title"
        style="font-family: 'Ma Shan Zheng', 'KaiTi', 'STKaiti', cursive">
        {{ poem().title }}
      </h2>

      <div class="text-sm text-center mb-8 flex flex-col gap-1 items-center" [class]="styles().muted">
        <div class="flex items-center gap-2">
          <!-- User icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span>{{ poem().author }}</span>
        </div>
        @if (poem().date) {
          <div class="flex items-center gap-2">
            <!-- Calendar icon -->
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 2v4"/><path d="M16 2v4"/>
              <rect width="18" height="18" x="3" y="4" rx="2"/>
              <path d="M3 10h18"/>
            </svg>
            <span class="tracking-wider">{{ poem().date }}</span>
          </div>
        }
      </div>

      @if (poem().preface) {
        <p class="text-sm text-center mb-8 italic max-w-md mx-auto leading-relaxed" [class]="styles().muted">
          {{ poem().preface }}
        </p>
      }

      <div class="w-16 h-px mx-auto mb-8 opacity-50"
        [class]="styles().accent.replace('text-', 'bg-')"></div>

      <div class="flex flex-col gap-8">
        @for (paragraph of poem().paragraphs; track $index) {
          <div class="flex flex-col gap-2">
            @for (line of paragraph; track $index) {
              <p class="text-lg md:text-xl leading-loose tracking-widest text-left"
                [class]="styles().text"
                style="font-family: 'Noto Serif SC', 'Songti SC', 'STSong', serif">
                {{ line }}
              </p>
            }
          </div>
        }
      </div>

      <div class="mt-10 flex justify-center">
        <!-- BookOpen icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-40" [class]="styles().muted">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      </div>
    </article>
  `,
})
export class PoemCardComponent {
  poem = input.required<Poem>();
  theme = input.required<ThemeId>();

  styles = computed(() => themeClasses[this.theme()] ?? themeClasses.classic);
}
