import React, { useState, useLayoutEffect, useEffect, useCallback, useMemo } from 'react';
import { useNavigation, useLocalSearchParams, router } from 'expo-router';
import { AppState, View, StyleSheet, Alert } from 'react-native';
import { BaseText } from '@/base/BaseText';
import { BaseView } from '@/base/BaseView';
import { useNotes } from '@/contexts/NotesContext';
import { NoteActionSheet } from '@/components/KebabMenu/NoteActionSheet';
import { CoreColorKey } from '@/styles/tokens';
import { NoteLifecycle } from '@/types/Note';

import { NoteHeaderTitle } from '@/components/Header/NoteHeaderTitle';
import { NoteHeaderMenu } from '@/components/Header/NoteHeaderMenu';
import { NoteContent } from '@/components/editor/NoteContent';
import { usePrevious } from '@/hooks/usePrevious';
import { LifecycleSetting } from '@/components/Lifecycle/LifeCycleSetting';
import { ComponentStatus } from '@/types/ComponentStatus';
import { StatusMessage } from '@/components/StatusMessage/StatusMessage';
import { calculateExpiresAt } from '@/utils/LifeCycleUtils';

export default function NoteDetailScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { findNoteById, deleteNote, updateNote, getTopNoteId, notes } = useNotes();

  const note = useMemo(() => findNoteById(id), [id, findNoteById, notes]);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [lifecycle, setLifecycle] = useState<NoteLifecycle | undefined>(undefined);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLifecycleExpanded, setIsLifecycleExpanded] = useState(false);
  const [saveStatus, setSaveStatus] = useState<ComponentStatus>(ComponentStatus.Idle);
  const [validationError, setValidationError] = useState<string | null>(null);

  const prevNote = usePrevious(note);
  const prevTitle = usePrevious(title);
  const prevText = usePrevious(text);
  const prevLifecycle = usePrevious(lifecycle);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setText(note.text || '');
      setLifecycle(note.lifecycle);
    }
  }, [note]);

  useEffect(() => {
    if (prevNote && prevNote.id !== note?.id) {
      const titleDirty = prevTitle !== prevNote.title || (prevTitle || '').trim() === '';
      const textDirty = prevText !== (prevNote.text || '');
      const lifecycleDirty = JSON.stringify(prevLifecycle) !== JSON.stringify(prevNote.lifecycle);

      if (!titleDirty && !textDirty && !lifecycleDirty) return;

      const runSave = async () => {
        setSaveStatus(ComponentStatus.Loading);
        try {
          const finalTitle = (prevTitle || '').trim() === '' ? (prevText || '').trim().substring(0, 20) || '無題のメモ' : (prevTitle || '');
          await updateNote(prevNote.id, {
            title: finalTitle,
            text: prevText || '',
            lifecycle: prevLifecycle,
          });
          setSaveStatus(ComponentStatus.Success);
          setTimeout(() => setSaveStatus(ComponentStatus.Idle), 2000);
        } catch (error) {
          setSaveStatus(ComponentStatus.Error);
          setTimeout(() => setSaveStatus(ComponentStatus.Idle), 5000);
        }
      };
      runSave();
    }
  }, [note, prevNote, prevTitle, prevText, prevLifecycle, updateNote]);

  const handleTitleChange = useCallback((newTitle: string) => {
    setTitle(newTitle);
  }, []);

  useLayoutEffect(() => {
    if (!note) return;
    navigation.setOptions({
      headerTitle: () => (
        <NoteHeaderTitle
          key={note.id}
          initialTitle={note.title}
          onTitleChange={handleTitleChange}
        />
      ),
      headerRight: () => (
        <NoteHeaderMenu onPress={() => setMenuVisible(true)} />
      ),
    });
  }, [navigation, note, handleTitleChange]);

  const saveCurrentNoteIfNeeded = useCallback(async () => {
    if (!note) return;
    const titleDirty = title !== note.title || title.trim() === '';
    const textDirty = text !== (note.text || '');
    const lifecycleDirty = JSON.stringify(lifecycle) !== JSON.stringify(note.lifecycle);

    if (!titleDirty && !textDirty && !lifecycleDirty) return;
    setSaveStatus(ComponentStatus.Loading);

    try {
      const finalTitle = title.trim() === '' ? text.trim().substring(0, 20) || '無題のメモ' : title;
      await updateNote(note.id, { title: finalTitle, text, lifecycle });
      setSaveStatus(ComponentStatus.Success);
      setTimeout(() => setSaveStatus(ComponentStatus.Idle), 2000);
    } catch (error) {
      console.error("Failed to save note:", error);
      setSaveStatus(ComponentStatus.Error);
      setTimeout(() => setSaveStatus(ComponentStatus.Idle), 5000);
    }
  }, [note, title, text, lifecycle, updateNote]);

  const handleDebounceSave = useCallback(async () => {
    if (!note) return;
    const titleDirty = title !== note.title;
    const textDirty = text !== (note.text || '');
    const lifecycleDirty = JSON.stringify(lifecycle) !== JSON.stringify(note.lifecycle);

    if (!titleDirty && !textDirty && !lifecycleDirty) return;
    setSaveStatus(ComponentStatus.Loading);

    try {
      await updateNote(note.id, { title, text, lifecycle, expiresAt: lifecycle ?  calculateExpiresAt(lifecycle, note.createdAt) : undefined });
      setSaveStatus(ComponentStatus.Success);
      setTimeout(() => setSaveStatus(ComponentStatus.Idle), 2000);
    } catch (error) {
      console.error("Failed to auto-save note:", error);
      setSaveStatus(ComponentStatus.Error);
      setTimeout(() => setSaveStatus(ComponentStatus.Idle), 5000);
    }
  }, [note, title, text, lifecycle, updateNote]);

  // ★★★ デバウンスのuseEffectを修正
  useEffect(() => {
    if (!note) return;

    // ★★★ 1. lifecycleの変更もチェックに含める
    const isDirty = title !== note.title || text !== (note.text || '') || JSON.stringify(lifecycle) !== JSON.stringify(note.lifecycle);
    if (!isDirty) return;

    const handler = setTimeout(() => {
      console.log('[Debounce] 自動保存を実行します。');
      handleDebounceSave();
    }, 2000);

    return () => clearTimeout(handler);
  // ★★★ 2. 依存配列にlifecycleを追加
  }, [title, text, lifecycle, note, handleDebounceSave]);


  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState.match(/inactive|background/)) {
        saveCurrentNoteIfNeeded();
      }
    });
    return () => subscription.remove();
  }, [saveCurrentNoteIfNeeded]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (!note) return;
      const titleDirty = title !== note.title;
      const textDirty = text !== (note.text || '');
      const lifecycleDirty = JSON.stringify(lifecycle) !== JSON.stringify(note.lifecycle);

      if (!titleDirty && !textDirty && !lifecycleDirty) return;

      e.preventDefault();
      Alert.alert('変更が保存されていません', 'このままページを離れますか？', [
        { text: "キャンセル", style: 'cancel' },
        { text: '変更を破棄', style: 'destructive', onPress: () => navigation.dispatch(e.data.action) },
        { text: '保存して移動', style: 'default', onPress: () => {
            saveCurrentNoteIfNeeded();
            navigation.dispatch(e.data.action);
          }},
      ]);
    });
    return unsubscribe;
  }, [navigation, note, title, text, lifecycle, saveCurrentNoteIfNeeded]);

  const handleDelete = () => {
    if (!id) return;
    deleteNote(id);
    router.replace('/');
  };
  
  const handleToggleExpand = useCallback(() => {
    setIsLifecycleExpanded(prev => !prev);
  }, []);

  const setError = useCallback((error: string | null) => {
    setValidationError(error);
    if (error) {
      setSaveStatus(ComponentStatus.Error);
      setTimeout(() => {
        setSaveStatus(ComponentStatus.Idle);
        // エラーメッセージもクリアする
        setValidationError(null);
      }, 5000);
    }
  }, [setValidationError, setSaveStatus]);

  if (!note || !lifecycle) {
    return <BaseView style={styles.container}><BaseText>ノートが見つかりません。</BaseText></BaseView>;
  }

  return (
    <BaseView style={styles.container} styleKit={{ color: { colorKey: CoreColorKey.Base } }}>
      <View style={styles.settingWrapper}>
        <LifecycleSetting
          lifecycle={lifecycle}
          onChangeLifecycle={setLifecycle}
          expiresAt={note.expiresAt}
          isExpanded={isLifecycleExpanded}
          onToggleExpand={handleToggleExpand}
          onValidationFailure={setError} 
        />
      </View>
      <StatusMessage
        status={saveStatus}
        loadingMessage="保存中..."
        successMessage="保存済み"
        errorMessage={validationError || "保存に失敗しました"}
      />
      <View style={styles.contentWrapper}>
        <NoteContent
          text={text}
          onChangeText={setText}
          createdAt={note.createdAt}
        />
      </View>
      <NoteActionSheet
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onDelete={handleDelete}
        note={note}
      />
    </BaseView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentWrapper: { flex: 1, width: '100%' },
  settingWrapper: { zIndex: 100 }
});
