import React, { useState } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { BaseText } from '../../base/BaseText';
import { BaseTextInput } from '../../base/BaseTextInput';
import { Button } from '../Button';
import { NoteLifecycle, LifecycleUnit } from '@/types/Note';
import { CoreColorKey } from '@/styles/tokens/color';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSave: (lifecycle: NoteLifecycle) => void;
  currentLifecycle: NoteLifecycle;
};

export const LifecycleSettingsModal: React.FC<Props> = ({ visible, onClose, onSave, currentLifecycle }) => {
  const [unit, setUnit] = useState<LifecycleUnit>(currentLifecycle.unit);
  const [value, setValue] = useState<string>(currentLifecycle.value?.toString() || '');

  const handleSave = () => {
    let finalValue: number | null = parseInt(value, 10);
    if (unit === LifecycleUnit.Forever || unit === LifecycleUnit.Today) {
      finalValue = null;
    } else if (isNaN(finalValue) || finalValue <= 0) {
      return;
    }
    onSave({ unit, value: finalValue });
    onClose();
  };
  
  const renderUnitButton = (targetUnit: LifecycleUnit, label: string) => {
    const isSelected = unit === targetUnit;
    return (
      <Button
        style={[styles.unitButton]}
         viewStyleKit={{color: {colorKey: isSelected ? CoreColorKey.Primary : CoreColorKey.Secondary}}}
        onPress={() => setUnit(targetUnit)}
      >
        {label}
      </Button>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <BaseText style={styles.title} styleKit={{color: {colorKey: CoreColorKey.Primary}}}>ライフサイクル設定</BaseText>

          <View style={styles.presetContainer}>
            {renderUnitButton(LifecycleUnit.Forever, "無期限")}
            {renderUnitButton(LifecycleUnit.Today, "今日の終わりまで")}
          </View>

          <View style={styles.customContainer}>
            <BaseTextInput
              style={styles.input}
              value={value}
              onChangeText={setValue}
              keyboardType="number-pad"
              placeholder="期間"
              editable={unit !== LifecycleUnit.Forever && unit !== LifecycleUnit.Today}
            />
            <View style={styles.unitSelector}>
              {renderUnitButton(LifecycleUnit.Hour, "時間")}
              {renderUnitButton(LifecycleUnit.Day, "日")}
              {renderUnitButton(LifecycleUnit.Month, "月")}
              {renderUnitButton(LifecycleUnit.Year, "年")}
            </View>
          </View>

          <View style={styles.footerButtons}>
            <Button onPress={onClose} viewStyleKit={{color: {colorKey: CoreColorKey.Secondary}}}>キャンセル</Button>
            <View style={{width: 16}} />
            <Button onPress={handleSave} viewStyleKit={{color: {colorKey: CoreColorKey.Primary}}}>保存</Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  presetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  customContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    width: 80,
    textAlign: 'center',
    marginRight: 16,
  },
  unitSelector: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  unitButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    margin: 4,
  },
  footerButtons: {
    flexDirection: 'row',
  }
});
