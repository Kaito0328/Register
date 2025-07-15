import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { BaseText } from '../../base/BaseText';
import { BaseTextInput } from '../../base/BaseTextInput';
import { NoteLifecycle, LifecycleUnit } from '@/types/Note';
import { CoreColorKey } from '@/styles/tokens/color';
import { isValidLifecycle, getErrorMessage } from '@/utils/LifeCycleUtils';
import { LifeCycleUnitButton } from './LifeCycleUnitButton';
import { BaseView } from '../../base/BaseView';

// AndroidでLayoutAnimationを有効にするための設定
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// ★★★ 追加: 単位の表示順とラベルを定義 ★★★
const LIFECYCLE_UNITS_ORDER: LifecycleUnit[] = [
  LifecycleUnit.Today,
  LifecycleUnit.Forever,
  LifecycleUnit.Hour,
  LifecycleUnit.Day,
  LifecycleUnit.Month,
  LifecycleUnit.Year,
];

type Props = {
  onSave: (lifecycle: NoteLifecycle) => void;
  currentLifecycle: NoteLifecycle;
};

enum SaveStatus {
  Idle = 'idle',
  Saving = 'saving',
  Saved = 'saved',
  Error = 'error',
};

export const LifecycleSettingComponent: React.FC<Props> = ({
  onSave,
  currentLifecycle,
}) => {
  const [unit, setUnit] = useState<LifecycleUnit>(currentLifecycle.unit);
  const [value, setValue] = useState<string>(currentLifecycle.value?.toString() || '');
  const [error, setError] = useState<string>('');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>(SaveStatus.Idle);

  const debounceTimer = useRef<number | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    
    setError('');
    setSaveStatus(SaveStatus.Idle);

    debounceTimer.current = setTimeout(() => {
      handleSave();
    }, 1500);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [unit, value]);

  useEffect(() => {
    isInitialMount.current = true;
    setUnit(currentLifecycle.unit);
    setValue(currentLifecycle.value?.toString() || '');
    setError('');
    setSaveStatus(SaveStatus.Idle);
  }, [currentLifecycle]);


  const handleUnitSelect = (selectedUnit: LifecycleUnit) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setUnit(selectedUnit);
    if (selectedUnit === LifecycleUnit.Forever || selectedUnit === LifecycleUnit.Today) {
      setValue('');
    }
  };

  const handleSave = () => {
    const finalValue = value === '' ? null : parseInt(value, 10);
    const lifecycleToSave: NoteLifecycle = {
      unit,
      value: unit === LifecycleUnit.Forever || unit === LifecycleUnit.Today ? null : finalValue,
    };

    if (isValidLifecycle(lifecycleToSave)) {
      setSaveStatus(SaveStatus.Saving);
      onSave(lifecycleToSave);
      setTimeout(() => {
        setSaveStatus(SaveStatus.Saved);
        setTimeout(() => setSaveStatus(SaveStatus.Idle), 2000);
      }, 500);
    } else {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setError(getErrorMessage(unit));
      setSaveStatus(SaveStatus.Error);
    }
  };

  const renderSaveStatus = () => {
    switch (saveStatus) {
      case SaveStatus.Saving:
        return <BaseText style={styles.statusText}>保存中...</BaseText>;
      case SaveStatus.Saved:
        return <BaseText style={[styles.statusText, styles.savedText]}>✓ 保存済み</BaseText>;
      case SaveStatus.Error:
         return <BaseText style={[styles.statusText, styles.errorText]}>{error}</BaseText>;
      default:
        return <View style={styles.statusPlaceholder} />;
    }
  };

  const isCustomInputEditable = unit !== LifecycleUnit.Forever && unit !== LifecycleUnit.Today;

  return (
    <BaseView style={styles.container} styleKit={{color: {colorKey: CoreColorKey.Danger, apply: {default: []}}}}>
      <View style={styles.customContainer}>
        <BaseTextInput
          style={[styles.input]}
          viewStyleKit={{color: {colorKey: isCustomInputEditable ? CoreColorKey.Primary : CoreColorKey.Secondary}}}
          value={value}
          onChangeText={setValue}
          keyboardType="number-pad"
          placeholder="期間"
          editable={isCustomInputEditable}
        />
        <View style={styles.unitSelector}>
          {LIFECYCLE_UNITS_ORDER.map((targetUnit) => (
            <LifeCycleUnitButton
              key={targetUnit}
              unit={targetUnit}
              isSelected={unit === targetUnit}
              onPress={() => handleUnitSelect(targetUnit)}
            />
          ))}
        </View>
      </View>
      
      <View style={styles.statusContainer}>
        {renderSaveStatus()}
      </View>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  customContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 80,
    textAlign: 'center',
    marginRight: 16,
    fontSize: 16,
  },
  unitSelector: {
    flex: 1, // ★ flex: 1 に変更して、残りのスペースを埋めるようにする
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // ★ 左詰めにする
  },
  statusContainer: {
    height: 20,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusPlaceholder: {
    height: 20,
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
  savedText: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  errorText: {
    color: '#dc3545',
  },
});
