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