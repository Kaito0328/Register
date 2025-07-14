import { defaultColorMap } from '../defaults/defaultColorMap';
import { CoreColorKey, ThemeColor } from '@/style/color';
import type { ColorThemeMap } from '@/style/color';



const createTextColorMap = (theme: ColorThemeMap): ColorThemeMap => {
  const newTheme = deepCopy(theme);
  for (const key in newTheme) {
    const typedKey = key as keyof ColorThemeMap;
    // bgとborderを削除
    delete newTheme[typedKey].bg;
    delete newTheme[typedKey].border;
  }
  return newTheme;
};

export const textColorMap = {
  light: createTextColorMap(defaultColorMap.light),
  dark: createTextColorMap(defaultColorMap.dark),
};

import { defaultSizeMap } from '../defaults/defaultSizeMap';
import { defaultFontWeightMap } from '../defaults/defaultFontWeightMap';
import { deepCopy } from '@/utils/utils';

// BaseTextはシャドウや角丸を持たないため、マップを限定します。
export const textStyleMaps = {
  colorMap: textColorMap,
  sizeMap: defaultSizeMap,
  // roundMap: undefined, // 不要
  // shadowMap: undefined, // 不要
  fontWeightMap: defaultFontWeightMap,
};