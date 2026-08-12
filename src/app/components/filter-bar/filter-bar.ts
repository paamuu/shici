import { ChangeDetectionStrategy, Component, input, output, signal, computed } from '@angular/core';
import { filterClasses } from '../../theme-utils';
import type { ThemeId } from '../../services/settings.service';

type FilterCategory = 'author' | 'cipai' | 'dynasty' | 'theme' | null;

interface FilterCategoryConfig {
  id: 'author' | 'cipai' | 'dynasty' | 'theme';
  label: string;
  icon: string;
  items: string[];
  selected: string | null;
  onChange: (value: string | null) => void;
}

@Component({
  selector: 'app-filter-bar',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex flex-col gap-3">
      <div class="flex flex-wrap items-center gap-2">
        <!-- Filter icon -->
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" [class]="styles().muted">
          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
        </svg>

        @for (cat of categories(); track cat.id) {
          <div class="flex items-center gap-1.5">
            <button
              type="button"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm border transition-all"
              [attr.aria-expanded]="expandedCategory() === cat.id"
              [attr.aria-controls]="'filter-panel-' + cat.id"
              [attr.aria-pressed]="cat.selected !== null"
              [class]="(expandedCategory() === cat.id || cat.selected)
                ? styles().active + ' ' + styles().activeText + ' border-transparent'
                : styles().card + ' ' + styles().text + ' ' + styles().border + ' hover:opacity-80'"
              (click)="toggleCategory(cat.id)"
            >
              <!-- icon based on category -->
              @if (cat.icon === 'user') {
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              } @else if (cat.icon === 'music') {
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
              } @else if (cat.icon === 'building') {
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>
              } @else if (cat.icon === 'bookmark') {
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
              }
              <span>{{ cat.selected || cat.label }}</span>
            </button>
            @if (cat.selected) {
              <button
                type="button"
                class="p-1.5 rounded-full border transition-all"
                [attr.aria-label]="'清除' + cat.label + '筛选'"
                [class]="styles().active + ' ' + styles().activeText + ' border-transparent'"
                (click)="clearFilter(cat)"
              >
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              </button>
            }
          </div>
        }

        @if (hasActiveFilters()) {
          <button type="button" class="text-xs underline hover:opacity-70" [class]="styles().muted" (click)="clearAllFilters()">
            清除全部
          </button>
        }
      </div>

      @if (expandedCategory(); as catId) {
        <div class="border rounded-xl p-4" [id]="'filter-panel-' + catId" [class]="styles().card + ' ' + styles().border">
          <div class="flex flex-wrap gap-2">
            @for (item of getCategoryItems(catId); track item) {
              <button
                type="button"
                class="px-3 py-1.5 rounded-full text-sm border transition-all"
                [attr.aria-pressed]="isItemSelected(catId, item)"
                [class]="isItemSelected(catId, item)
                  ? styles().active + ' ' + styles().activeText + ' border-transparent'
                  : styles().bg + ' ' + styles().text + ' ' + styles().border + ' hover:opacity-80'"
                (click)="selectItem(catId, item)"
              >
                {{ item }}
              </button>
            }
          </div>
        </div>
      }
    </div>
  `,
})
export class FilterBarComponent {
  theme = input.required<ThemeId>();
  authors = input.required<string[]>();
  cipais = input.required<string[]>();
  dynasties = input.required<string[]>();
  themes = input.required<string[]>();
  selectedAuthor = input<string | null>(null);
  selectedCipai = input<string | null>(null);
  selectedDynasty = input<string | null>(null);
  selectedTheme = input<string | null>(null);
  onAuthorChange = output<string | null>();
  onCipaiChange = output<string | null>();
  onDynastyChange = output<string | null>();
  onThemeChange = output<string | null>();

  expandedCategory = signal<FilterCategory>(null);

  styles = computed(() => filterClasses[this.theme()] ?? filterClasses.classic);

  hasActiveFilters = computed(
    () => Boolean(this.selectedAuthor() || this.selectedCipai() || this.selectedDynasty() || this.selectedTheme())
  );

  categories = computed<FilterCategoryConfig[]>(() => [
    { id: 'author', label: '作者', icon: 'user', items: this.authors(), selected: this.selectedAuthor(), onChange: (v) => this.onAuthorChange.emit(v) },
    { id: 'cipai', label: '词牌', icon: 'music', items: this.cipais(), selected: this.selectedCipai(), onChange: (v) => this.onCipaiChange.emit(v) },
    { id: 'dynasty', label: '朝代', icon: 'building', items: this.dynasties(), selected: this.selectedDynasty(), onChange: (v) => this.onDynastyChange.emit(v) },
    { id: 'theme', label: '主题', icon: 'bookmark', items: this.themes(), selected: this.selectedTheme(), onChange: (v) => this.onThemeChange.emit(v) },
  ]);

  toggleCategory(id: FilterCategory): void {
    this.expandedCategory.set(this.expandedCategory() === id ? null : id);
  }

  clearFilter(cat: FilterCategoryConfig): void {
    cat.onChange(null);
  }

  clearAllFilters(): void {
    this.onAuthorChange.emit(null);
    this.onCipaiChange.emit(null);
    this.onDynastyChange.emit(null);
    this.onThemeChange.emit(null);
  }

  getCategoryItems(catId: FilterCategory): string[] {
    const cat = this.categories().find((c) => c.id === catId);
    return cat?.items ?? [];
  }

  isItemSelected(catId: FilterCategory, item: string): boolean {
    const cat = this.categories().find((c) => c.id === catId);
    return cat?.selected === item;
  }

  selectItem(catId: FilterCategory, item: string): void {
    const cat = this.categories().find((c) => c.id === catId);
    if (!cat) return;
    cat.onChange(cat.selected === item ? null : item);
    this.expandedCategory.set(null);
  }
}
