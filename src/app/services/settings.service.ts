import { Injectable, signal, computed } from '@angular/core';

export type ThemeId = 'classic' | 'inkwash' | 'vermilion' | 'jade' | 'night';
export type FontId = 'serif' | 'kai' | 'xiaowei';

export interface ThemeInfo {
  id: ThemeId;
  name: string;
  bg: string;
  text: string;
  accent: string;
}

export interface FontInfo {
  id: FontId;
  name: string;
  family: string;
}

export const THEMES: ThemeInfo[] = [
  { id: 'classic', name: '古籍纸', bg: '#F8F5F0', text: '#1A1A1A', accent: '#C53D43' },
  { id: 'inkwash', name: '水墨', bg: '#F5F5F5', text: '#2D2D2D', accent: '#5C7C8A' },
  { id: 'vermilion', name: '朱砂', bg: '#FEF9F5', text: '#3D2B1F', accent: '#B8352E' },
  { id: 'jade', name: '青玉', bg: '#F4F8F6', text: '#2A3B35', accent: '#5B8C6F' },
  { id: 'night', name: '夜读', bg: '#1C1C1E', text: '#F5F5F7', accent: '#D4AF37' },
];

export const FONTS: FontInfo[] = [
  { id: 'serif', name: '宋体', family: "'Noto Serif SC', 'Songti SC', 'STSong', serif" },
  { id: 'kai', name: '楷书', family: "'Ma Shan Zheng', 'KaiTi', 'STKaiti', cursive" },
  { id: 'xiaowei', name: '小篆', family: "'ZCOOL XiaoWei', serif" },
];

@Injectable({ providedIn: 'root' })
export class SettingsService {
  readonly currentTheme = signal<ThemeId>('classic');
  readonly currentFont = signal<FontId>('serif');

  readonly fontFamily = computed(() => {
    const font = FONTS.find((f) => f.id === this.currentFont());
    return font?.family ?? FONTS[0].family;
  });

  setTheme(theme: ThemeId): void {
    this.currentTheme.set(theme);
  }

  setFont(font: FontId): void {
    this.currentFont.set(font);
  }
}
