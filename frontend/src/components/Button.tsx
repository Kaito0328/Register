import React, { useMemo } from 'react';
import { BasePressable, type BasePressableProps } from '@/base/BasePressable';
import { BaseText, type BaseTextProps } from '@/base/BaseText';
import { CoreColorKey, FontWeightKey } from '@/styles/tokens';
import { PartialViewStyleKit, PartialTextStyleKit, ExclusiveMuliStyleProps } from '@/styles/component';

// Buttonが受け取るpropsの型を定義
type ButtonProps = BasePressableProps & {
  children: string;
} & ExclusiveMuliStyleProps<PartialViewStyleKit, PartialTextStyleKit>;

export const Button: React.FC<ButtonProps> = ({
  children,
  easyStyleKit, 
  viewStyleKit,
  textStyleKit,
  ...props
}) => {
const pressableKit = useMemo((): PartialViewStyleKit => {
    // easyStyleKitが指定されていれば、それを優先して変換
    if (easyStyleKit) {
      return {
        color: easyStyleKit.colorKey ? { colorKey: easyStyleKit.colorKey } : undefined,
        size: easyStyleKit.sizeKey ? { sizeKey: easyStyleKit.sizeKey } : undefined,
        roundKey: easyStyleKit.roundKey,
      };
    }
    // なければ、詳細Kitをそのまま使う
    return viewStyleKit ?? {};
  }, [easyStyleKit, viewStyleKit]);

  // ボタンのテキストに関するデフォルトのスタイルを定義
  const defaultTextStyleKit: PartialTextStyleKit = {
    fontWeightKey: FontWeightKey.Semibold,
  };

  return (
    <BasePressable styleKit={pressableKit} {...props}>
      <BaseText
        styleKit={{
          ...defaultTextStyleKit,
          ...textStyleKit,
        }}
        disabled={props.disabled ?? false}
      >
        {children}
      </BaseText>
    </BasePressable>
  );
};
