import { StyleSheet } from 'react-native';
import { RoundKey, RoundMap, getRoundStyle } from './rounded';
import { getSizeStyle, SizeMap, SizeStyle } from './size';
import { getColorStyle, ColorStyle, ColorThemeMap, ColorMap } from './color';
import { getShadowStyle, ShadowMap, ShadowKey } from './shadow';
import { getFontWeightStyle, FontWeightKey, FontWeightMap } from './fontWeight';
import { defaultColorMap } from '@/styleMap/defaults/defaultColorMap';
import { defaultSizeMap } from '@/styleMap/defaults/defaultSizeMap';
import { defaultRoundMap } from '@/styleMap/defaults/defaultRoundMap';
import { defaultShadowMap } from '@/styleMap/defaults/defaultShadowMap';
import { defaultFontWeightMap } from '@/styleMap/defaults/defaultFontWeightMap';

// 型定義
export type ComponentStyle = {
  color: ColorStyle;
  size: SizeStyle;
  roundKey?: RoundKey;
  shadowKey?: ShadowKey;
  fontWeightKey?: FontWeightKey;
};

export type PartialComponentStyle = Omit<Partial<ComponentStyle>, 'color' | 'size'> & {
  color?: Partial<ColorStyle>;
  size?: Partial<SizeStyle>;
};

export type StyleMaps = {
  colorMap: ColorMap;
  sizeMap: SizeMap;
  roundMap: RoundMap;
  shadowMap: ShadowMap;
  fontWeightMap: FontWeightMap;
};


// 最終的なスタイルオブジェクトを生成する関数
export const getComponentStyle = (
  defaultStyle: ComponentStyle,
  style?: PartialComponentStyle,
  maps?: Partial<StyleMaps> 
) => {
  // デフォルトと指定されたスタイルをマージ（マージロジックは簡略化）
  const mergedStyle: ComponentStyle = {
    color: { ...defaultStyle.color, ...style?.color },
    size: { ...defaultStyle.size, ...style?.size },
    roundKey: style?.roundKey ?? defaultStyle.roundKey,
    shadowKey: style?.shadowKey ?? defaultStyle.shadowKey,
    fontWeightKey: style?.fontWeightKey ?? defaultStyle.fontWeightKey,
  };

  // 各ヘルパー関数を呼び出してスタイルオブジェクトを生成
  const color = getColorStyle(maps?.colorMap ?? defaultColorMap, mergedStyle.color);
  const size = getSizeStyle(maps?.sizeMap ?? defaultSizeMap, mergedStyle.size);
  const round = getRoundStyle(maps?.roundMap ?? defaultRoundMap, mergedStyle.roundKey);
  const shadow = getShadowStyle(maps?.shadowMap ?? defaultShadowMap, mergedStyle.shadowKey);
  const fontWeight = getFontWeightStyle(maps?.fontWeightMap ?? defaultFontWeightMap, mergedStyle.fontWeightKey);

  // StyleSheet.flattenで全てのスタイルオブジェクトを一つにまとめる
  return StyleSheet.flatten([color, size, round, shadow, fontWeight]);
};