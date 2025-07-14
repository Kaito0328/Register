import { ColorThemeMap, CoreColorKey, SpecialColorKey } from '@/style/color';

/**
 * ### ライトモード用のカラーパレット
 * 全体的に彩度を抑え、目に優しい配色に。
 * ベースカラーにほんのり緑がかったオフホワイトを、テキストに濃いチャコールグレーを使用。
 */
const lightTheme: ColorThemeMap = {
  [CoreColorKey.Base]: {
    bg: { default: { backgroundColor: '#F9FAF8' } }, // わずかに緑がかった白
    text: {
      default: { color: '#1C2118' }, // 濃いチャコールグレー
      // ★ Placeholder用の色を追加
      placeholder: { color: '#9A9E96' },
    },
    border: { default: { borderColor: '#E3E5E1' } },
  },
  [CoreColorKey.Primary]: {
    bg: {
      default: { backgroundColor: '#D1E89C' }, // 主役の薄い黄緑色
      active: { backgroundColor: '#BFD78A' }, // 少し濃くして押した感を演出
    },
    text: {
      default: { color: '#3A4D00' }, // 背景の黄緑に対して可読性の高い濃い緑
      active: { color: '#3A4D00' },
    },
    border: { default: { borderColor: '#AEC57C' } },
  },
  [CoreColorKey.Secondary]: {
    bg: {
      default: { backgroundColor: '#E4E7E1' }, // ベースより少し濃いグレー
      active: { backgroundColor: '#D2D5CE' },
    },
    text: { default: { color: '#52574E' } },
    border: { default: { borderColor: '#C1C4BD' } },
  },
  [CoreColorKey.Danger]: {
    bg: {
      default: { backgroundColor: '#F8D7DA' },
      active: { backgroundColor: '#F1C2C7' },
    },
    text: { default: { color: '#721C24' } },
    border: { default: { borderColor: '#F5C6CB' } },
  },
  [CoreColorKey.Success]: {
    bg: {
      default: { backgroundColor: '#D4EDDA' },
      active: { backgroundColor: '#C3E6CB' },
    },
    text: { default: { color: '#155724' } },
    border: { default: { borderColor: '#C3E6CB' } },
  },
  [SpecialColorKey.Heart]: {
    text: { default: { color: '#E53935' } },
  },
};

/**
 * ### ダークモード用のカラーパレット
 * ライトモードの思想を反転。目に負担の少ないダークグレーを基調に。
 * Primaryカラーはダークモードでも映えるように、彩度を少し調整。
 */
const darkTheme: ColorThemeMap = {
  [CoreColorKey.Base]: {
    bg: { default: { backgroundColor: '#121410' } }, // 緑がかった黒に近いダークグレー
    text: {
      default: { color: '#E3E5E1' }, // わずかに黄みがかったオフホワイト
      // ★ Placeholder用の色を追加
      placeholder: { color: '#6A6D67' },
    },
    border: { default: { borderColor: '#3A3D37' } },
  },
  [CoreColorKey.Primary]: {
    bg: {
      default: { backgroundColor: '#4E5B2E' }, // ダークモードで映える、少し濃いめの黄緑
      active: { backgroundColor: '#606E3F' },
    },
    text: {
      default: { color: '#DCECB5' }, // 明るい黄緑で可読性を確保
      active: { color: '#EAF3D7' },
    },
    border: { default: { borderColor: '#404A26' } },
  },
  [CoreColorKey.Secondary]: {
    bg: {
      default: { backgroundColor: '#3A3D37' }, // ベースより少し明るいグレー
      active: { backgroundColor: '#4B4F47' },
    },
    text: { default: { color: '#C2C5BE' } },
    border: { default: { borderColor: '#565A52' } },
  },
  [CoreColorKey.Danger]: {
    bg: {
      default: { backgroundColor: '#5D2A2E' },
      active: { backgroundColor: '#70373C' },
    },
    text: { default: { color: '#F8D7DA' } },
    border: { default: { borderColor: '#721C24' } },
  },
  [CoreColorKey.Success]: {
    bg: {
      default: { backgroundColor: '#2A4B3A' },
      active: { backgroundColor: '#38634C' },
    },
    text: { default: { color: '#D4EDDA' } },
    border: { default: { borderColor: '#155724' } },
  },
  [SpecialColorKey.Heart]: {
    text: { default: { color: '#EF5350' } },
  },
};

export const defaultColorMap = {
  light: lightTheme,
  dark: darkTheme,
};
