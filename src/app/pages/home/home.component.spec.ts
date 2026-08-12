import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HomeComponent } from './home.component';
import { PoemsService, type Poem } from '../../services/poems.service';

function makePoem(
  id: string,
  title: string,
  author: string,
  dynasty: string,
  theme: string[],
): Poem {
  return {
    id,
    cipai: '蝶恋花',
    title,
    author,
    dynasty,
    theme,
    paragraphs: [['一句']],
  };
}

class MockPoemsService {
  private _poems = signal<Poem[]>([
    makePoem('1', '第一首', '毛泽东', '现代', ['革命']),
    makePoem('2', '第二首', '苏轼', '宋代', ['抒情']),
  ]);

  readonly poems = this._poems.asReadonly();

  getAuthors(): string[] {
    return ['毛泽东', '苏轼'];
  }

  getCipais(): string[] {
    return ['蝶恋花'];
  }

  getDynasties(): string[] {
    return ['现代', '宋代'];
  }

  getThemes(): string[] {
    return ['革命', '抒情'];
  }

  getPoemById(id: string): Poem | undefined {
    return this._poems().find((p) => p.id === id);
  }
}

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideRouter([]),
        { provide: PoemsService, useClass: MockPoemsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows the cover first, then enters the library once', () => {
    expect(fixture.nativeElement.querySelector('app-cover-page')).toBeTruthy();

    component.enterLibrary();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-cover-page')).toBeNull();
  });

  it('renders the filtered poem count', () => {
    component.enterLibrary();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('共 2 首诗词');

    component.selectedAuthor.set('毛泽东');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('共 1 首诗词');
  });

  it('labels the settings toggle and exposes its expanded state', () => {
    component.enterLibrary();
    fixture.detectChanges();

    const root = fixture.nativeElement as HTMLElement;
    const settingsButton = Array.from(
      root.querySelectorAll<HTMLButtonElement>('button'),
    ).find((button) => button.getAttribute('aria-controls') === 'settings-panel');

    expect(settingsButton).toBeTruthy();
    expect(settingsButton?.getAttribute('aria-label')).toBe('打开设置');
    expect(settingsButton?.getAttribute('aria-expanded')).toBe('false');
  });
});
