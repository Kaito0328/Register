import { defaultColorMap } from '../defaults/defaultColorMap';
import { CoreColorKey } from '@/style/color';
import type { ColorThemeMap } from '@/style/color';

// --- ライトモード ---
const lightText: ColorThemeMap = {
  ...defaultColorMap.light,
  // BaseText用にSecondaryキーの役割を「サブテキスト色」として明確化
  [CoreColorKey.Secondary]: {
    text: { default: { color: '#8A8A8E' } },
  },
};

// --- ダークモード ---
const darkText: ColorThemeMap = {
  ...defaultColorMap.dark,
  [CoreColorKey.Secondary]: {
    text: { default: { color: '#8A8A8E' } },
  },
};

export const textColorMap = {
  light: lightText,
  dark: darkText,
};

import { defaultSizeMap } from '../defaults/defaultSizeMap';
import { defaultFontWeightMap } from '../defaults/defaultFontWeightMap';

// BaseTextはシャドウや角丸を持たないため、マップを限定します。
export const textStyleMaps = {
  colorMap: textColorMap,
  sizeMap: defaultSizeMap,
  // roundMap: undefined, // 不要
  // shadowMap: undefined, // 不要
  fontWeightMap: defaultFontWeightMap,
};