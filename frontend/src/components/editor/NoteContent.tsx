// components/editor/NoteContent.tsx

import React, { useState, useEffect, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';
import { useNotes } from '@/contexts/NotesContext';
import NoteEditor from './NoteEditor';

type Props = {
  noteId: string;
  initialText: string;
};

// ★★★ 親から命令を受け取るためのハンドルの型を定義
export type NoteContentHandle = {
  save: () => void;
};

// ★★★ forwardRefでラップ
export const NoteContent = forwardRef<NoteContentHandle, Props>(({ noteId, initialText }, ref) => {
  const { updateNote } = useNotes();
  const [text, setText] = useState(initialText);
  const debounceTimer = useRef<number | null>(null);

  // ★★★ 即時保存用の関数
  const handleSave = useCallback(() => {
    if (text !== initialText) {
      updateNote(noteId, { text });
    }
  }, [noteId, text, initialText, updateNote]);

  // ★★★ 親に'save'メソッドを公開
  useImperativeHandle(ref, () => ({
    save: () => {
      // 進行中のタイマーをキャンセルして即時保存
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
      handleSave();
    },
  }));

  // 2秒間のデバウンスによる自動保存
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      handleSave();
    }, 2000);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [text, handleSave]);
  
  // note.textが外部から変更された場合に同期する
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