// components/Header/NoteHeaderTitle.tsx

import React, { useState, useEffect, useCallback, forwardRef, useImperativeHandle } from 'react';
import { BaseTextInput } from '@/base/BaseTextInput';
import { CoreColorKey, RoundKey, SizeKey } from '@/styles/tokens';
import { useNotes } from '@/contexts/NotesContext';

type Props = {
  noteId: string;
  initialTitle: string;
};

// ★★★ 親から命令を受け取るためのハンドルの型を定義
export type NoteHeaderTitleHandle = {
  save: () => void;
};

// ★★★ forwardRefでコンポーネントをラップ
export const NoteHeaderTitle = forwardRef<NoteHeaderTitleHandle, Props>(({ noteId, initialTitle }, ref) => {
  const { updateNote } = useNotes();
  const [title, setTitle] = useState(initialTitle);

  // ★★★ タイトルを保存するロジック
  const handleSave = useCallback(() => {
    // 初期値と異なれば更新
    if (title !== initialTitle) {
      updateNote(noteId, { title });
    }
  }, [noteId, title, initialTitle, updateNote]);

  // ★★★ 親に 'save' という名前で handleSave 関数を公開する
  useImperativeHandle(ref, () => ({
    save: handleSave,
  }));

  // 2秒間のデバウンスによる自動保存
  useEffect(() => {
    const handler = setTimeout(() => {
      handleSave();
    }, 2000);
    return () => clearTimeout(handler);
  }, [title, handleSave]);
  
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