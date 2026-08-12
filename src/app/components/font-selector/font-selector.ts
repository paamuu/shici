import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FONTS, type FontId } from '../../services/settings.service';

@Component({
  selector: 'app-font-selector',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-4" role="radiogroup" aria-label="字体风格">
      <div class="flex items-center gap-2 text-sm text-gray-500">
        <!-- Type icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="4 7 4 4 20 4 20 7"/>
          <line x1="9" x2="15" y1="20" y2="20"/>
          <line x1="12" x2="12" y1="4" y2="20"/>
        </svg>
        <span>字体风格</span>
      </div>
      <div class="flex flex-wrap gap-3">
        @for (f of fonts; track f.id) {
          <button
            type="button"
            role="radio"
            [attr.aria-checked]="currentFont() === f.id"
            (click)="onFontChange.emit(f.id)"
            class="flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all duration-200 bg-white"
            [class.border-gray-400]="currentFont() === f.id"
            [class.shadow-md]="currentFont() === f.id"
            [class.border-gray-100]="currentFont() !== f.id"
            [class.hover:border-gray-200]="currentFont() !== f.id"
            [class.hover:shadow-sm]="currentFont() !== f.id"
          >
            <span class="text-3xl text-gray-800" [style.fontFamily]="f.family">{{ f.sample }}</span>
            <span class="text-xs text-gray-500">{{ f.name }}</span>
          </button>
        }
      </div>
    </div>
  `,
})
export class FontSelectorComponent {
  currentFont = input.required<FontId>();
  onFontChange = output<FontId>();

  readonly fonts = FONTS.map((f) => ({
    ...f,
    sample: f.id === 'serif' ? '诗' : f.id === 'kai' ? '词' : '赋',
  }));
}
