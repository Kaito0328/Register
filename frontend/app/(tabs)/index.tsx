import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { useNotes } from '@/hooks/useNotes';
import NoteEditor from '@/components/editor/NoteEditor';

// 新しいメモを作成し、その編集画面に遷移するだけのランディングページ
export default function NewNoteScreen() {
  const { createNote } = useNotes();

  useEffect(() => {
    // この画面が開かれたらすぐに新しいノートを作成
    const newNote = createNote('');
    // 作成したノートの編集画面に遷移する
    router.replace(`/note/${newNote.id}`);
  }, [createNote]);

  // ユーザーには何も表示されない
  return null;
}