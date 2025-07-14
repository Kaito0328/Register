import { defaultColorMap } from '../defaults/defaultColorMap';
import { CoreColorKey } from '@/style/color';
import type { ColorThemeMap } from '@/style/color';

const createTextInputColorMap = (theme: ColorThemeMap): ColorThemeMap => {
  const newTheme = deepCopy(theme);

  // Base（入力欄の通常時）のスタイルを調整
  newTheme[CoreColorKey.Base] = {
    // 背景色は少し目立つように、Secondaryの背景色を借用
    bg: { default: theme[CoreColorKey.Secondary].bg!.default },
    // テキスト色はBaseのまま
    text: { default: theme[CoreColorKey.Base].text!.default },
    // 枠線もSecondaryの色を借用
    border: { default: theme[CoreColorKey.Secondary].border!.default },
  };

  // Primary（フォーカス時や有効時）のスタイルを調整
  // コンポーネント側でisFocusedの時にPrimaryを参照することを想定
  newTheme[CoreColorKey.Primary] = {
    ...newTheme[CoreColorKey.Primary],
    // フォーカス時の枠線としてPrimaryのボーダー色を使う
    border: { default: theme[CoreColorKey.Primary].border!.default },
  };

  return newTheme;
};

export const textInputColorMap = {
  light: createTextInputColorMap(defaultColorMap.light),
  dark: createTextInputColorMap(defaultColorMap.dark),
};
import { defaultSizeMap } from '../defaults/defaultSizeMap';
import { defaultRoundMap } from '../defaults/defaultRoundMap';
import { defaultFontWeightMap } from '../defaults/defaultFontWeightMap';
import { deepCopy } from '@/utils/utils';

export const textInputStyleMaps = {
  colorMap: textInputColorMap,
  sizeMap: defaultSizeMap,
  roundMap: defaultRoundMap,
  // shadowMap: undefined, // TextInputに影は通常不要
  fontWeightMap: defaultFontWeightMap,
};