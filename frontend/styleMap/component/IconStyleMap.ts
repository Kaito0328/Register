import { defaultColorMap } from '../defaults/defaultColorMap';
import { CoreColorKey } from '@/style/color';
import type { ColorThemeMap } from '@/style/color';

// --- ライトモード ---
const lightIcon: ColorThemeMap = {
  ...defaultColorMap.light,
  // アイコンはテキストより少し薄い色にしたい場合など、調整を加える
  [CoreColorKey.Base]: {
    text: { default: { color: '#8A8A8E' } }, // subTextの色をデフォルトにするなど
  },
  [CoreColorKey.Primary]: {
    text: { default: { color: defaultColorMap.light[CoreColorKey.Primary].bg?.default.backgroundColor } },
  }
};

// --- ダークモード ---
const darkIcon: ColorThemeMap = {
  ...defaultColorMap.dark,
  [CoreColorKey.Base]: {
    text: { default: { color: '#8A8A8E' } },
  },
   [CoreColorKey.Primary]: {
    text: { default: { color: defaultColorMap.dark[CoreColorKey.Primary].bg?.default.backgroundColor } },
  }
};

export const iconColorMap = {
  light: lightIcon,
  dark: darkIcon,
};

import { defaultSizeMap } from '../defaults/defaultSizeMap';

export const iconStyleMaps = {
  colorMap: iconColorMap,
  sizeMap: defaultSizeMap,
  // roundMap: undefined,
  // shadowMap: undefined,
  // fontWeightMap: undefined,
};