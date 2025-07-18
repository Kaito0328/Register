import React, { useState, useEffect, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';
import { useNotes } from '@/contexts/NotesContext';
import NoteEditor from './NoteEditor';

type Props = {
  noteId: string;
  initialText: string;
};

export type NoteContentHandle = {
  save: () => void;
};

export const NoteContent = forwardRef<NoteContentHandle, Props>(({ noteId, initialText }, ref) => {
  const { updateNote } = useNotes();
  const [text, setText] = useState(initialText);
  const debounceTimer = useRef<number | null>(null);

  // ★★★ 最新のpropsとstateを保持するためのref
  const latestData = useRef({ noteId, initialText, text, updateNote });
  useEffect(() => {
    latestData.current = { noteId, initialText, text, updateNote };
  });

  const handleSave = useCallback(() => {
    // ★★★ 実行される瞬間の最新の値をrefから取得
    const { noteId, initialText, text, updateNote } = latestData.current;
    if (text !== initialText) {
      console.log('Saving note content:', noteId, text); // デバッグ用ログ
      updateNote(noteId, { text });
    }
  }, []); // ★★★ 依存配列を空にして関数を安定させる

  useImperativeHandle(ref, () => ({
    save: () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      handleSave();
    },
  }));

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      handleSave();
    }, 2000);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [text, handleSave]);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  return (
    <NoteEditor
      text={text}
      onChangeText={setText}
    />
  );
});