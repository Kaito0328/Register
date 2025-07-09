import { TextStyle } from 'react-native';

export enum FontWeightKey {
  Light = 'light',
  Normal = 'normal',
  Medium = 'medium',
  Semibold = 'semibold',
  Bold = 'bold',
}

// RNのfontWeightは文字列 or 数値
export type RNFontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export type FontWeightMap = Record<FontWeightKey, RNFontWeight>;

export const getFontWeightStyle = (
  map: FontWeightMap,
  fontWeightKey?: FontWeightKey
): TextStyle => {
  if (!fontWeightKey) return {};
  const fontWeight = map[fontWeightKey];
  return fontWeight ? { fontWeight } : {};
};