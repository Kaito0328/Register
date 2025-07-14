import { defaultColorMap } from '../defaults/defaultColorMap';
import { defaultSizeMap } from '../defaults/defaultSizeMap';
import { defaultShadowMap } from '../defaults/defaultShadowMap';
import { defaultRoundMap } from '../defaults/defaultRoundMap';
import { defaultFontWeightMap } from '../defaults/defaultFontWeightMap';
import { ColorThemeMap, CoreColorKey, ThemeColor } from '@/style/color';
import { deepCopy } from '@/utils/utils';

// BasePressableはボタンのように振る舞うため、
// すべてのデフォルトスタイルを適用できるようにします。
// ボタン専用の特別なサイズなどが必要な場合は、ここでsizeMapを上書きします。

// ボタンとしてのインタラクションをより明確にするために調整
const createPressableColorMap = (theme: ThemeColor): ColorThemeMap => {
  const colorMap = defaultColorMap[theme];
  const newColorMap = deepCopy(colorMap);

  // Primaryボタンのactive時のテキスト色を、より視認性の高い色に調整
  // (例として、ダークモードのPrimaryボタンを押した時のテキスト色を調整)
  if (theme === ThemeColor.Dark) {
      newColorMap[CoreColorKey.Primary].text!.active = { color: '#FFFFFF' };
  }

  // Secondaryボタンのactive時のスタイルを調整
  newColorMap[CoreColorKey.Secondary].text!.active = {
      // 押した時にテキスト色が少し濃くなるように
      color: newColorMap[CoreColorKey.Base].text!.default?.color
  };
  
  // Dangerボタンのactive時のスタイルを調整
  newColorMap[CoreColorKey.Danger].bg!.active = {
      // 押した時により濃い赤になるように
      backgroundColor: ThemeColor.Dark === theme ? '#8B0000' : '#DC3545'
  };
  newColorMap[CoreColorKey.Danger].text!.active = { color: '#FFFFFF' };


  return newColorMap;
};

export const pressableColorMap = {
  light: createPressableColorMap(ThemeColor.Light),
  dark: createPressableColorMap(ThemeColor.Dark),
};


export const pressableStyleMaps = {
  colorMap: defaultColorMap,
  sizeMap: defaultSizeMap,
  shadowMap: defaultShadowMap,
  roundMap: defaultRoundMap,
  fontWeightMap: defaultFontWeightMap,
};