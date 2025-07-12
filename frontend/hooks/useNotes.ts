import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // ★ インポート

export type Note = {
  id: string;
  text: string;
  title?: string;
  createdAt: number;
};

// ★ ストレージに保存するためのキーを定義
const STORAGE_KEY = 'notes';

export const useNotes = () => {
  // ★ 初期状態は空の配列にする
  const [notes, setNotes] = useState<Note[]>([]);

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

  // ★ 2. notesのデータが変更されるたびに自動で保存する処理
  useEffect(() => {
    const saveNotes = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        console.log('Notes saved successfully.', notes);
      } catch (e) {
        console.error('Failed to save notes.', e);
      }
    };
    // 初回ロード時（notesが空の配列の時）に保存が走らないように条件分岐
    if (notes.length > 0) {
      saveNotes();
    }
  }, [notes]); // notesが変更されるたびに実行

  const createNote = useCallback((text: string): Note => {
    const newNote: Note = {
      // ID生成ロジックをより堅牢なものに変更
      id: Date.now().toString(),
      text,
      title: text.split('\n')[0].slice(0, 20) || '無題のメモ',
      createdAt: Date.now(),
    };
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  }, []);

  const findNoteById = useCallback((id: string | undefined): Note | undefined => {
    if (!id) return undefined;
    return notes.find((note) => note.id === id);
  }, [notes]);

  const updateNote = useCallback((id: string, text?: string, title?: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, text: text || note.text, title: title || note.title || text?.split('\n')[0].slice(0, 20) } : note
      )
    );
  }, []);

  // ★ ノートを削除する関数を追加
  const deleteNote = useCallback((id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }, []);

  return { notes, createNote, findNoteById, updateNote, deleteNote };
};