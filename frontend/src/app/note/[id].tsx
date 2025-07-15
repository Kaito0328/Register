import React, { useState, useLayoutEffect, useEffect, useCallback, useRef } from 'react';
import { useNavigation, useLocalSearchParams, router } from 'expo-router';
import { AppState, TouchableOpacity, View, StyleSheet } from 'react-native';
import NoteEditor from '@/components/editor/NoteEditor';
import { BaseText } from '@/base/BaseText';
import { BaseView } from '@/base/BaseView';
import { useNotes } from '@/contexts/NotesContext';
import { BaseTextInput } from '@/base/BaseTextInput';
import { SizeKey } from '@/styles/tokens/size';
import { ColorViewProperty, RoundKey, ShadowKey } from '@/styles/tokens';
import { CoreColorKey } from '@/styles/tokens';
import { NoteActionSheet } from '@/components/KebabMenu/NoteActionSheet';
import { LifecycleSettingComponent } from '@/components/lifeCycleSettingHeader/LifeCycleSettingComponent';
import { NoteLifecycle, LifecycleUnit } from '@/types/Note';
import { ColorProperties } from 'react-native-reanimated/lib/typescript/Colors';

export default function NoteDetailScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { findNoteById, updateNote, deleteNote } = useNotes();
  
  const note = findNoteById(id);

  const [editableTitle, setEditableTitle] = useState(note?.title || '無題のメモ');
  const [text, setText] = useState(note?.text || '');
  // ★ ライフサイクルの状態を追加
  const [lifecycle, setLifecycle] = useState<NoteLifecycle>(
    note?.lifecycle || { unit: LifecycleUnit.Forever, value: null }
  );
  const [menuVisible, setMenuVisible] = useState(false);

  // クリーンアップ関数で最新の値を参照するためのref
  const latestState = useRef({ text, editableTitle });
  useEffect(() => {
    latestState.current = { text, editableTitle };
  }, [text, editableTitle]);

  // noteオブジェクトが変更されたら、各stateを更新する
  useEffect(() => {
    if (note) {
      setEditableTitle(note.title || '無題のメモ');
      setText(note.text || '');
      setLifecycle(note.lifecycle || { unit: LifecycleUnit.Forever, value: null });
    }
  }, [note]);

  // テキストとタイトルの保存処理
  const handleSaveTextAndTitle = useCallback(() => {
    if (!note) return;
    const { text: latestText, editableTitle: latestTitle } = latestState.current;
    if (latestText !== note.text || latestTitle !== note.title) {
      console.log('Saving text and title...');
      updateNote(note.id, { text: latestText, title: latestTitle });
    }
  }, [note, updateNote]);

  // ★ ライフサイクル専用の保存処理
  const handleSaveLifecycle = useCallback((newLifecycle: NoteLifecycle) => {
    if (!note) return;
    console.log('Saving lifecycle:', newLifecycle);
    updateNote(note.id, { lifecycle: newLifecycle });
    setLifecycle(newLifecycle); // ローカルのstateも更新
  }, [note, updateNote]);

  const handleDelete = () => {
    if (!note) return;
    deleteNote(note.id);
    router.back();
  };

  // アプリがバックグラウンドに移動した時や、画面から離れる時に保存
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState.match(/inactive|background/)) {
        handleSaveTextAndTitle();
      }
    });
    return () => {
      subscription.remove();
      handleSaveTextAndTitle(); // クリーンアップ時にも保存
    };
  }, [handleSaveTextAndTitle]);
  
  // デバウンスによる自動保存 (テキストとタイトル)
  useEffect(() => {
    const handler = setTimeout(() => {
        handleSaveTextAndTitle();
    }, 2000); // 2秒に延長
    return () => clearTimeout(handler);
  }, [text, editableTitle, handleSaveTextAndTitle]);

  useLayoutEffect(() => {
    if (note) {
      navigation.setOptions({
        headerTitle: () => (
          <BaseTextInput
            value={editableTitle}
            onChangeText={setEditableTitle}
            viewStyleKit={{
              color: { colorKey: CoreColorKey.Primary },
              size: { sizeKey: SizeKey.LG },
              roundKey: RoundKey.Lg,
            }}
            style={{ textAlign: 'center', width: 200 }} // 幅を指定してレイアウトを安定させる
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

  if (!note) {
    return (
      <BaseView style={styles.container}>
        <BaseText>ノートが見つかりません。</BaseText>
      </BaseView>
    );
  }

  return (
    <BaseView style={styles.container} styleKit={{color: {colorKey: CoreColorKey.Secondary}}}>
      {/* ★ ライフサイクル設定ヘッダーを常に表示 */}
      <LifecycleSettingComponent
        currentLifecycle={lifecycle}
        onSave={handleSaveLifecycle}
      />
      
      {/* ★ NoteEditorが残りの領域を埋めるようにする */}
      <View style={styles.editorWrapper}>
        <NoteEditor
          text={text}
          onChangeText={setText}
        />
      </View>

      <NoteActionSheet
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        note={note}
      />
    </BaseView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    editorWrapper: {
        flex: 1,
        width: '100%', // 幅を100%に設定
    }
});
