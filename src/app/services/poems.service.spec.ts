import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PoemsService, type Poem } from './poems.service';

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

describe('PoemsService', () => {
  let service: PoemsService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PoemsService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('loads every poem listed in the manifest', async () => {
    const load = service.loadPoems();

    const manifestReq = http.expectOne('/data/poems/manifest.json');
    manifestReq.flush({ files: ['poem-1.json', 'poem-2.json'] });
    await Promise.resolve();

    const firstReq = http.expectOne('/data/poems/poem-1.json');
    firstReq.flush(makePoem('1', '第一首'));
    const secondReq = http.expectOne('/data/poems/poem-2.json');
    secondReq.flush(makePoem('2', '第二首'));

    await load;

    expect(service.poems().map((p) => p.id)).toEqual(['1', '2']);
  });

  it('keeps loading when an individual poem file fails', async () => {
    const load = service.loadPoems();

    const manifestReq = http.expectOne('/data/poems/manifest.json');
    manifestReq.flush({ files: ['poem-1.json', 'poem-2.json'] });
    await Promise.resolve();

    const firstReq = http.expectOne('/data/poems/poem-1.json');
    firstReq.flush(makePoem('1', '第一首'));
    const secondReq = http.expectOne('/data/poems/poem-2.json');
    secondReq.error(new ProgressEvent('error'), {
      status: 404,
      statusText: 'Not Found',
    });

    await load;

    expect(service.poems().map((p) => p.id)).toEqual(['1']);
  });
});
