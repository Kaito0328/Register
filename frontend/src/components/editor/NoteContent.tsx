import React, { useState, useEffect, useCallback, useRef, forwardRef, useImperativeHandle } from 'react';
import { useNotes } from '@/contexts/NotesContext';
import NoteEditor from './NoteEditor';
import { StyleSheet, View } from 'react-native';
import { CreationDateDisplay } from './CreationDateDisplay';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CharacterCount } from './CharacterCount';

type Props = {
  noteId: string;
  createdAt: number;
  initialText: string;
};

export type NoteContentHandle = {
  save: () => void;
  getText: () => string;
};

export const NoteContent = forwardRef<NoteContentHandle, Props>(({ noteId, createdAt, initialText }, ref) => {
  const { updateNote } = useNotes();
  const [text, setText] = useState(initialText);
  const debounceTimer = useRef<number | null>(null);
  const insets = useSafeAreaInsets();

  // ★★★ 最新のpropsとstateを保持するためのref
  const latestData = useRef({ noteId, initialText, text, updateNote });
  useEffect(() => {
    latestData.current = { noteId, initialText, text, updateNote };
  });

  const handleSave = useCallback(() => {
    // ★★★ 実行される瞬間の最新の値をrefから取得
    const { noteId, initialText, text, updateNote } = latestData.current;
    console.log('Saving note content:', noteId, text); // デバッグ用ログ
    if (text !== initialText) { 
      console.log('Saving note content: text is not initialText', noteId, text); // デバッグ用ログ
      updateNote(noteId, { text });
    }
  }, []); // ★★★ 依存配列を空にして関数を安定させる

  useImperativeHandle(ref, () => ({
    save: () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      handleSave();
    },
    getText: () => {
      return latestData.current.text;
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
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <NoteEditor
        text={text}
        onChangeText={setText}
      />
      <View style={[styles.footer]}>
        <CreationDateDisplay createdAt={createdAt} />
        <CharacterCount text={text} />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1, // 親要素いっぱいに広がる
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});