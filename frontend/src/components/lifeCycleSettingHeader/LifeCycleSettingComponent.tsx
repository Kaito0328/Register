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

const LIFECYCLE_UNITS_ORDER: LifecycleUnit[] = [
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
}

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

  // unitまたはvalueが変更されたときに、1.5秒のデバウンスをかけて自動保存
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

  // propsで渡されるcurrentLifecycleが変更されたら、内部状態をリセット
  useEffect(() => {
    isInitialMount.current = true;
    setUnit(currentLifecycle.unit);
    setValue(currentLifecycle.value?.toString() || '');
    setError('');
    setSaveStatus(SaveStatus.Idle);
  }, [currentLifecycle]);

  // 単位が選択されたときの処理
  const handleUnitSelect = (selectedUnit: LifecycleUnit) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setUnit(selectedUnit);
    // ForeverまたはTodayが選択された場合、数値をクリア
    if (selectedUnit === LifecycleUnit.Forever || selectedUnit === LifecycleUnit.Today) {
      setValue('');
    }
  };

  // 保存処理
  const handleSave = () => {
    const finalValue = value === '' ? null : parseInt(value, 10);
    const lifecycleToSave: NoteLifecycle = {
      unit,
      value: unit === LifecycleUnit.Forever || unit === LifecycleUnit.Today ? null : finalValue,
    };

    if (isValidLifecycle(lifecycleToSave)) {
      setSaveStatus(SaveStatus.Saving);
      onSave(lifecycleToSave);
      // 保存アニメーションのためのタイマー
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

  // 保存ステータスに応じて表示を切り替える
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

  // ForeverまたはTodayが選択されている場合は、数値入力を無効化
  const isCustomInputEditable = unit !== LifecycleUnit.Forever && unit !== LifecycleUnit.Today;

  return (
    <BaseView style={styles.container} styleKit={{ color: { colorKey: CoreColorKey.Secondary, apply: {default: []} } }}>
      {/* --- 上部設定エリア --- */}
      <View style={styles.upperContainer}>
        <BaseText style={styles.title}>ライフサイクル設定</BaseText>
        <View style={styles.quickOptionsContainer}>
          <LifeCycleUnitButton
            unit={LifecycleUnit.Today}
            isSelected={unit === LifecycleUnit.Today}
            onPress={() => handleUnitSelect(LifecycleUnit.Today)}
          />
          <LifeCycleUnitButton
            unit={LifecycleUnit.Forever}
            isSelected={unit === LifecycleUnit.Forever}
            onPress={() => handleUnitSelect(LifecycleUnit.Forever)}
          />
        </View>
      </View>

      {/* --- カスタム期間設定エリア --- */}
      <View style={styles.customContainer}>
        <BaseTextInput
          style={styles.input}
          viewStyleKit={{
            color: { colorKey: isCustomInputEditable ? CoreColorKey.Base : CoreColorKey.Secondary },
          }}
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

      {/* --- 保存ステータス表示エリア --- */}
      <View style={styles.statusContainer}>{renderSaveStatus()}</View>
    </BaseView>
  );
};

// ★★★ スタイルシートを調整 ★★★
const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600', // 少し太く
  },
  upperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24, // 下の要素とのマージンを増やす
  },
  quickOptionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // ボタン間のスペース
  },
  customContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: 80, // 入力フィールドの幅を固定
    textAlign: 'center',
    marginRight: 1, // 入力フィールドと単位ボタンの間のスペース
  },
  unitSelector: {
    flex: 1, // 残りのスペースをすべて使用
    flexDirection: 'row',
    flexWrap: 'wrap', // ボタンが多ければ折り返す
    alignItems: 'center',
    gap: 1, // ボタン間のスペース
  },
  statusContainer: {
    height: 24, // 高さを確保してレイアウトが崩れないようにする
    marginTop: 16, // 上の要素とのマージン
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusPlaceholder: {
    height: 24, // statusContainerの高さと合わせる
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
  savedText: {
    color: '#28a745', // 保存成功時の色
    fontWeight: 'bold',
  },
  errorText: {
    color: '#dc3545', // エラー時の色
  },
});
