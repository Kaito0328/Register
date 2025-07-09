import { defaultColorMap } from '../defaults/defaultColorMap';
import { defaultSizeMap } from '../defaults/defaultSizeMap';
import { defaultShadowMap } from '../defaults/defaultShadowMap';
import { defaultRoundMap } from '../defaults/defaultRoundMap';
import { defaultFontWeightMap } from '../defaults/defaultFontWeightMap';

// BaseViewはすべてのスタイルの基盤となるため、
// 基本的にはデフォルトのマップをそのまま利用します。
export const viewStyleMaps = {
  colorMap: defaultColorMap,
  sizeMap: defaultSizeMap,
  shadowMap: defaultShadowMap,
  roundMap: defaultRoundMap,
  fontWeightMap: defaultFontWeightMap,
};