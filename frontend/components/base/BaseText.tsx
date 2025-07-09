import React from 'react';
import { Text, type TextProps } from 'react-native';
import { CoreColorKey, ColorPropertyKey } from '@/style/color';
import { SizeKey, SizeProperty } from '@/style/size';
import { FontWeightKey } from '@/style/fontWeight';
import { ComponentStyle, getComponentStyle, PartialComponentStyle } from '@/style/style';

// BaseTextのデフォルトの見た目を定義
const defaultStyle: ComponentStyle = {
  color: {
    colorKey: CoreColorKey.Base,
    properties: [ColorPropertyKey.Text],
  },
  size: {
    sizeKey: SizeKey.MD,
    properties: [SizeProperty.Text], // デフォルトで文字サイズを適用
  },
  fontWeightKey: FontWeightKey.Normal,
};

// BaseTextが受け取るpropsの型
export type BaseTextProps = TextProps & {
  styleKit?: PartialComponentStyle;
};

export const BaseText: React.FC<BaseTextProps> = ({ styleKit, style, ...props }) => {
  const themedStyle = getComponentStyle(defaultStyle, styleKit);

  return <Text style={[themedStyle, style]} {...props} />;
};