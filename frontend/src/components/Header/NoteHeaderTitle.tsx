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
  save: () => void;
};

// ★★★ forwardRefでコンポーネントをラップ
export const NoteHeaderTitle = forwardRef<NoteHeaderTitleHandle, Props>(({ noteId, initialTitle }, ref) => {
  const { updateNote } = useNotes();
  const [title, setTitle] = useState(initialTitle);
  const debounceTimer = useRef<number | null>(null);

  // ★★★ タイトルを保存するロジック
  const handleSave = useCallback(() => {
    console.log('Saving title:', title); // デバッグ用ログ
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
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      console.log('Auto-saving title after 2 seconds:', title); // デバッグ用ログ
      handleSave();
    }, 2000);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [title, handleSave]);

  // ★★★ noteIdが変更された時にデバウンスタイマーをクリア
  useEffect(() => {
    // noteIdが変更された時は即座に前のタイマーをクリアし、新しいnoteIdでの処理に備える
    console.log('Note ID changed, clearing any pending save operations'); // デバッグ用ログ
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