import React from 'react';
import {
  Pressable,
  type PressableProps,
  type PressableStateCallbackType,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { CoreColorKey, ColorPropertyKey } from '@/style/color';
import { SizeKey, SizeProperty } from '@/style/size';
import { RoundKey } from '@/style/rounded';
import { ShadowKey } from '@/style/shadow';
import { getComponentStyle, type ComponentStyle, type PartialComponentStyle } from '@/style/style';
import { useThemeColor } from '@/hooks/useThemeColor';
import { pressableStyleMaps } from '@/styleMap/component/PressableStyleMap';
import { getViewStyle } from '@/style/viewStyle';

// BasePressableのデフォルトの見た目を定義
// ★★★ 文字に関するプロパティ(Text)を削除 ★★★
const defaultStyle: ComponentStyle = {
  color: {
    colorKey: CoreColorKey.Primary,
    properties: [ColorPropertyKey.Bg, ColorPropertyKey.Border], // 背景と枠線のみ
  },
  size: {
    sizeKey: SizeKey.MD,
    properties: [SizeProperty.Padding], // 内側の余白のみ
  },
  roundKey: RoundKey.Md,
  shadowKey: ShadowKey.SM,
};

// BasePressableが受け取るpropsの型
export type BasePressableProps = PressableProps & {
  styleKit?: PartialComponentStyle;
};

export const BasePressable: React.FC<BasePressableProps> = ({
  styleKit,
  style,
  ...props
}) => {

  return (
    <Pressable
      // ★ styleプロパティの関数を正しく実装
      style={(state: PressableStateCallbackType): StyleProp<ViewStyle> => {
        // 押下状態(isActive)をstateから取得してマージ
        const mergedStyleKit: PartialComponentStyle = {
          ...styleKit,
          color: {
            ...styleKit?.color,
            isActive: state.pressed,
          },
        };

        // スタイルを生成
        const themedStyle = getViewStyle(
          defaultStyle,
          mergedStyleKit,
          pressableStyleMaps
        );

        // 外部から渡されたstyleも配列に含めて返す
        return [themedStyle, typeof style === 'function' ? style(state) : style];
      }}
      {...props}
    />
  );
};