import React from 'react';
import { StyleSheet } from 'react-native';
import { BaseButton } from '@/components/base/BaseButton';
import { CoreColorKey } from '@/style/color';
import { LifecycleUnit } from '@/types/Note';
import { LifeCycleNameMap } from '@/utils/LifeCycleUtils';
import { RoundKey } from '@/style/rounded';

type Props = {
    unit: LifecycleUnit;
    isSelected: boolean;
    onPress: () => void;
};

export const LifeCycleUnitButton: React.FC<Props> = ({ unit, isSelected, onPress }) => {
    const label = LifeCycleNameMap[unit] || '不明';
  return (
    <BaseButton
      style={styles.unitButton}
      pressableStyleKit={{
        color: { colorKey: isSelected ? CoreColorKey.Primary : CoreColorKey.Secondary },
        roundKey: RoundKey.Sm
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
