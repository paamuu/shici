import { Component, input, output, computed } from '@angular/core';
import { coverClasses } from '../../theme-utils';
import type { ThemeId } from '../../services/settings.service';

@Component({
  selector: 'app-cover-page',
  imports: [],
  template: `
    <div class="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
      [class]="styles().bg">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-20 right-10 w-64 h-64 rounded-full opacity-5 blur-3xl"
          [class]="styles().accent"></div>
        <div class="absolute bottom-20 left-10 w-96 h-96 rounded-full opacity-5 blur-3xl"
          [class]="styles().accent"></div>
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-px h-32 opacity-20"
          [class]="styles().accent.replace('text-', 'bg-')"></div>
      </div>

      <div class="relative z-10 text-center max-w-lg">
        <div class="flex items-center justify-center gap-4 mb-8">
          <div class="w-12 h-px opacity-40" [class]="styles().accent.replace('text-', 'bg-')"></div>
          <!-- Feather icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-60" [class]="styles().accent">
            <path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z"/>
            <path d="M16 8 2 22"/>
            <path d="M17.5 15H9"/>
          </svg>
          <div class="w-12 h-px opacity-40" [class]="styles().accent.replace('text-', 'bg-')"></div>
        </div>

        <p class="text-sm tracking-[0.5em] mb-6" [class]="styles().subtitle">中华诗词典藏</p>

        <h1 class="text-5xl md:text-7xl font-bold mb-6 tracking-wider"
          [class]="styles().title"
          style="font-family: 'Ma Shan Zheng', cursive">
          诗词集
        </h1>

        <p class="text-lg md:text-xl mb-4 tracking-wide leading-relaxed" [class]="styles().subtitle">
          千古词章 · 翰墨流芳
        </p>

        <p class="text-sm max-w-sm mx-auto mb-12 leading-relaxed opacity-80" [class]="styles().subtitle">
          精选历代名家诗词，配以详尽注释与赏析，于方寸之间，品味千年文脉之美
        </p>

        <div class="flex items-center justify-center gap-8 mb-12">
          <div class="flex flex-col items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-50" [class]="styles().subtitle">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            <span class="text-xs" [class]="styles().subtitle">诗词</span>
          </div>
          <div class="w-px h-8 opacity-20" [class]="styles().subtitle.replace('text-', 'bg-')"></div>
          <div class="flex flex-col items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-50" [class]="styles().subtitle">
              <path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z"/>
              <path d="M16 8 2 22"/><path d="M17.5 15H9"/>
            </svg>
            <span class="text-xs" [class]="styles().subtitle">注释</span>
          </div>
          <div class="w-px h-8 opacity-20" [class]="styles().subtitle.replace('text-', 'bg-')"></div>
          <div class="flex flex-col items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-50" [class]="styles().subtitle">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
            </svg>
            <span class="text-xs" [class]="styles().subtitle">赏析</span>
          </div>
        </div>

        <button
          (click)="onEnter.emit()"
          class="px-10 py-4 rounded-full text-sm tracking-widest transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          [class]="styles().button + ' ' + styles().buttonText"
        >
          开卷有益
        </button>

        <div class="mt-16 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-40 mx-auto" [class]="styles().subtitle">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </div>

      <div class="absolute bottom-8 text-xs tracking-wider opacity-40" [class]="styles().subtitle">
        诗词之美 · 在于意境
      </div>
    </div>
  `,
})
export class CoverPageComponent {
  theme = input.required<ThemeId>();
  onEnter = output<void>();

  styles = computed(() => coverClasses[this.theme()] ?? coverClasses.classic);
}
