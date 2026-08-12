import { ChangeDetectionStrategy, Component, input, output, computed } from '@angular/core';
import type { Poem } from '../../services/poems.service';
import { listItemClasses } from '../../theme-utils';
import type { ThemeId } from '../../services/settings.service';

@Component({
  selector: 'app-poem-list-item',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      class="w-full border rounded-xl p-5 md:p-6 text-left transition-all duration-200 group"
      [class]="styles().card + ' ' + styles().border + ' ' + styles().hover"
      (click)="onClick.emit()"
    >
      <div class="flex items-start justify-between gap-4">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-xs tracking-wider" [class]="styles().accent">{{ poem().cipai }}</span>
            <span class="text-xs" [class]="styles().muted">·</span>
            <span class="text-xs" [class]="styles().muted">{{ poem().dynasty }}</span>
          </div>

          <h3 class="text-xl font-semibold mb-2 tracking-wide"
            [class]="styles().title"
            style="font-family: 'Ma Shan Zheng', cursive">
            {{ poem().title }}
          </h3>

          <div class="text-sm flex items-center gap-4 mb-3" [class]="styles().muted">
            <span class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
              {{ poem().author }}
            </span>
            @if (poem().date) {
              <span class="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>
                </svg>
                {{ poem().date }}
              </span>
            }
          </div>

          <p class="text-sm leading-relaxed mb-3 line-clamp-1" [class]="styles().text">
            {{ firstLine() }}
          </p>

          <div class="flex flex-wrap gap-2">
            @for (t of (poem().theme ?? []).slice(0, 3); track t) {
              <span class="text-xs px-2 py-1 rounded-full flex items-center gap-1" [class]="styles().tag">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z"/><circle cx="7.5" cy="7.5" r=".5" fill="currentColor"/>
                </svg>
                {{ t }}
              </span>
            }
          </div>
        </div>

        <!-- ChevronRight -->
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-1 transition-transform group-hover:translate-x-1" [class]="styles().muted">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </div>
    </button>
  `,
})
export class PoemListItemComponent {
  poem = input.required<Poem>();
  theme = input.required<ThemeId>();
  onClick = output<void>();

  styles = computed(() => listItemClasses[this.theme()] ?? listItemClasses.classic);

  firstLine = computed(() => this.poem().paragraphs[0]?.[0] || '');
}
