import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { PoemsService, type Poem } from '../../services/poems.service';
import { SettingsService } from '../../services/settings.service';
import { themeClassesExtended } from '../../theme-utils';
import { ShareCardComponent } from '../../components/share-card/share-card';

type TabType = 'annotations' | 'translation' | 'appreciation';

@Component({
  selector: 'app-detail',
  imports: [ShareCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (poem(); as poem) {
      <div class="min-h-screen transition-colors duration-500"
        [class]="styles().bg"
        [style.fontFamily]="settings.fontFamily()">
        <!-- Header -->
        <header class="sticky top-0 z-10 backdrop-blur-md border-b"
          [class]="theme() === 'night' ? 'bg-[#1C1C1E]/80' : 'bg-white/30'"
          [class]="styles().border">
          <div class="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
            <button
              type="button"
              aria-label="返回首页"
              (click)="goBack()"
              class="flex items-center gap-2 hover:opacity-70 transition-opacity"
              [class]="styles().muted">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>
              </svg>
              <span class="text-sm">返回</span>
            </button>

            <button
              type="button"
              #shareButton
              aria-label="分享这首诗"
              (click)="openShareCard(shareButton)"
              class="p-2 rounded-lg hover:opacity-70 transition-opacity"
              [class]="styles().muted">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </button>
          </div>
        </header>

        <main class="max-w-2xl mx-auto px-4 py-8 md:py-12">
          <!-- Poem Card -->
          <article class="border rounded-2xl px-6 py-10 md:px-10 md:py-14 shadow-sm mb-8"
            [class]="styles().card + ' ' + styles().border">
            <header class="text-center mb-8">
              <span class="text-sm tracking-[0.5em]" [class]="styles().muted">{{ poem.cipai }}</span>
            </header>

            <h1 class="text-3xl md:text-4xl font-bold text-center mb-4 tracking-wider"
              [class]="styles().title"
              style="font-family: 'Ma Shan Zheng', cursive">
              {{ poem.title }}
            </h1>

            <div class="text-sm text-center mb-8 flex flex-col gap-1 items-center" [class]="styles().muted">
              <span>{{ poem.dynasty }} · {{ poem.author }}</span>
              @if (poem.date) {
                <span class="tracking-wider">{{ poem.date }}</span>
              }
            </div>

            @if (poem.preface) {
              <p class="text-sm text-center mb-8 italic max-w-md mx-auto leading-relaxed" [class]="styles().muted">
                {{ poem.preface }}
              </p>
            }

            <div class="w-20 h-px mx-auto mb-10 opacity-50"
              [class]="styles().accent.replace('text-', 'bg-')"></div>

            <div class="flex flex-col gap-10">
              @for (paragraph of poem.paragraphs; track $index) {
                <div class="flex flex-col gap-3">
                  @for (line of paragraph; track $index) {
                    <p class="text-xl md:text-2xl leading-loose tracking-widest text-center"
                      [class]="styles().text">
                      {{ line }}
                    </p>
                  }
                </div>
              }
            </div>
          </article>

          <!-- Tabs -->
          <div class="border rounded-2xl overflow-hidden shadow-sm"
            [class]="styles().card + ' ' + styles().border">
            <div class="flex border-b" role="tablist" [class]="styles().border">
              @for (tab of tabs; track tab.id) {
                <button
                  type="button"
                  role="tab"
                  [id]="'tab-' + tab.id"
                  [attr.aria-selected]="activeTab() === tab.id"
                  [attr.aria-controls]="'tab-panel-' + tab.id"
                  (click)="activeTab.set(tab.id)"
                  class="flex-1 flex items-center justify-center gap-2 py-4 text-sm transition-all"
                  [class]="activeTab() === tab.id ? styles().tabActive : styles().tab">
                  <!-- tab icon -->
                  @if (tab.id === 'annotations') {
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  } @else if (tab.id === 'translation') {
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                  } @else if (tab.id === 'appreciation') {
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                  }
                  <span>{{ tab.label }}</span>
                </button>
              }
            </div>

            <div
              class="p-6 md:p-8"
              role="tabpanel"
              [id]="'tab-panel-' + activeTab()"
              [attr.aria-labelledby]="'tab-' + activeTab()">
              @if (activeTab() === 'annotations') {
                <div class="flex flex-col gap-4">
                  @if (poem.annotations && poem.annotations.length > 0) {
                    @for (ann of poem.annotations; track $index) {
                      <div class="flex gap-3">
                        <span class="font-medium shrink-0" [class]="styles().accent">{{ ann.text }}</span>
                        <span class="text-sm leading-relaxed" [class]="styles().text">{{ ann.note }}</span>
                      </div>
                    }
                  } @else {
                    <p class="text-center py-8" [class]="styles().muted">暂无注释</p>
                  }
                </div>
              }

              @if (activeTab() === 'translation') {
                <div class="leading-loose text-justify" [class]="styles().text">
                  @if (poem.translation) {
                    {{ poem.translation }}
                  } @else {
                    <p class="text-center py-8" [class]="styles().muted">暂无译文</p>
                  }
                </div>
              }

              @if (activeTab() === 'appreciation') {
                <div class="leading-loose text-justify" [class]="styles().text">
                  @if (poem.appreciation) {
                    {{ poem.appreciation }}
                  } @else {
                    <p class="text-center py-8" [class]="styles().muted">暂无赏析</p>
                  }
                </div>
              }
            </div>
          </div>

          <!-- Navigation -->
          <div class="flex justify-between items-center mt-8 gap-4">
            @if (prevPoem(); as prev) {
              <button
                (click)="navigateToPoem(prev.id)"
                class="border rounded-xl px-4 py-3 flex items-center gap-2 hover:opacity-80 transition-opacity flex-1 max-w-[45%]"
                [class]="styles().card + ' ' + styles().border">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" [class]="styles().muted">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
                <div class="text-left truncate">
                  <p class="text-xs" [class]="styles().muted">上一首</p>
                  <p class="text-sm truncate" [class]="styles().title">{{ prev.title }}</p>
                </div>
              </button>
            } @else {
              <div class="flex-1"></div>
            }

            @if (nextPoem(); as next) {
              <button
                (click)="navigateToPoem(next.id)"
                class="border rounded-xl px-4 py-3 flex items-center gap-2 hover:opacity-80 transition-opacity flex-1 max-w-[45%]"
                [class]="styles().card + ' ' + styles().border">
                <div class="text-right truncate flex-1">
                  <p class="text-xs" [class]="styles().muted">下一首</p>
                  <p class="text-sm truncate" [class]="styles().title">{{ next.title }}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" [class]="styles().muted">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            } @else {
              <div class="flex-1"></div>
            }
          </div>
        </main>

        <!-- Share Card Modal -->
        @if (showShareCard()) {
          <div
            #shareDialog
            class="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="分享诗词卡片"
            tabindex="-1"
            (click)="closeShareCard()"
            (keydown.escape)="closeShareCard()"
            (keydown.tab)="trapFocus($event)"
          >
            <div
              class="max-w-md w-full max-h-[90vh] overflow-auto"
              (click)="$event.stopPropagation()">
              <div class="flex justify-end mb-3">
                <button
                  type="button"
                  class="p-2 rounded-full bg-black/30 text-white hover:bg-black/40 transition-colors"
                  aria-label="关闭分享卡片"
                  (click)="closeShareCard()"
                >
                  <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
                  </svg>
                </button>
              </div>
              <app-share-card [poem]="poem" [theme]="theme()" />
              <p class="text-center text-white/60 text-sm mt-4">长按保存图片分享</p>
            </div>
          </div>
        }
      </div>
    } @else {
      <div class="min-h-screen flex items-center justify-center"
        [class]="styles().bg">
        <div class="text-center">
          <p [class]="styles().muted">诗词未找到</p>
          <button
            (click)="goBack()"
            class="mt-4 underline"
            [class]="styles().accent">
            返回首页
          </button>
        </div>
      </div>
    }
  `,
})
export class DetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private poemsService = inject(PoemsService);
  private destroyRef = inject(DestroyRef);
  settings = inject(SettingsService);

  theme = this.settings.currentTheme.asReadonly();

  readonly shareDialog = viewChild<ElementRef<HTMLDivElement>>('shareDialog');

  activeTab = signal<TabType>('annotations');
  showShareCard = signal(false);

  private shareTrigger: HTMLButtonElement | null = null;

  tabs: { id: TabType; label: string }[] = [
    { id: 'annotations', label: '注释' },
    { id: 'translation', label: '译文' },
    { id: 'appreciation', label: '赏析' },
  ];

  poem = signal<Poem | undefined>(undefined);

  currentIndex = signal(-1);
  prevPoem = computed(() => {
    const idx = this.currentIndex();
    return idx > 0 ? this.poemsService.poems()[idx - 1] : null;
  });
  nextPoem = computed(() => {
    const idx = this.currentIndex();
    return idx < this.poemsService.poems().length - 1 ? this.poemsService.poems()[idx + 1] : null;
  });

  styles = computed(() => themeClassesExtended[this.theme()] ?? themeClassesExtended.classic);

  constructor() {
    this.updatePoem(this.route.snapshot.paramMap.get('id') || '');
    this.route.paramMap
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => this.updatePoem(params.get('id') || ''));
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  navigateToPoem(id: string): void {
    this.router.navigate(['/poem', id]);
  }

  private updatePoem(id: string): void {
    this.poem.set(this.poemsService.getPoemById(id));
    this.currentIndex.set(this.poemsService.poems().findIndex((p) => p.id === id));
    this.activeTab.set('annotations');
    this.closeShareCard();
  }

  openShareCard(trigger: HTMLButtonElement): void {
    this.shareTrigger = trigger;
    this.lockBodyScroll();
    this.showShareCard.set(true);
    setTimeout(() => this.shareDialog()?.nativeElement.focus());
  }

  closeShareCard(): void {
    this.showShareCard.set(false);
    this.unlockBodyScroll();
    if (this.shareTrigger) {
      this.shareTrigger.focus();
      this.shareTrigger = null;
    }
  }

  trapFocus(event: Event): void {
    const dialog = this.shareDialog()?.nativeElement;
    if (!dialog) return;

    const keyboardEvent = event as KeyboardEvent;
    const focusable = Array.from(
      dialog.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (keyboardEvent.shiftKey && document.activeElement === first) {
      keyboardEvent.preventDefault();
      last.focus();
    } else if (!keyboardEvent.shiftKey && document.activeElement === last) {
      keyboardEvent.preventDefault();
      first.focus();
    }
  }

  private lockBodyScroll(): void {
    if (typeof document !== 'undefined') {
      document.body.classList.add('overflow-hidden');
    }
  }

  private unlockBodyScroll(): void {
    if (typeof document !== 'undefined') {
      document.body.classList.remove('overflow-hidden');
    }
  }
}
