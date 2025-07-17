// components/Header/NoteHeaderMenu.tsx

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { BaseText } from '@/base/BaseText';

type Props = {
  onPress: () => void;
};

// こちらもReact.memoで不要な再レンダリングを防ぐ
export const NoteHeaderMenu: React.FC<Props> = React.memo(({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ paddingHorizontal: 16 }}>
      <BaseText style={{ fontSize: 24, fontWeight: 'bold' }}>...</BaseText>
    </TouchableOpacity>
  );
});