import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import NoteEditor from '@/components/editor/NoteEditor';
import { BaseText } from '@/components/base/BaseText';
import { BaseView } from '@/components/base/BaseView';
import { useNotes } from '@/contexts/NotesContext';

export default function NoteDetailScreen() {
  // URLからノートのIDを取得
  const { id } = useLocalSearchParams<{ id: string }>();
  const { findNoteById, updateNote } = useNotes();

  const note = findNoteById(id);
  console.log("notes:", useNotes().notes);
  console.log('NoteDetailScreen: id', id);
  console.log('NoteDetailScreen: note', note);

  if (!note) {
    return (
      <BaseView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <BaseText>ノートが見つかりません。</BaseText>
      </BaseView>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: note.title || '無題のメモ' }} />
      <NoteEditor note={note} onSave={updateNote} />
    </>
  );
}