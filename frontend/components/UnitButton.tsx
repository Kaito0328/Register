import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseButton } from './base/BaseButton';
import { CoreColorKey } from '@/style/color';

type Props = {
  label: string;
  onPress: () => void;
  isSelected: boolean;
};

export const UnitButton: React.FC<Props> = ({ label, onPress, isSelected }) => {
  return (
    <BaseButton
      style={styles.unitButton}
      pressableStyleKit={{
        color: { colorKey: isSelected ? CoreColorKey.Primary : CoreColorKey.Secondary },
      }}
      onPress={onPress}
    >
      {label}
    </BaseButton>
  );
};

const styles = StyleSheet.create({
  unitButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    // borderColorはpressableStyleKitで設定される想定
    borderRadius: 20,
    margin: 4,
  },
});
