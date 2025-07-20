import { useState, useCallback, useEffect, useMemo } from 'react';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Note, SpecialLifeCycleUnit, NoteLifecycle, TimeUnit } from '@/types/Note';
import { useSettings } from '@/contexts/SettingsContext';
import { calculateExpiresAt } from '@/utils/LifeCycleUtils';
import { INITIAL_NOTE_TEXT } from '@/assets/initialNote'; // 初期ノートのテキストをインポート


const NOTES_STORAGE_KEY = 'notes_storage';
const LAUNCH_STORAGE_KEY = 'app_launched_before'; // ★ 初回起動判定用のキー
const DEBUG_NOTE_ID = 'debug-note-auto-delete';



export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { settings } = useSettings();

  const cleanupExpiredNotes = useCallback(() => {
    const now = Date.now();
    setNotes(prevNotes => {
      const activeNotes = prevNotes.filter(note => {
        const isExpired = note.expiresAt !== null && note.expiresAt < now;
        return !isExpired;
      });
      if (activeNotes.length < prevNotes.length) {
        console.log(`[Cleanup] ${prevNotes.length - activeNotes.length}件の期限切れノートを削除しました。`);
      }
      return activeNotes;
    });
  }, []);

  // アプリ起動時の初期化処理
    useEffect(() => {
    const initializeApp = async () => {
      try {
        // 既存ノートの読み込み
        const storedNotes = await AsyncStorage.getItem(NOTES_STORAGE_KEY);
        let loadedNotes: Note[] = storedNotes ? JSON.parse(storedNotes) : [];

        // ★★★ 初回起動かどうかの判定と処理
        const hasLaunched = await AsyncStorage.getItem(LAUNCH_STORAGE_KEY);
        if (!hasLaunched) {
          console.log('[App] 初回起動です。チュートリアルノートを作成します。');
          const now = Date.now();
          const lifecycle: NoteLifecycle = { unit: SpecialLifeCycleUnit.Forever, value: null };
          const initialNote: Note = {
            id: `initial-note-${now}`,
            title: 'ようこそ！',
            text: INITIAL_NOTE_TEXT,
            createdAt: now,
            updatedAt: now,
            isPinned: true, // 最初はピン留めしておく
            lifecycle: lifecycle,
            expiresAt: calculateExpiresAt(lifecycle, now),
          };
          loadedNotes.unshift(initialNote);
          // 初回起動フラグを保存
          await AsyncStorage.setItem(LAUNCH_STORAGE_KEY, 'true');
        }

        // ★★★ ここからデバッグ用ノートのロジック ★★★
        const hasDebugNote = loadedNotes.some(note => note.id === DEBUG_NOTE_ID);
        if (!hasDebugNote) {
          console.log('[Debug] 1分後に切れるデバッグ用ノートを作成しました。');
          const now = Date.now();
          const expiresAt = now + 60 * 1000; // 60秒後
          const debugNote: Note = {
            id: DEBUG_NOTE_ID,
            title: 'デバッグ用ノート',
            text: 'このノートは1分後に自動で削除されます。',
            createdAt: now,
            updatedAt: now,
            isPinned: true, // 見つけやすいようにピン留めしておく
            lifecycle: { unit: TimeUnit.Hour, value: 1 }, // ライフサイクルを1分に設定
            expiresAt: expiresAt,
          };
          // 既存のノートリストの先頭に追加
          loadedNotes.unshift(debugNote);
        }
        // ★★★ ここまで ★★★

        // 期限切れノートのクリーンアップ
        const now = Date.now();
        const activeNotes = loadedNotes.filter(note => {
          const isExpired = note.expiresAt !== null && note.expiresAt < now;
          return !isExpired;
        });
        
        setNotes(activeNotes);

      } catch (e) {
        console.error('Failed to initialize app state.', e);
      } finally {
        setIsLoaded(true);
      }
    };
    initializeApp();
  }, []);



  // 定期的なクリーンアップなど（変更なし）
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        cleanupExpiredNotes();
      }
    });
    return () => { subscription.remove() };
  }, [cleanupExpiredNotes]);

  useEffect(() => {
    const interval = setInterval(() => {
      cleanupExpiredNotes();
    }, 30000);
    return () => clearInterval(interval);
  }, [cleanupExpiredNotes]);

  useEffect(() => {
    if (!isLoaded) return;
    const saveNotes = async () => {
      try {
        await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
      } catch (e) {
        console.error('Failed to save notes.', e);
      }
    };
    saveNotes();
  }, [notes, isLoaded]);


  // ★★★ 一番上のノートIDを取得する関数を追加
  const getTopNoteId = useCallback((): string | undefined => {
    if (notes.length === 0) {
      return undefined;
    }
    // スプレッド構文(...)かslice()で配列のコピーを作成してからソートする
    const sortedNotes = [...notes].sort((a, b) => {
      // 1. isPinnedでソート (trueが先)
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      // 2. isPinnedが同じなら、updatedAtでソート (降順)
      return b.updatedAt - a.updatedAt;
    });

    return sortedNotes[0].id;
  }, [notes]);


  const createNote = useCallback((text: string): Note => {
    const now = Date.now();
    const newNote: Note = {
      id: now.toString(),
      text,
      title: '',
      createdAt: now,
      updatedAt: now,
      isPinned: false,
      lifecycle: settings.defaultLifecycle,
      expiresAt: calculateExpiresAt(settings.defaultLifecycle, now),
    };
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  }, [settings]);

  const findNoteById = useCallback((id: string | undefined): Note | undefined => {
    if (!id) return undefined;
    return notes.find((note) => note.id === id);
  }, [notes]);

  const updateNote = useCallback((id: string, updates: Partial<Note>) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, ...updates, updatedAt: Date.now() } : note
      )
    );
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

  return useMemo(() => ({
    notes,
    createNote,
    findNoteById,
    updateNote,
    deleteNote,
    togglePin,
    getTopNoteId, // ★★★ 返り値に追加
    isLoaded,
  }), [notes, isLoaded, findNoteById, createNote, updateNote, deleteNote, togglePin, getTopNoteId]);
};
