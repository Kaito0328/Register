import { useState, useCallback, useEffect } from 'react';

export type Note = {
  id: string;
  text: string;
  title?: string;
  createdAt: number;
};

// ダミーデータ
const initialNotes: Note[] = [
  { id: '1', text: '駐輪場の番号はC-5', title: '駐輪場', createdAt: Date.now() },
  { id: '2', text: '明日買うものリスト\n・牛乳\n・卵', title: '買い物リスト', createdAt: Date.now() },
];

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>(initialNotes);

  const createNote = useCallback((text: string): Note => {
    const newNote: Note = {
      id: (notes.length + 1).toString() , // 簡易的なID生成
      text,
      createdAt: Date.now(),
    };
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  }, [notes]);

  useEffect(() => {
    console.log('Notes updated:', notes);
  }, [notes]);

  const findNoteById = useCallback((id: string | undefined): Note | undefined => {
    if (!id) return undefined;
    return notes.find((note) => note.id === id);
  }, [notes]);

  const updateNote = useCallback((id: string, text: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, text, title: note.title ?? text.split('\n')[0].slice(0, 20) } : note
      )
    );
  }, [notes]);

  const updateNoteTitle = useCallback((id: string, title: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, title } : note
      )
    );
  }, [notes]);  

  return { notes, createNote, findNoteById, updateNote, updateNoteTitle };
};