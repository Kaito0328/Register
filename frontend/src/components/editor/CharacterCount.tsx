import React from 'react';
import { BaseText } from '@/base/BaseText';
import { CoreColorKey } from '@/styles/tokens';
import { StyleSheet } from 'react-native';

type Props = {
  text: string;
};

export const CharacterCount: React.FC<Props> = ({ text }) => {
  return (
    <BaseText 
      style={styles.text} 
      styleKit={{ color: { colorKey: CoreColorKey.Base } }}
      testID="character-count"
    >
      文字数: {text.length}
    </BaseText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
  },
});