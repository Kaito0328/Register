import React from 'react';
import { CoreColorKey } from '@/styles/tokens/color';
import { Button } from '../Button';

// Buttonが受け取るpropsの型を定義
type Props = {
    onPress: () => void; // onPressは必須
};

export const CreateMemoButton: React.FC<Props> = ({
    onPress,
}) => {
  return (
    <Button onPress={onPress} viewStyleKit={{color: {colorKey: CoreColorKey.Primary, }}}>
        ＋ 新しいメモを作成
    </Button>
  );
};