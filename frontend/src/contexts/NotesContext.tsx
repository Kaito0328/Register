import React, { createContext, useContext } from 'react';
import { useNotes as useNotesHook} from '@/hooks/useNotes';
import { Note } from '@/types/Note';

// Contextに渡す値の型を定義
type NotesContextType = {
  notes: Note[];
  createNote: (text: string) => Note;
  findNoteById: (id: string | undefined) => Note | undefined;
  updateNote: (id: string, updateNote: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  togglePin: (id: string) => void;
  isLoaded: boolean;
};

// Contextを作成。初期値はundefinedでOK
const NotesContext = createContext<NotesContextType | undefined>(undefined);

// アプリケーションをラップするProviderコンポーネントを作成
export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const notesData = useNotesHook(); // useNotesのロジックはそのまま再利用
  return (
    <NotesContext.Provider value={notesData}>
      {children}
    </NotesContext.Provider>
  );
};

// 他のコンポーネントから簡単にContextを呼び出すためのカスタムフック
export const useNotes = (): NotesContextType => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};