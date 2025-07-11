import React from 'react';
import { type PressableProps } from 'react-native';
import { BasePressable, type BasePressableProps } from '../base/BasePressable';
import { BaseText, type BaseTextProps } from '../base/BaseText';
import { CoreColorKey, ColorPropertyKey } from '@/style/color';
import { FontWeightKey } from '@/style/fontWeight';

// Buttonが受け取るpropsの型を定義
type ButtonProps = PressableProps & {
  // childrenは文字列であることを期待する
  children: string;
  // styleKitは、コンテナ用とテキスト用を分けて受け取れるようにする
  pressableStyleKit?: BasePressableProps['styleKit'];
  textStyleKit?: BaseTextProps['styleKit'];
};

export const BaseButton: React.FC<ButtonProps> = ({
  children,
  pressableStyleKit,
  textStyleKit,
  ...props
}) => {
  return (
    <BasePressable styleKit={pressableStyleKit} {...props}>
      <BaseText
        styleKit={{
          // Pressableの色に合わせて、テキストの色も自動で設定
          color: {
            colorKey: pressableStyleKit?.color?.colorKey ?? CoreColorKey.Primary,
            properties: [ColorPropertyKey.Text],
          },
          // ボタンのテキストは少し太くする
          fontWeightKey: FontWeightKey.Semibold,
          // propsで渡されたテキストスタイルで上書き
          ...textStyleKit,
        }}
      >
        {children}
      </BaseText>
    </BasePressable>
  );
};