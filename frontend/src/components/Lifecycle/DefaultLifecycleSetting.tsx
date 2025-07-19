// components/Lifecycle/SettingScreen.tsx

import React, { useState, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSettings } from '@/contexts/SettingsContext';
import { NoteLifecycle, SpecialLifeCycleUnit } from '@/types/Note';
import { getErrorMessage, isValidLifecycle } from '@/utils/LifeCycleUtils';
import { LifecyclePanel } from './LifecyclePanel';
import { SpecialLifecycleSelector } from './SpecialLifecycleSelector';
import { StatusMessage } from '../StatusMessage/StatusMessage';
import { ComponentStatus } from '@/types/ComponentStatus';
import { BaseText } from '@/base/BaseText';
import { CoreColorKey } from '@/styles/tokens';

type Props = {
  defaultLifecycle: NoteLifecycle;
  saveDefaultLifecycle: (lifecycle: NoteLifecycle) => void;
};

// ★ 1. 通常のReactコンポーネントとして正しく定義
export const DefaultLifecycleSetting: React.FC<Props> = ({defaultLifecycle, saveDefaultLifecycle}) => {
  const [saveStatus, setSaveStatus] = useState<ComponentStatus>(ComponentStatus.Idle);
  const [error, setError] = useState<string | null>(null);

  const handleSave = useCallback(async (lifecycle: NoteLifecycle) => {
    if (lifecycle.unit === defaultLifecycle.unit && lifecycle.value === defaultLifecycle.value) {
      return;
    }
          if (!isValidLifecycle(lifecycle)) {
        setError(getErrorMessage(lifecycle.unit));
        setSaveStatus(ComponentStatus.Error);
        // 5秒後にアイドル状態に戻す
        setTimeout(() => setSaveStatus(ComponentStatus.Idle), 5000); 
        return;
      }
    setSaveStatus(ComponentStatus.Loading);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      await saveDefaultLifecycle(lifecycle);
      setSaveStatus(ComponentStatus.Success);
      setTimeout(() => setSaveStatus(ComponentStatus.Idle), 2000);
    } catch (e) {
      setSaveStatus(ComponentStatus.Error);
    }
  }, [defaultLifecycle, saveDefaultLifecycle]);

  const handleSelectSpecialUnit = (unit: SpecialLifeCycleUnit) => {
    handleSave({ unit, value: null });
  };

  return (
    <View style={styles.container}>
      <LifecyclePanel
        initialLifecycle={defaultLifecycle}
        onSave={handleSave}
        isExpanded={true}
      >

        <View style={styles.displayContent}>
          <BaseText styleKit={{ color: { colorKey: CoreColorKey.Base } }}>
            デフォルトの保存期間
          </BaseText>
          <SpecialLifecycleSelector
            lifecycle={defaultLifecycle}
            onSelectSpecialUnit={handleSelectSpecialUnit}
          />
        </View>
      </LifecyclePanel>

      <StatusMessage
        status={saveStatus}
        loadingMessage="設定を保存中..."
        successMessage="保存しました"
        errorMessage={error || '保存に失敗しました'}
      />
    </View>
  );
};

// ★ スタイルを追加
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  displayContent: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});