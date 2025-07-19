import { useState, useCallback, useEffect, useMemo } from 'react'; // ★ useMemoをインポート
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note, SpecialLifeCycleUnit } from '@/types/Note';

const STORAGE_KEY = 'notes';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // ★ 1. アプリ起動時にデータを読み込む
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const storedNotes = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedNotes !== null) {
          setNotes(JSON.parse(storedNotes));
        }
        setIsLoaded(true);
      } catch (e) {
        console.error('Failed to load notes.', e);
        setIsLoaded(true);
      }
    };
    loadNotes();
  }, []); // 初回の一度だけ実行

  // ★ 2. notesが変更されたらストレージに保存する（初回ロード後のみ）
  useEffect(() => {
    console.log('Notes changed, saving to storage:', notes.length, 'notes');
    if (!isLoaded) return; // 初回ロード完了まで保存処理をスキップ
    
    const saveNotes = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
        console.log('Notes saved to storage:', notes.length, 'notes');
      } catch (e) {
        console.error('Failed to save notes.', e);
      }
    };
    saveNotes();
  }, [notes, isLoaded]);

  const createNote = useCallback((text: string): Note => {
    const now = Date.now();
    const newNote: Note = {
      id: now.toString(),
      text,
      title: '',
      createdAt: now,
      updatedAt: now,
      isPinned: false,
      lifecycle: { unit: SpecialLifeCycleUnit.Forever, value: null },
      expiresAt: null,
    };
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  }, []);

  const findNoteById = useCallback((id: string | undefined): Note | undefined => {
    if (!id) return undefined;
    return notes.find((note) => note.id === id);
  }, [notes]);

  const updateNote = useCallback((id: string, updates: Partial<Note>) => {
    // console.log('updateNote called:', id, updates);
    setNotes((prev) => {
      const updated = prev.map((note) =>
        note.id === id ? { ...note, ...updates, updatedAt: Date.now() } : note
      );
      // console.log('Notes updated, count:', updated.length);
      return updated;
    });
  }, []);

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

  // ★★★ ここが最も重要 ★★★
  // useMemoを使って、valueオブジェクトの参照を安定させる
  return useMemo(() => ({
    notes,
    createNote,
    findNoteById,
    updateNote,
    deleteNote,
    togglePin,
    isLoaded,
  }), [notes, isLoaded, findNoteById, createNote, updateNote, deleteNote, togglePin]);
};