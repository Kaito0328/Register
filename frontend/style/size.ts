import { ViewStyle, TextStyle } from 'react-native';

export enum SizeKey {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

export enum SizeProperty {
  Text = 'text',
  Padding = 'padding',
  Margin = 'margin',
  Gap = 'gap',
}

export type SizeStyle = {
  sizeKey: SizeKey;
  properties: SizeProperty[];
  fullWidth?: boolean;
};

// マップの値は数値
export type SizeMap = Record<
  SizeKey,
  {
    [SizeProperty.Text]?: number;
    [SizeProperty.Padding]?: number;
    [SizeProperty.Margin]?: number;
    [SizeProperty.Gap]?: number;
  }
>;

// スタイルオブジェクトを生成するヘルパー関数
export const getSizeStyle = (
  map: SizeMap,
  style: SizeStyle
): ViewStyle & TextStyle => {
  const size = map[style.sizeKey];
  if (!size) return {};

  const combinedStyle: ViewStyle & TextStyle = {};

  for (const prop of style.properties) {
    const value = size[prop];
    if (value !== undefined) {
      switch (prop) {
        case SizeProperty.Text:
          combinedStyle.fontSize = value;
          break;
        case SizeProperty.Padding:
          combinedStyle.padding = value;
          break;
        case SizeProperty.Margin:
          combinedStyle.margin = value;
          break;
        case SizeProperty.Gap:
          combinedStyle.gap = value;
          break;
      }
    }
  }

  if (style.fullWidth) {
    combinedStyle.width = '100%';
  }

  return combinedStyle;
};