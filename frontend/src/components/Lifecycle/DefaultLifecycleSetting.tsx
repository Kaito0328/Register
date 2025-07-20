import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
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
  saveDefaultLifecycle: (lifecycle: NoteLifecycle) => Promise<void> | void; // asyncを考慮
};

export const DefaultLifecycleSetting: React.FC<Props> = ({ defaultLifecycle, saveDefaultLifecycle }) => {
  // ★★★ 1. 編集中のライフサイクルを管理するためのstateを追加
  const [lifecycle, setLifecycle] = useState<NoteLifecycle>(defaultLifecycle);
  const [saveStatus, setSaveStatus] = useState<ComponentStatus>(ComponentStatus.Idle);
  const [error, setError] = useState<string | null>(null);

  // ★★★ 2. lifecycleのstateが変更されたら、自動で保存処理を実行するuseEffect
  useEffect(() => {
    // 初期値と同じ場合は、保存処理を実行しない
    if (lifecycle.unit === defaultLifecycle.unit && lifecycle.value === defaultLifecycle.value) {
      return;
    }

    const handleSave = async () => {
      if (!isValidLifecycle(lifecycle)) {
        setError(getErrorMessage(lifecycle.unit));
        setSaveStatus(ComponentStatus.Error);
        setTimeout(() => setSaveStatus(ComponentStatus.Idle), 5000);
        return;
      }

      setSaveStatus(ComponentStatus.Loading);
      setError(null);
      try {
        await saveDefaultLifecycle(lifecycle);
        setSaveStatus(ComponentStatus.Success);
        setTimeout(() => setSaveStatus(ComponentStatus.Idle), 2000);
      } catch (e) {
        setSaveStatus(ComponentStatus.Error);
        setTimeout(() => setSaveStatus(ComponentStatus.Idle), 5000);
      }
    };

    // ユーザーの入力を少し待ってから保存を実行する（デバウンス）
    const timer = setTimeout(() => {
      handleSave();
    }, 1000);

    return () => clearTimeout(timer);
  }, [lifecycle, defaultLifecycle, saveDefaultLifecycle]);

  // ★★★ 3. ノートが切り替わった時に、内部のstateも追従させる
  useEffect(() => {
    setLifecycle(defaultLifecycle);
  }, [defaultLifecycle]);

  const handleSelectSpecialUnit = (unit: SpecialLifeCycleUnit) => {
    // この関数は直接stateを更新する
    setLifecycle({ unit, value: null });
  };

  return (
    <View style={styles.container}>
      {/* ★★★ 4. 新しいPropsに合わせてLifecyclePanelを呼び出す */}
      <LifecyclePanel
        lifecycle={lifecycle}
        onChangeLifecycle={setLifecycle}
        isExpanded={true} // 設定画面では常に開いておく
      >
        <View style={styles.displayContent}>
          <BaseText styleKit={{ color: { colorKey: CoreColorKey.Base } }}>
            デフォルトの保存期間
          </BaseText>
          <SpecialLifecycleSelector
            lifecycle={lifecycle} // 表示も内部stateに合わせる
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