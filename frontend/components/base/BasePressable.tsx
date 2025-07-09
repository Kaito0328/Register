import React, { useState } from 'react';
import { Pressable, type PressableProps } from 'react-native';
import { CoreColorKey, ColorPropertyKey } from '@/style/color';
import { SizeKey, SizeProperty } from '@/style/size';
import { FontWeightKey } from '@/style/fontWeight';
import { RoundKey } from '@/style/rounded';
import { ShadowKey } from '@/style/shadow';
import { ComponentStyle, getComponentStyle, PartialComponentStyle } from '@/style/style';
import { useThemeColor } from '@/hooks/useThemeColor';

// BasePressableのデフォルトの見た目を定義
const defaultStyle: ComponentStyle = {
  color: {
    colorKey: CoreColorKey.Primary,
    properties: [ColorPropertyKey.Bg, ColorPropertyKey.Border],
  },
  size: {
    sizeKey: SizeKey.MD,
    properties: [SizeProperty.Padding],
  },
  roundKey: RoundKey.Md,
  shadowKey: ShadowKey.SM,
};

// BasePressableが受け取るpropsの型
export type BasePressableProps = PressableProps & {
  styleKit?: PartialComponentStyle;
};

export const BasePressable: React.FC<BasePressableProps> = ({ styleKit, style, ...props }) => {
  // 押されているかどうかをstateで管理
  const [isActive, setIsActive] = useState(false);

  // デフォルトスタイルをisActive状態で上書き
  const activeStyleKit: PartialComponentStyle = {
    color: {
      isActive: isActive,
    },
  };

  const themedStyle = getComponentStyle(defaultStyle, activeStyleKit);
  

  return (
    <Pressable
      onPressIn={() => setIsActive(true)}
      onPressOut={() => setIsActive(false)}
      style={({ pressed }) => [themedStyle, typeof style === 'function' ? style({ pressed }) : style]}
      {...props}
    />
  );
};