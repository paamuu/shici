import type { ThemeId } from './services/settings.service';

export interface ThemeStyleSet {
  bg: string;
  card: string;
  title: string;
  text: string;
  muted: string;
  accent: string;
  border: string;
}

export const themeClasses: Record<ThemeId, ThemeStyleSet> = {
  classic: {
    bg: 'bg-[#F8F5F0]',
    card: 'bg-[#FFFCF7]',
    title: 'text-[#1A1A1A]',
    text: 'text-[#2D2D2D]',
    muted: 'text-[#6B6B6B]',
    accent: 'text-[#C53D43]',
    border: 'border-[#E8E4DF]',
  },
  inkwash: {
    bg: 'bg-[#F5F5F5]',
    card: 'bg-white',
    title: 'text-[#2D2D2D]',
    text: 'text-[#3D3D3D]',
    muted: 'text-[#8A8A8A]',
    accent: 'text-[#5C7C8A]',
    border: 'border-[#E0E0E0]',
  },
  vermilion: {
    bg: 'bg-[#FEF9F5]',
    card: 'bg-[#FFFAF6]',
    title: 'text-[#3D2B1F]',
    text: 'text-[#4A3728]',
    muted: 'text-[#8B7355]',
    accent: 'text-[#B8352E]',
    border: 'border-[#E8DFD5]',
  },
  jade: {
    bg: 'bg-[#F4F8F6]',
    card: 'bg-[#FAFCFB]',
    title: 'text-[#2A3B35]',
    text: 'text-[#3A4B45]',
    muted: 'text-[#7A9B8B]',
    accent: 'text-[#5B8C6F]',
    border: 'border-[#D8E5DF]',
  },
  night: {
    bg: 'bg-[#1C1C1E]',
    card: 'bg-[#2C2C2E]',
    title: 'text-[#F5F5F7]',
    text: 'text-[#E5E5E7]',
    muted: 'text-[#98989D]',
    accent: 'text-[#D4AF37]',
    border: 'border-[#3C3C3E]',
  },
};

export interface ThemeStyleSetExtended extends ThemeStyleSet {
  tab: string;
  tabActive: string;
}

export const themeClassesExtended: Record<ThemeId, ThemeStyleSetExtended> = {
  classic: {
    ...themeClasses.classic,
    tab: 'bg-[#F8F5F0] text-[#6B6B6B]',
    tabActive: 'bg-[#C53D43] text-white',
  },
  inkwash: {
    ...themeClasses.inkwash,
    tab: 'bg-[#F5F5F5] text-[#8A8A8A]',
    tabActive: 'bg-[#5C7C8A] text-white',
  },
  vermilion: {
    ...themeClasses.vermilion,
    tab: 'bg-[#FEF9F5] text-[#8B7355]',
    tabActive: 'bg-[#B8352E] text-white',
  },
  jade: {
    ...themeClasses.jade,
    tab: 'bg-[#F4F8F6] text-[#7A9B8B]',
    tabActive: 'bg-[#5B8C6F] text-white',
  },
  night: {
    ...themeClasses.night,
    tab: 'bg-[#2C2C2E] text-[#98989D]',
    tabActive: 'bg-[#D4AF37] text-[#1C1C1E]',
  },
};

export interface FilterStyleSet {
  bg: string;
  card: string;
  text: string;
  muted: string;
  accent: string;
  border: string;
  active: string;
  activeText: string;
}

export const filterClasses: Record<ThemeId, FilterStyleSet> = {
  classic: {
    bg: 'bg-[#F8F5F0]',
    card: 'bg-white',
    text: 'text-[#1A1A1A]',
    muted: 'text-[#6B6B6B]',
    accent: 'text-[#C53D43]',
    border: 'border-[#E8E4DF]',
    active: 'bg-[#C53D43]',
    activeText: 'text-white',
  },
  inkwash: {
    bg: 'bg-[#F5F5F5]',
    card: 'bg-white',
    text: 'text-[#2D2D2D]',
    muted: 'text-[#8A8A8A]',
    accent: 'text-[#5C7C8A]',
    border: 'border-[#E0E0E0]',
    active: 'bg-[#5C7C8A]',
    activeText: 'text-white',
  },
  vermilion: {
    bg: 'bg-[#FEF9F5]',
    card: 'bg-white',
    text: 'text-[#3D2B1F]',
    muted: 'text-[#8B7355]',
    accent: 'text-[#B8352E]',
    border: 'border-[#E8DFD5]',
    active: 'bg-[#B8352E]',
    activeText: 'text-white',
  },
  jade: {
    bg: 'bg-[#F4F8F6]',
    card: 'bg-white',
    text: 'text-[#2A3B35]',
    muted: 'text-[#7A9B8B]',
    accent: 'text-[#5B8C6F]',
    border: 'border-[#D8E5DF]',
    active: 'bg-[#5B8C6F]',
    activeText: 'text-white',
  },
  night: {
    bg: 'bg-[#1C1C1E]',
    card: 'bg-[#2C2C2E]',
    text: 'text-[#F5F5F7]',
    muted: 'text-[#98989D]',
    accent: 'text-[#D4AF37]',
    border: 'border-[#3C3C3E]',
    active: 'bg-[#D4AF37]',
    activeText: 'text-[#1C1C1E]',
  },
};

export interface CoverStyleSet {
  bg: string;
  overlay: string;
  title: string;
  subtitle: string;
  accent: string;
  button: string;
  buttonText: string;
}

export const coverClasses: Record<ThemeId, CoverStyleSet> = {
  classic: {
    bg: 'bg-gradient-to-b from-[#F8F5F0] via-[#F5F0E8] to-[#EDE8E0]',
    overlay: 'bg-[#F8F5F0]/50',
    title: 'text-[#1A1A1A]',
    subtitle: 'text-[#6B6B6B]',
    accent: 'text-[#C53D43]',
    button: 'bg-[#1A1A1A] hover:bg-[#2A2A2A]',
    buttonText: 'text-[#F8F5F0]',
  },
  inkwash: {
    bg: 'bg-gradient-to-b from-[#FAFAFA] via-[#F5F5F5] to-[#E8E8E8]',
    overlay: 'bg-[#F5F5F5]/50',
    title: 'text-[#2D2D2D]',
    subtitle: 'text-[#8A8A8A]',
    accent: 'text-[#5C7C8A]',
    button: 'bg-[#2D2D2D] hover:bg-[#3D3D3D]',
    buttonText: 'text-white',
  },
  vermilion: {
    bg: 'bg-gradient-to-b from-[#FEF9F5] via-[#FCF4ED] to-[#F5EBE0]',
    overlay: 'bg-[#FEF9F5]/50',
    title: 'text-[#3D2B1F]',
    subtitle: 'text-[#8B7355]',
    accent: 'text-[#B8352E]',
    button: 'bg-[#B8352E] hover:bg-[#A02D28]',
    buttonText: 'text-white',
  },
  jade: {
    bg: 'bg-gradient-to-b from-[#F4F8F6] via-[#EDF5F1] to-[#E0EDE6]',
    overlay: 'bg-[#F4F8F6]/50',
    title: 'text-[#2A3B35]',
    subtitle: 'text-[#7A9B8B]',
    accent: 'text-[#5B8C6F]',
    button: 'bg-[#5B8C6F] hover:bg-[#4A7B5E]',
    buttonText: 'text-white',
  },
  night: {
    bg: 'bg-gradient-to-b from-[#1C1C1E] via-[#252527] to-[#1C1C1E]',
    overlay: 'bg-[#1C1C1E]/50',
    title: 'text-[#F5F5F7]',
    subtitle: 'text-[#98989D]',
    accent: 'text-[#D4AF37]',
    button: 'bg-[#D4AF37] hover:bg-[#C4A030]',
    buttonText: 'text-[#1C1C1E]',
  },
};

export interface ShareStyleSet {
  bg: string;
  card: string;
  title: string;
  text: string;
  muted: string;
  accent: string;
  accentBg: string;
}

export const shareClasses: Record<ThemeId, ShareStyleSet> = {
  classic: {
    bg: 'bg-gradient-to-br from-[#F8F5F0] via-[#FDF8F3] to-[#F5F0E8]',
    card: 'bg-[#FFFCF7]/90',
    title: 'text-[#1A1A1A]',
    text: 'text-[#2D2D2D]',
    muted: 'text-[#6B6B6B]',
    accent: 'text-[#C53D43]',
    accentBg: 'bg-[#C53D43]',
  },
  inkwash: {
    bg: 'bg-gradient-to-br from-[#F5F5F5] via-[#FAFAFA] to-[#E8E8E8]',
    card: 'bg-white/90',
    title: 'text-[#2D2D2D]',
    text: 'text-[#3D3D3D]',
    muted: 'text-[#8A8A8A]',
    accent: 'text-[#5C7C8A]',
    accentBg: 'bg-[#5C7C8A]',
  },
  vermilion: {
    bg: 'bg-gradient-to-br from-[#FEF9F5] via-[#FCF4ED] to-[#F5EBE0]',
    card: 'bg-[#FFFAF6]/90',
    title: 'text-[#3D2B1F]',
    text: 'text-[#4A3728]',
    muted: 'text-[#8B7355]',
    accent: 'text-[#B8352E]',
    accentBg: 'bg-[#B8352E]',
  },
  jade: {
    bg: 'bg-gradient-to-br from-[#F4F8F6] via-[#EDF5F1] to-[#E0EDE6]',
    card: 'bg-[#FAFCFB]/90',
    title: 'text-[#2A3B35]',
    text: 'text-[#3A4B45]',
    muted: 'text-[#7A9B8B]',
    accent: 'text-[#5B8C6F]',
    accentBg: 'bg-[#5B8C6F]',
  },
  night: {
    bg: 'bg-gradient-to-br from-[#1C1C1E] via-[#252527] to-[#1A1A1C]',
    card: 'bg-[#2C2C2E]/90',
    title: 'text-[#F5F5F7]',
    text: 'text-[#E5E5E7]',
    muted: 'text-[#98989D]',
    accent: 'text-[#D4AF37]',
    accentBg: 'bg-[#D4AF37]',
  },
};

export interface ListItemStyleSet {
  card: string;
  title: string;
  text: string;
  muted: string;
  accent: string;
  border: string;
  hover: string;
  tag: string;
}

export const listItemClasses: Record<ThemeId, ListItemStyleSet> = {
  classic: {
    card: 'bg-[#FFFCF7]',
    title: 'text-[#1A1A1A]',
    text: 'text-[#2D2D2D]',
    muted: 'text-[#6B6B6B]',
    accent: 'text-[#C53D43]',
    border: 'border-[#E8E4DF]',
    hover: 'hover:bg-[#FDF8F3]',
    tag: 'bg-[#C53D43]/10 text-[#C53D43]',
  },
  inkwash: {
    card: 'bg-white',
    title: 'text-[#2D2D2D]',
    text: 'text-[#3D3D3D]',
    muted: 'text-[#8A8A8A]',
    accent: 'text-[#5C7C8A]',
    border: 'border-[#E0E0E0]',
    hover: 'hover:bg-[#FAFAFA]',
    tag: 'bg-[#5C7C8A]/10 text-[#5C7C8A]',
  },
  vermilion: {
    card: 'bg-[#FFFAF6]',
    title: 'text-[#3D2B1F]',
    text: 'text-[#4A3728]',
    muted: 'text-[#8B7355]',
    accent: 'text-[#B8352E]',
    border: 'border-[#E8DFD5]',
    hover: 'hover:bg-[#FEF5EF]',
    tag: 'bg-[#B8352E]/10 text-[#B8352E]',
  },
  jade: {
    card: 'bg-[#FAFCFB]',
    title: 'text-[#2A3B35]',
    text: 'text-[#3A4B45]',
    muted: 'text-[#7A9B8B]',
    accent: 'text-[#5B8C6F]',
    border: 'border-[#D8E5DF]',
    hover: 'hover:bg-[#F5FAF7]',
    tag: 'bg-[#5B8C6F]/10 text-[#5B8C6F]',
  },
  night: {
    card: 'bg-[#2C2C2E]',
    title: 'text-[#F5F5F7]',
    text: 'text-[#E5E5E7]',
    muted: 'text-[#98989D]',
    accent: 'text-[#D4AF37]',
    border: 'border-[#3C3C3E]',
    hover: 'hover:bg-[#3C3C3E]',
    tag: 'bg-[#D4AF37]/10 text-[#D4AF37]',
  },
};
