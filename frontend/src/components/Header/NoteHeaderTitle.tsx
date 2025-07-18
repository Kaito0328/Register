// components/Header/NoteHeaderTitle.tsx

import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle, useRef } from 'react';
import { BaseTextInput } from '@/base/BaseTextInput';
import { CoreColorKey, RoundKey, SizeKey } from '@/styles/tokens';
import { useNotes } from '@/contexts/NotesContext';

type Props = {
  noteId: string;
  initialTitle: string;
};

// ★★★ 親から命令を受け取るためのハンドルの型を定義
export type NoteHeaderTitleHandle = {
  save: (currentText?: string) => void;
};

// ★★★ forwardRefでコンポーネントをラップ
export const NoteHeaderTitle = forwardRef<NoteHeaderTitleHandle, Props>(({ noteId, initialTitle }, ref) => {
  const { updateNote } = useNotes();
  const [title, setTitle] = useState(initialTitle);
  const debounceTimer = useRef<number | null>(null);

  const latestData = useRef({ noteId, initialTitle, title, updateNote });
  useEffect(() => {
    latestData.current = { noteId, initialTitle, title, updateNote };
  });

  const handleFinalSave = useCallback((currentText?: string) => {
    const { noteId, initialTitle, title, updateNote } = latestData.current;
    let finalTitle = title;

    // タイトルが空の場合、渡された本文からタイトルを生成
    if (finalTitle.trim() === '') {
      finalTitle = currentText?.trim().substring(0, 20) || '無題のメモ';
    }

    // 最終的なタイトルで保存を実行
    if (finalTitle !== initialTitle) {
      updateNote(noteId, { title: finalTitle });
    }
  }, []);

    const handleSave = useCallback(() => {
    const { noteId, initialTitle, title, updateNote } = latestData.current;
    if (title.trim() !== initialTitle) {
      updateNote(noteId, { title });
    }
  }, []);

  // ★★★ 親に 'save' という名前で handleSave 関数を公開する
  useImperativeHandle(ref, () => ({
    save: handleFinalSave,
    getTitle: () => { return latestData.current.title; },
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
  }, [title, handleSave]);

  // ★★★ noteIdが変更された時にデバウンスタイマーをクリア
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
        debounceTimer.current = null;
      }
    };
  }, [noteId]);
  
  // note.titleが外部から変更された場合に同期する
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