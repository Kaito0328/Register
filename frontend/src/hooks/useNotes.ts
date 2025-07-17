import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ★ インポート
import { LifecycleUnit, NoteLifecycle, SpecialLifeCycleUnit, type Note } from '@/types/Note'; 


// ★ ストレージに保存するためのキーを定義
const STORAGE_KEY = 'notes';

export const useNotes = () => {
  // ★ 初期状態は空の配列にする
  const [notes, setNotes] = useState<Note[]>([]);

  const saveNotesToStorage = useCallback(async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      console.log('Notes saved successfully.', notes);
    } catch (e) {
      console.error('Failed to save notes.', e);
    }
  }, [notes]);

  useEffect(() => {
      if (notes.length > 0) {
        saveNotesToStorage();
      }
  }, [notes]);

  // ★ 1. アプリ起動時にデータを読み込む処理
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedNotes !== null) {
          setNotes(JSON.parse(storedNotes));
        }
      } catch (e) {
        console.error('Failed to load notes.', e);
      }
    };
    loadNotes();
  }, []); // 空の依存配列で、初回の一度だけ実行
  
  const createNote = useCallback((text: string): Note => {
    const now = Date.now();
    const newNote: Note = {
      id: now.toString(),
      text,
      title: '',
      createdAt: now,
      updatedAt: now,
      isPinned: false, // ★ 追加
      lifecycle: { unit: SpecialLifeCycleUnit.Forever, value: null },
      expiresAt: null, // ★ 追加
    };
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  }, []);

  const findNoteById = useCallback((id: string | undefined): Note | undefined => {
    if (!id) return undefined;
    return notes.find((note) => note.id === id);
  }, [notes]);

  const updateNote = useCallback((id: string, updateNote: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, ...updateNote, updatedAt: Date.now() } : note
      )
    );
    console.log('Note updated:', id, updateNote); // デバッグ用ログ
  }, []);

  // ★ ノートを削除する関数を追加
  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }, []);

    const togglePin = useCallback((id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, isPinned: !note.isPinned } : note
      )
    );
  }, []);

  return { notes, createNote, findNoteById, updateNote, deleteNote, togglePin};
};