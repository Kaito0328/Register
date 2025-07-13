import React, { useState, useLayoutEffect, useEffect, useCallback, useRef } from 'react';
import { useNavigation, useLocalSearchParams, router } from 'expo-router';
import { AppState, TextInput, TouchableOpacity } from 'react-native';
import NoteEditor from '@/components/editor/NoteEditor';
import { BaseText } from '@/components/base/BaseText';
import { BaseView } from '@/components/base/BaseView';
import { useNotes } from '@/contexts/NotesContext';
import { BaseTextInput } from '@/components/base/BaseTextInput';
import { SizeKey } from '@/style/size';
import { RoundKey } from '@/style/rounded';
import { CoreColorKey } from '@/style/color';
import { ThreeDotMenu } from '@/components/KebabMenu/ThreeDotMenu';
import { NoteActionSheet } from '@/components/KebabMenu/NoteActionSheet';

export default function NoteDetailScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { findNoteById, updateNote, deleteNote } = useNotes();
  const [menuVisible, setMenuVisible] = useState(false);

  const note = findNoteById(id);

  const [editableTitle, setEditableTitle] = useState(note?.title || '無題のメモ');
  const [text, setText] = useState(note?.text || '');

  const latestState = useRef({ text, editableTitle });

  useEffect(() => {
    latestState.current = { text, editableTitle };
  }, [text, editableTitle]);

  useEffect(() => {
    if (note) {
      setEditableTitle(note.title || '無題のメモ');
      setText(note.text || '');
    }
  }, [note]);

  const handleSave = useCallback(() => {
    if (!note) return;
    const { text: latestText, editableTitle: latestTitle } = latestState.current;
    if (latestText !== note.text || latestTitle !== note.title) {
      console.log('Saving note on unmount/background.');
      updateNote(note.id, { text: latestText, title: latestTitle });
    }
  }, [note, updateNote]);

  const handleDelete = () => {
    if (!note) return;
    deleteNote(note.id);
    router.back();
  };

  // アプリがバックグラウンドに移動した時に保存
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState.match(/inactive|background/)) {
        handleSave();
      }
    });
    return () => subscription.remove();
  }, [handleSave]);

  // ★★★ ここを修正: 画面がアンマウントされる時に保存する ★★★
  useEffect(() => {
    // useEffectから返されるこの関数（クリーンアップ関数）は、
    // コンポーネントが破棄される（画面遷移などで不要になる）直前に一度だけ実行されます。
    return () => {
      handleSave();
    };
  }, [handleSave]); // handleSaveを依存配列に追加
  
  // デバウンスによる自動保存
  useEffect(() => {
    const handler = setTimeout(handleSave, 3000);
    return () => clearTimeout(handler);
  }, [text, editableTitle, handleSave]);


  useLayoutEffect(() => {
    if (note) {
      navigation.setOptions({
        headerTitle: () => (
          <BaseTextInput
            value={editableTitle}
            onChangeText={setEditableTitle}
            styleKit={{
              color: { colorKey: CoreColorKey.Primary },
              size: { sizeKey: SizeKey.LG },
              roundKey: RoundKey.Lg,
            }}
            style={{ textAlign: 'center' }}
            placeholder="タイトル"
            onBlur={handleSave}
          />
        ),
                headerRight: () => (
          <TouchableOpacity onPress={() => setMenuVisible(true)} style={{ paddingHorizontal: 16 }}>
            <BaseText style={{ fontSize: 24, fontWeight: 'bold' }}>...</BaseText>
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, note, editableTitle, handleSave]);


  if (!note) {
    return (
      <BaseView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <BaseText>ノートが見つかりません。</BaseText>
      </BaseView>
    );
  }

  return (
    <>
        <NoteEditor
      text={text}
      onChangeText={setText}
      onDelete={handleDelete}
    />
          <NoteActionSheet
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        note={note}
      />

    </>

  );
}
