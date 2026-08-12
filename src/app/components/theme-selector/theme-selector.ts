import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { THEMES, type ThemeId } from '../../services/settings.service';

@Component({
  selector: 'app-theme-selector',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-4" role="radiogroup" aria-label="配色方案">
      <div class="flex items-center gap-2 text-sm text-gray-500">
        <!-- Palette icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="13.5" cy="6.5" r="2"/>
          <circle cx="17.5" cy="10.5" r="2"/>
          <circle cx="8.5" cy="7.5" r="2"/>
          <circle cx="6.5" cy="12.5" r="2"/>
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
        </svg>
        <span>配色方案</span>
      </div>
      <div class="flex flex-wrap gap-3">
        @for (t of themes; track t.id) {
          <button
            type="button"
            role="radio"
            [attr.aria-checked]="currentTheme() === t.id"
            (click)="onThemeChange.emit(t.id)"
            class="group relative flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200"
            [class.border-gray-400]="currentTheme() === t.id"
            [class.shadow-md]="currentTheme() === t.id"
            [class.scale-105]="currentTheme() === t.id"
            [class.border-transparent]="currentTheme() !== t.id"
            [class.hover:border-gray-200]="currentTheme() !== t.id"
            [class.hover:shadow-sm]="currentTheme() !== t.id"
            [style.backgroundColor]="t.bg"
          >
            <div class="flex gap-1">
              <div class="w-4 h-4 rounded-full" [style.backgroundColor]="t.text"></div>
              <div class="w-4 h-4 rounded-full" [style.backgroundColor]="t.accent"></div>
            </div>
            <span class="text-xs font-medium" [style.color]="t.text">{{ t.name }}</span>
            @if (currentTheme() === t.id) {
              <div class="absolute -top-1 -right-1 w-3 h-3 rounded-full" [style.backgroundColor]="t.accent"></div>
            }
          </button>
        }
      </div>
    </div>
  `,
})
export class ThemeSelectorComponent {
  currentTheme = input.required<ThemeId>();
  onThemeChange = output<ThemeId>();

  readonly themes = THEMES;
}
