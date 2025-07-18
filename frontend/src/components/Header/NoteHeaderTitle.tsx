import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle, useRef } from 'react';
import { BaseTextInput } from '@/base/BaseTextInput';
import { CoreColorKey, RoundKey, SizeKey } from '@/styles/tokens';
import { useNotes } from '@/contexts/NotesContext';

type Props = {
  noteId: string;
  initialTitle: string;
};

export type NoteHeaderTitleHandle = {
  save: () => void;
};

export const NoteHeaderTitle = forwardRef<NoteHeaderTitleHandle, Props>(({ noteId, initialTitle }, ref) => {
  const { updateNote } = useNotes();
  const [title, setTitle] = useState(initialTitle);
  const debounceTimer = useRef<number | null>(null);

  // ★★★ 最新のpropsとstateを保持するためのref
  const latestData = useRef({ noteId, initialTitle, title, updateNote });
  useEffect(() => {
    latestData.current = { noteId, initialTitle, title, updateNote };
  });

  const handleSave = useCallback(() => {
    // ★★★ 実行される瞬間の最新の値をrefから取得
    const { noteId, initialTitle, title, updateNote } = latestData.current;
    if (title !== initialTitle) {
      updateNote(noteId, { title });
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
  }, [title, handleSave]);

  useEffect(() => {
    setTitle(initialTitle);
  }, [initialTitle]);

  return (
    <BaseTextInput
      value={title}
      onChangeText={setTitle}
      viewStyleKit={{ color: { colorKey: CoreColorKey.Primary }, size: { sizeKey: SizeKey.LG }, roundKey: RoundKey.None }}
      style={{ textAlign: 'center', width: 200 }}
      placeholder="タイトル"
    />
  );
});