import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, type Routes } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { DetailComponent } from './detail.component';
import { PoemsService, type Poem } from '../../services/poems.service';

function makePoem(id: string, title: string): Poem {
  return {
    id,
    cipai: '蝶恋花',
    title,
    author: '毛泽东',
    dynasty: '现代',
    paragraphs: [['一句']],
  };
}

class MockPoemsService {
  private _poems = signal<Poem[]>([makePoem('1', '第一首'), makePoem('2', '第二首')]);

  readonly poems = this._poems.asReadonly();

  getPoemById(id: string): Poem | undefined {
    return this._poems().find((p) => p.id === id);
  }
}

const routes: Routes = [{ path: 'poem/:id', component: DetailComponent }];

describe('DetailComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailComponent],
      providers: [
        provideRouter(routes),
        { provide: PoemsService, useClass: MockPoemsService },
      ],
    }).compileComponents();
  });

  it('updates the displayed poem when the route param changes', async () => {
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl('/poem/1', DetailComponent);

    expect(component.poem()?.title).toBe('第一首');

    await harness.navigateByUrl('/poem/2', DetailComponent);

    expect(component.poem()?.title).toBe('第二首');
  });

  it('opens an accessible share dialog and closes it', async () => {
    const harness = await RouterTestingHarness.create();
    const component = await harness.navigateByUrl('/poem/1', DetailComponent);

    const shareButton = harness.routeNativeElement?.querySelector<HTMLButtonElement>(
      'button[aria-label="分享这首诗"]',
    );
    expect(shareButton).toBeTruthy();

    component.openShareCard(shareButton!);
    harness.fixture.detectChanges();

    const dialog = harness.routeNativeElement?.querySelector('[role="dialog"]');
    expect(dialog).toBeTruthy();
    expect(dialog?.getAttribute('aria-modal')).toBe('true');

    component.closeShareCard();
    harness.fixture.detectChanges();

    expect(harness.routeNativeElement?.querySelector('[role="dialog"]')).toBeNull();
  });
});
