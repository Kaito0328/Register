import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { CoreColorKey, ColorPropertyKey } from '@/style/color';
import { SizeKey, SizeProperty } from '@/style/size';
import { ComponentStyle, getComponentStyle, PartialComponentStyle } from '@/style/style';
import { TextStyle } from 'react-native';

// BaseIconのデフォルトの見た目を定義
const defaultStyle: ComponentStyle = {
  color: {
    colorKey: CoreColorKey.Base,
    properties: [ColorPropertyKey.Text], // アイコンの色はTextの色として扱う
  },
  size: {
    sizeKey: SizeKey.LG, // アイコンのデフォルトサイズ
    properties: [SizeProperty.Text], // アイコンのサイズはfontSizeとして扱う
  },
};

// BaseIconが受け取るpropsの型
export type BaseIconProps = {
  name: React.ComponentProps<typeof MaterialIcons>['name']; // アイコン名を指定
  styleKit?: PartialComponentStyle;
};

export const BaseIcon: React.FC<BaseIconProps> = ({ name, styleKit }) => {
  const themedStyle = getComponentStyle(defaultStyle, styleKit);

const { color: iconColor, fontSize: iconSize } = themedStyle as TextStyle
;
  return <MaterialIcons name={name} size={iconSize} color={iconColor} />;
};