import {
  ColorThemeMap,
  CoreColorKey,
  SpecialColorKey,
} from '@/style/color';

// ライトモード用の基本カラーパレット
const lightDefault: ColorThemeMap = {
  [CoreColorKey.Base]: {
    bg: { default: { backgroundColor: '#F5F7F8' } },
    text: { default: { color: '#1C1C1E' } },
    border: { default: { borderColor: '#E5E5EA' } },
  },
  [CoreColorKey.Primary]: {
    bg: {
      default: { backgroundColor: '#D2E69C' },
      active: { backgroundColor: '#BCCF82' },
    },
    text: {
      default: { color: '#3A4E00' },
      active: { color: '#FFFFFF' },
    },
    border: { default: { borderColor: '#B4D16F' } },
  },
  [CoreColorKey.Secondary]: {
    bg: {
      default: { backgroundColor: '#E5E5EA' },
      active: { backgroundColor: '#D1D1D6' },
    },
    text: { default: { color: '#3C3C43' } },
    border: { default: { borderColor: '#C7C7CC' } },
  },
  [CoreColorKey.Danger]: {
    bg: {
      default: { backgroundColor: '#FF3B30' },
      active: { backgroundColor: '#D93229' },
    },
    text: { default: { color: '#FFFFFF' } },
  },
  [CoreColorKey.Success]: {
    bg: {
      default: { backgroundColor: '#34C759' },
      active: { backgroundColor: '#2CA34A' },
    },
    text: { default: { color: '#FFFFFF' } },
  },
  [SpecialColorKey.Heart]: {
    text: { default: { color: '#FF2D55' } },
  },
};

// ダークモード用の基本カラーパレット
const darkDefault: ColorThemeMap = {
  [CoreColorKey.Base]: {
    bg: { default: { backgroundColor: '#1C1C1E' } },
    text: { default: { color: '#F2F2F7' } },
    border: { default: { borderColor: '#38383A' } },
  },
  [CoreColorKey.Primary]: {
    bg: {
      default: { backgroundColor: '#D2E69C' },
      active: { backgroundColor: '#BCCF82' },
    },
    text: { default: { color: '#3A4E00' } },
    border: { default: { borderColor: '#B4D16F' } },
  },
  [CoreColorKey.Secondary]: {
    bg: {
      default: { backgroundColor: '#3A3A3C' },
      active: { backgroundColor: '#48484A' },
    },
    text: { default: { color: '#E5E5EA' } },
    border: { default: { borderColor: '#545458' } },
  },
  // 他のキーも同様にダークモード用を定義...
  [CoreColorKey.Danger]: {
    bg: {
      default: { backgroundColor: '#FF453A' },
      active: { backgroundColor: '#E03C32' },
    },
    text: { default: { color: '#FFFFFF' } },
  },
  [CoreColorKey.Success]: {
    bg: {
      default: { backgroundColor: '#32D74B' },
      active: { backgroundColor: '#2BB440' },
    },
    text: { default: { color: '#FFFFFF' } },
  },
  [SpecialColorKey.Heart]: {
    text: { default: { color: '#FF375F' } },
  },
};

export const defaultColorMap = {
  light: lightDefault,
  dark: darkDefault,
};