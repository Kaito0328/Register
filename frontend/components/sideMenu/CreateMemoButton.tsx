import React from 'react';
import { type PressableProps } from 'react-native';
import { BasePressable, type BasePressableProps } from '../base/BasePressable';
import { BaseText, type BaseTextProps } from '../base/BaseText';
import { CoreColorKey, ColorPropertyKey } from '@/style/color';
import { FontWeightKey } from '@/style/fontWeight';
import { BaseButton } from '../base/BaseButton';

// Buttonが受け取るpropsの型を定義
type Props = {
    onPress: () => void; // onPressは必須
};

export const CreateMemoButton: React.FC<Props> = ({
    onPress,
}) => {
  return (
    <BaseButton onPress={onPress} pressableStyleKit={{color: {colorKey: CoreColorKey.Primary, }}}>
        ＋ 新しいメモを作成
    </BaseButton>
  );
};