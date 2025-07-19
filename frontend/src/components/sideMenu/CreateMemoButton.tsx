import React from 'react';
import { CoreColorKey } from '@/styles/tokens/color';
import { Button } from '../Button';
import { RoundKey } from '@/styles/tokens';

// Buttonが受け取るpropsの型を定義
type Props = {
    onPress: () => void; // onPressは必須
};

export const CreateMemoButton: React.FC<Props> = ({
    onPress,
}) => {
  return (
    <Button onPress={onPress} viewStyleKit={{color: {colorKey: CoreColorKey.Success, }, roundKey: RoundKey.None}}>
        ＋ 新しいメモを作成
    </Button>
  );
};