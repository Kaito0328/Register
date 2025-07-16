import React, { useState, useLayoutEffect, useEffect, useCallback, useRef } from 'react';
import { useNavigation, useLocalSearchParams, router } from 'expo-router';
import { AppState, TouchableOpacity, View, StyleSheet, Pressable, LayoutAnimation, LayoutChangeEvent } from 'react-native';
import NoteEditor from '@/components/editor/NoteEditor';
import { BaseText } from '@/base/BaseText';
import { BaseView } from '@/base/BaseView';
import { useNotes } from '@/contexts/NotesContext';
import { BaseTextInput } from '@/base/BaseTextInput';
import { SizeKey, RoundKey, CoreColorKey } from '@/styles/tokens';
import { NoteActionSheet } from '@/components/KebabMenu/NoteActionSheet';
import { Note, NoteLifecycle, SpecialLifeCycleUnit } from '@/types/Note';
import { LifecycleSetting } from '@/components/Lifecycle/LifeCycleSetting';
import { calculateExpiresAt } from '@/utils/LifeCycleUtils';

export default function NoteDetailScreen() {
  // --- Hooks, State, Refs, Handlers (ここは変更なし) ---
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { findNoteById, updateNote, deleteNote } = useNotes();
  const note = findNoteById(id);
  const [editableTitle, setEditableTitle] = useState(note?.title || '無題のメモ');
  const [text, setText] = useState(note?.text || '');
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLifecycleExpanded, setIsLifecycleExpanded] = useState(false);
  const [lifecycle, setLifecycle] = useState<NoteLifecycle>(note?.lifecycle || { unit: SpecialLifeCycleUnit.Forever, value: null });
  const latestState = useRef({ text, editableTitle });

    // ★修正点: ヘッダーの高さを保存するためのstateを追加
  const [headerHeight, setHeaderHeight] = useState(60); // 初期値として妥当な値を設定

  const handleToggleExpand = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsLifecycleExpanded(prev => !prev);
  }, []);

  const handleSaveTextAndTitle = useCallback(() => {
    if (!note) return;
    const { text: latestText, editableTitle: latestTitle } = latestState.current;
    if (latestText !== note.text || latestTitle !== note.title) {
      updateNote(note.id, { text: latestText, title: latestTitle });
    }
  }, [note, updateNote]);

  const handleSaveLifecycle = useCallback((newLifecycle: NoteLifecycle) => {
    if (!note) return;
    const expiresAt = calculateExpiresAt(newLifecycle, note.createdAt);
    updateNote(note.id, { lifecycle: newLifecycle, expiresAt });
  }, [note, updateNote, isLifecycleExpanded]);

  const handleDelete = () => {
    if (!note) return;
    deleteNote(note.id);
    router.back();
  };

  
  // ★追加: onLayoutイベントから高さを取得し、stateを更新するハンドラ
  const handleHeaderLayout = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    // 高さの変更があった場合のみstateを更新し、不要な再描画を防ぐ
    if (height !== headerHeight) {
      setHeaderHeight(height);
    }
  };

  // --- Effects (ここも変更なし) ---
  useEffect(() => {
    latestState.current = { text, editableTitle };
  }, [text, editableTitle]);

  useEffect(() => {
    if (note) {
      setEditableTitle(note.title || '無題のメモ');
      setText(note.text || '');
    }
  }, [note]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState.match(/inactive|background/)) {
        handleSaveTextAndTitle();
      }
    });
    return () => {
      subscription.remove();
      handleSaveTextAndTitle();
    };
  }, [handleSaveTextAndTitle]);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      handleSaveTextAndTitle();
    }, 2000);
    return () => clearTimeout(handler);
  }, [text, editableTitle, handleSaveTextAndTitle]);

  useLayoutEffect(() => {
    if (note) {
      navigation.setOptions({
        headerTitle: () => (
          <BaseTextInput
            value={editableTitle}
            onChangeText={setEditableTitle}
            viewStyleKit={{ color: { colorKey: CoreColorKey.Primary }, size: { sizeKey: SizeKey.LG }, roundKey: RoundKey.Lg }}
            style={{ textAlign: 'center', width: 200 }}
            placeholder="タイトル"
          />
        ),
        headerRight: () => (
          <TouchableOpacity onPress={() => setMenuVisible(true)} style={{ paddingHorizontal: 16 }}>
            <BaseText style={{ fontSize: 24, fontWeight: 'bold' }}>...</BaseText>
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, note, editableTitle]);

  // --- Render ---
if (!note) {
    return <BaseView style={styles.container}><BaseText>ノートが見つかりません。</BaseText></BaseView>;
  }

  return (
    <BaseView style={styles.container} styleKit={{color: {colorKey: CoreColorKey.Base}}}>
      
      {/* ★修正点: contentWrapperのpaddingTopを動的に設定 */}
      <View style={[styles.contentWrapper, { paddingTop: headerHeight }]}>
        <NoteEditor
          text={text}
          onChangeText={setText}
        />
      </View>

      {/* --- フローティングUI --- */}
      {/* ★修正点: onLayoutハンドラを渡す */}
      <View style={styles.settingWrapper} onLayout={handleHeaderLayout}>
        <LifecycleSetting
          note={note}
          onLifecycleChange={handleSaveLifecycle}
          isExpanded={isLifecycleExpanded}
          onToggleExpand={handleToggleExpand}
        />
      </View>

      {isLifecycleExpanded && (
        <Pressable style={styles.backdrop} onPress={handleToggleExpand} />
      )}

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
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
    // ★修正点: 固定値のpaddingTopを削除
  },
  settingWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 99,
  },
});