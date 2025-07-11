import React from 'react';
import { View, type ViewProps } from 'react-native';
import { CoreColorKey, ColorPropertyKey } from '@/style/color';
import { SizeKey, SizeProperty } from '@/style/size';
import { ComponentStyle, getComponentStyle, PartialComponentStyle } from '@/style/style';
import { getViewStyle } from '@/style/viewStyle';

// BaseViewのデフォルトの見た目を定義
const defaultStyle: ComponentStyle = {
  color: {
    colorKey: CoreColorKey.Base,
    properties: [ColorPropertyKey.Bg],
  },
  size: {
    sizeKey: SizeKey.MD,
    properties: [], // Viewにはデフォルトのsizeプロパティはない
  },
};

// BaseViewが受け取るpropsの型
export type BaseViewProps = ViewProps & {
  styleKit?: PartialComponentStyle;
};

export const BaseView: React.FC<BaseViewProps> = ({ styleKit, style, ...props }) => {
  const themedStyle = getViewStyle(defaultStyle, styleKit);

  return <View style={[themedStyle, style]} {...props} />;
};