import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface PoemAnnotation {
  text: string;
  note: string;
}

export interface Poem {
  id: string;
  cipai: string;
  title: string;
  author: string;
  dynasty: string;
  date?: string;
  preface?: string;
  theme?: string[];
  paragraphs: string[][];
  annotations?: PoemAnnotation[];
  translation?: string;
  appreciation?: string;
}

interface Manifest {
  files: string[];
}

const DATA_BASE = '/data/poems/';

@Injectable({ providedIn: 'root' })
export class PoemsService {
  private http = inject(HttpClient);

  private _poems = signal<Poem[]>([]);

  readonly poems = this._poems.asReadonly();

  private loaded = false;

  /** Call once at app init — loads manifest + all poem files into memory. */
  async loadPoems(): Promise<void> {
    if (this.loaded) return;

    const manifest = await firstValueFrom(this.http.get<Manifest>(`${DATA_BASE}manifest.json`));

    const poems = await Promise.all(
      manifest.files.map((file) =>
        firstValueFrom(this.http.get<Poem>(`${DATA_BASE}${file}`))
      )
    );

    this._poems.set(poems);
    this.loaded = true;
  }

  getAuthors(): string[] {
    return [...new Set(this._poems().map((p) => p.author))];
  }

  getCipais(): string[] {
    return [...new Set(this._poems().map((p) => p.cipai))];
  }

  getDynasties(): string[] {
    return [...new Set(this._poems().map((p) => p.dynasty))];
  }

  getThemes(): string[] {
    return [...new Set(this._poems().flatMap((p) => p.theme ?? []))];
  }

  getPoemById(id: string): Poem | undefined {
    return this._poems().find((p) => p.id === id);
  }
}

