import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NoteLifecycle, SpecialLifeCycleUnit } from '@/types/Note';
import { LifeCycleUnitButton } from './LifeCycleUnitButton';

type Props = {
  lifecycle: NoteLifecycle;
  onSelectSpecialUnit: (unit: SpecialLifeCycleUnit) => void;
};

const SPECIAL_UNITS = [SpecialLifeCycleUnit.Today, SpecialLifeCycleUnit.Forever];

export const SpecialLifecycleSelector: React.FC<Props> = ({ lifecycle, onSelectSpecialUnit }) => {
  return (
    <View style={styles.container}>
      {SPECIAL_UNITS.map(unit => (
        <LifeCycleUnitButton
          key={unit}
          unit={unit}
          isSelected={lifecycle.unit === unit}
          onPress={() => onSelectSpecialUnit(unit)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
});