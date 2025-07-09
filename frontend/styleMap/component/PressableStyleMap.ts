import { defaultColorMap } from '../defaults/defaultColorMap';
import { defaultSizeMap } from '../defaults/defaultSizeMap';
import { defaultShadowMap } from '../defaults/defaultShadowMap';
import { defaultRoundMap } from '../defaults/defaultRoundMap';
import { defaultFontWeightMap } from '../defaults/defaultFontWeightMap';

// BasePressableはボタンのように振る舞うため、
// すべてのデフォルトスタイルを適用できるようにします。
// ボタン専用の特別なサイズなどが必要な場合は、ここでsizeMapを上書きします。
export const pressableStyleMaps = {
  colorMap: defaultColorMap,
  sizeMap: defaultSizeMap,
  shadowMap: defaultShadowMap,
  roundMap: defaultRoundMap,
  fontWeightMap: defaultFontWeightMap,
};