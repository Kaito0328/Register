// components/Lifecycle/LifecycleSetting.tsx

import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { useNotes } from '@/contexts/NotesContext';
import { NoteLifecycle, SpecialLifeCycleUnit } from '@/types/Note';
import { calculateExpiresAt, getErrorMessage, isValidLifecycle } from '@/utils/LifeCycleUtils';
import { RemainingTimeDisplay } from './RemainingTimeDisplay';
import { SpecialLifecycleSelector } from './SpecialLifecycleSelector';
import { StatusMessage } from '../StatusMessage/StatusMessage';
import { ComponentStatus } from '@/types/ComponentStatus';
import { LifecyclePanel, LifecyclePanelHandle } from './LifecyclePanel';
import { View, StyleSheet } from 'react-native';

type SettingProps = {
  noteId: string;
  createdAt: number;
  noteLifecycle: NoteLifecycle;
  expiresAt: number | null;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
};

export type LifecycleSettingHandle = {
  save: () => void;
};

export const LifecycleSetting = forwardRef<LifecycleSettingHandle, SettingProps>(({
  noteId,
  createdAt,
  noteLifecycle,
  expiresAt,
  isExpanded,
  onToggleExpand,
}, ref) => {
  const { updateNote } = useNotes();
  const [error, setError] = useState<string | null>(null);
  const panelRef = useRef<LifecyclePanelHandle>(null);
  const [saveStatus, setSaveStatus] = useState<ComponentStatus>(ComponentStatus.Idle);

  // ★★★ ここのロジックを修正 ★★★
  const handleSave = useCallback(async (lifecycle: NoteLifecycle) => {
    if (!isValidLifecycle(lifecycle)) {
      setError(getErrorMessage(lifecycle.unit));
      setSaveStatus(ComponentStatus.Error);
      // 5秒後にアイドル状態に戻す
      setTimeout(() => setSaveStatus(ComponentStatus.Idle), 5000); 
      return;
    }

    // 1. まずステータスを「Loading」に設定
    setSaveStatus(ComponentStatus.Loading);
    setError(null);

    try {
      // 意図的に500ms待ってから更新処理を実行
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newExpiresAt = calculateExpiresAt(lifecycle, createdAt);
      await updateNote(noteId, { lifecycle, expiresAt: newExpiresAt });

      // 2. 成功したらステータスを「Success」に設定
      setSaveStatus(ComponentStatus.Success);

      // 3. さらに2秒後にステータスを「Idle」に戻す
      setTimeout(() => setSaveStatus(ComponentStatus.Idle), 2000);

    } catch (err) {
      setSaveStatus(ComponentStatus.Error);
      // 5秒後にアイドル状態に戻す
      setTimeout(() => setSaveStatus(ComponentStatus.Idle), 5000);
    }
  }, [noteId, createdAt, updateNote]);

  useImperativeHandle(ref, () => ({
    save: () => panelRef.current?.save(),
  }));

  const handleSelectSpecialUnit = (unit: SpecialLifeCycleUnit) => {
    handleSave({ unit, value: null });
  };

  return (
    <View style={styles.container}>
      <LifecyclePanel
        ref={panelRef}
        initialLifecycle={noteLifecycle}
        onSave={handleSave}
        isExpanded={isExpanded}
        onToggleExpand={onToggleExpand}
      >
        <View style={styles.displayContent}>
          <RemainingTimeDisplay
            expiresAt={expiresAt}
          />
        </View>
        <SpecialLifecycleSelector
          lifecycle={noteLifecycle}
          onSelectSpecialUnit={handleSelectSpecialUnit}
        />
      </LifecyclePanel>
      
      <StatusMessage
        status={saveStatus}
        loadingMessage="保存中..."
        successMessage="保存済み"
        errorMessage={error || '保存に失敗しました。'}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  displayContent: {
    flex: 1,
    marginRight: 8,
  },
});