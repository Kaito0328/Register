import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from '@/components/Button';
import { CoreColorKey } from '@/styles/tokens/color';
import { LifecycleUnit } from '@/types/Note';
import { LifeCycleNameMap } from '@/utils/LifeCycleUtils';
import { RoundKey } from '@/styles/tokens';

type Props = {
    unit: LifecycleUnit;
    isSelected: boolean;
    onPress: () => void;
};

export const LifeCycleUnitButton: React.FC<Props> = ({ unit, isSelected, onPress }) => {
    const label = LifeCycleNameMap[unit] || '不明';
  return (
    <Button
      style={styles.unitButton}
      viewStyleKit={{
        color: { colorKey: isSelected ? CoreColorKey.Primary : CoreColorKey.Secondary },
        roundKey: RoundKey.Sm
      }}
      onPress={onPress}
    >
      {label}
    </Button>
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
