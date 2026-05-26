import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { PoemsService } from '../../services/poems.service';
import { SettingsService, type ThemeId, type FontId } from '../../services/settings.service';
import { themeClasses } from '../../theme-utils';
import { CoverPageComponent } from '../../components/cover-page/cover-page';
import { FilterBarComponent } from '../../components/filter-bar/filter-bar';
import { PoemListItemComponent } from '../../components/poem-list-item/poem-list-item';
import { ThemeSelectorComponent } from '../../components/theme-selector/theme-selector';
import { FontSelectorComponent } from '../../components/font-selector/font-selector';

@Component({
  selector: 'app-home',
  imports: [CoverPageComponent, FilterBarComponent, PoemListItemComponent, ThemeSelectorComponent, FontSelectorComponent],
  template: `
    @if (showCover()) {
      <app-cover-page
        [theme]="theme()"
        (onEnter)="showCover.set(false)"
      />
    } @else {
      <div class="min-h-screen transition-colors duration-500"
        [class]="styles().bg"
        [style.fontFamily]="settings.fontFamily()">
        <!-- Header -->
        <header class="sticky top-0 z-10 backdrop-blur-md border-b border-black/5"
          [class]="theme() === 'night' ? 'bg-[#1C1C1E]/80' : 'bg-white/30'">
          <div class="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" [class]="styles().title">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
              </svg>
              <h1 class="text-xl font-semibold" [class]="styles().title" style="font-family: 'Ma Shan Zheng', cursive">
                诗词集
              </h1>
            </div>

            <button
              (click)="showSettings.set(!showSettings())"
              class="p-2 rounded-lg transition-all"
              [class]="showSettings()
                ? (theme() === 'night' ? 'bg-white/20' : 'bg-white shadow-sm')
                : (theme() === 'night' ? 'hover:bg-white/10' : 'hover:bg-black/5')"
            >
              @if (showSettings()) {
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" [class]="styles().muted">
                  <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                </svg>
              } @else {
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" [class]="styles().muted">
                  <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              }
            </button>
          </div>
        </header>

        <!-- Settings Panel -->
        @if (showSettings()) {
          <div class="max-w-2xl mx-auto px-4 py-6 border-b border-black/5 backdrop-blur-sm"
            [class]="theme() === 'night' ? 'bg-[#2C2C2E]/50' : 'bg-white/50'">
            <div class="flex flex-col gap-6">
              <app-theme-selector
                [currentTheme]="theme()"
                (onThemeChange)="onThemeChange($event)"
              />
              <app-font-selector
                [currentFont]="font()"
                (onFontChange)="onFontChange($event)"
              />
            </div>
          </div>
        }

        <!-- Main Content -->
        <main class="max-w-2xl mx-auto px-4 py-6 md:py-8">
          <div class="mb-6">
            <app-filter-bar
              [theme]="theme()"
              [authors]="authors()"
              [cipais]="cipais()"
              [dynasties]="dynasties()"
              [themes]="themesList()"
              [selectedAuthor]="selectedAuthor()"
              [selectedCipai]="selectedCipai()"
              [selectedDynasty]="selectedDynasty()"
              [selectedTheme]="selectedTheme()"
              (onAuthorChange)="selectedAuthor.set($event)"
              (onCipaiChange)="selectedCipai.set($event)"
              (onDynastyChange)="selectedDynasty.set($event)"
              (onThemeChange)="selectedTheme.set($event)"
            />
          </div>

          <p class="text-sm mb-4" [class]="styles().muted">
            共 {{ filteredPoems().length }} 首诗词
          </p>

          <div class="flex flex-col gap-4">
            @if (filteredPoems().length > 0) {
              @for (poem of filteredPoems(); track poem.id) {
                <app-poem-list-item
                  [poem]="poem"
                  [theme]="theme()"
                  (onClick)="navigateToPoem(poem.id)"
                />
              }
            } @else {
              <div class="text-center py-12" [class]="styles().muted">
                没有找到符合条件的诗词
              </div>
            }
          </div>
        </main>

        <footer class="max-w-2xl mx-auto px-4 py-8 text-center text-sm" [class]="styles().muted">
          <p class="tracking-wider">诗词之美，在于意境</p>
        </footer>
      </div>
    }
  `,
})
export class HomeComponent implements OnInit {
  private router = inject(Router);
  private poemsService = inject(PoemsService);
  protected settings = inject(SettingsService);

  theme = this.settings.currentTheme.asReadonly();
  font = this.settings.currentFont.asReadonly();

  showCover = signal(true);
  showSettings = signal(false);

  selectedAuthor = signal<string | null>(null);
  selectedCipai = signal<string | null>(null);
  selectedDynasty = signal<string | null>(null);
  selectedTheme = signal<string | null>(null);

  authors = signal<string[]>([]);
  cipais = signal<string[]>([]);
  dynasties = signal<string[]>([]);
  themesList = signal<string[]>([]);

  styles = computed(() => themeClasses[this.theme()] ?? themeClasses.classic);

  filteredPoems = computed(() => {
    const author = this.selectedAuthor();
    const cipai = this.selectedCipai();
    const dynasty = this.selectedDynasty();
    const theme = this.selectedTheme();
    return this.poemsService.poems().filter((poem) => {
      if (author && poem.author !== author) return false;
      if (cipai && poem.cipai !== cipai) return false;
      if (dynasty && poem.dynasty !== dynasty) return false;
      if (theme && !(poem.theme ?? []).includes(theme)) return false;
      return true;
    });
  });

  ngOnInit(): void {
    this.authors.set(this.poemsService.getAuthors());
    this.cipais.set(this.poemsService.getCipais());
    this.dynasties.set(this.poemsService.getDynasties());
    this.themesList.set(this.poemsService.getThemes());
  }

  onThemeChange(theme: ThemeId): void {
    this.settings.setTheme(theme);
  }

  onFontChange(font: FontId): void {
    this.settings.setFont(font);
  }

  navigateToPoem(id: string): void {
    this.router.navigate(['/poem', id]);
  }
}
