// NoteDetailScreen.tsx

import React, { useState, useLayoutEffect, useEffect } from 'react';
import { Stack, useLocalSearchParams, useNavigation } from 'expo-router';
import { TextInput } from 'react-native'; // TextInputをインポート
import NoteEditor from '@/components/editor/NoteEditor';
import { BaseText } from '@/components/base/BaseText';
import { BaseView } from '@/components/base/BaseView';
import { useNotes } from '@/contexts/NotesContext';
import { BaseTextInput } from '@/components/base/BaseTextInput';
import { SizeKey } from '@/style/size';
import { RoundKey } from '@/style/rounded';
import { CoreColorKey } from '@/style/color';

export default function NoteDetailScreen() {
  const navigation = useNavigation(); // navigationオブジェクトを取得
  const { id } = useLocalSearchParams<{ id: string }>();
  const { findNoteById, updateNote, updateNoteTitle } = useNotes();

  const note = findNoteById(id);

  // ★ 1. 編集用のタイトルをローカルstateで管理
  const [editableTitle, setEditableTitle] = useState(note?.title || '無題のメモ');

  useEffect(() => {
    // noteが更新されたときにeditableTitleを更新
    if (note) {
      setEditableTitle(note.title || '無題のメモ');
    }
  }, [note]);

  // ★ 2. ヘッダーを動的に設定
  useLayoutEffect(() => {
    if (note) {
      navigation.setOptions({
        // ★ 3. headerTitleにTextInputコンポーネントを返す関数をセット
        headerTitle: () => (
          <BaseTextInput
            value={editableTitle}
            onChangeText={setEditableTitle}
            styleKit={{
              color: { colorKey: CoreColorKey.Primary},
              size: { sizeKey:  SizeKey.LG },
              roundKey: RoundKey.Lg,
            }}
            style={{textAlign: 'center'}}
            
            placeholder="タイトル"
            // ★ 4. フォーカスが外れたら保存
            onBlur={() => {
              if (note.title !== editableTitle) {
                updateNoteTitle(note.id, editableTitle);
              }
            }}
          />
        ),
      });
    }
  }, [navigation, note, editableTitle, updateNote]); // 依存配列にstateや関数を追加


  if (!note) {
    return (
      <BaseView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <BaseText>ノートが見つかりません。</BaseText>
      </BaseView>
    );
  }

  return (
    // NoteEditorに渡すonSaveを更新されたものに変更
    <NoteEditor
      note={note}
      onSave={(noteId, text) => updateNote(noteId, text)}
    />
  );
}