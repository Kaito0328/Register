import React from 'react';
import { render, waitFor } from '@/utils/test-utils';
import IndexScreen from '../index';
import { router, useFocusEffect } from 'expo-router';
import { useNotes } from '@/contexts/NotesContext';
import { Note, TimeUnit } from '@/types/Note';

// Mock expo-router
jest.mock('expo-router', () => ({
  ...jest.requireActual('expo-router'),
  router: {
    replace: jest.fn(),
  },
  useFocusEffect: jest.fn(),
}));

// Mock NotesContext
jest.mock('@/contexts/NotesContext', () => ({
  useNotes: jest.fn(),
}));

const mockRouter = router as jest.Mocked<typeof router>;
const mockUseFocusEffect = useFocusEffect as jest.MockedFunction<typeof useFocusEffect>;
const mockUseNotes = useNotes as jest.MockedFunction<typeof useNotes>;

// Mock Note data
const createMockNote = (id: string, title: string): Note => ({
  id,
  title,
  text: 'Mock content',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  isPinned: false,
  lifecycle: { unit: TimeUnit.Day, value: 7 },
  expiresAt: null,
});

describe('IndexScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // デフォルトでuseFocusEffectのコールバックを実行
    mockUseFocusEffect.mockImplementation((callback) => {
      if (typeof callback === 'function') {
        callback();
      }
    });
  });

  it('renders loading indicator', () => {
    mockUseNotes.mockReturnValue({
      notes: [],
      createNote: jest.fn(),
      findNoteById: jest.fn(),
      updateNote: jest.fn(),
      deleteNote: jest.fn(),
      togglePin: jest.fn(),
      getTopNoteId: jest.fn(),
      isLoaded: false, // データが読み込まれていない状態
    });

    const { getByTestId } = render(<IndexScreen />);
    
    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('redirects to top note when notes exist', async () => {
    const mockNotes = [
      createMockNote('note1', 'First Note'),
      createMockNote('note2', 'Second Note'),
    ];

    mockUseNotes.mockReturnValue({
      notes: mockNotes,
      createNote: jest.fn(),
      findNoteById: jest.fn(),
      updateNote: jest.fn(),
      deleteNote: jest.fn(),
      togglePin: jest.fn(),
      getTopNoteId: jest.fn(() => 'note1'),
      isLoaded: true,
    });

    render(<IndexScreen />);
    
    // useFocusEffectで設定されたコールバックが呼ばれ、リダイレクトが実行される
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/note/note1');
    });
  });

  it('redirects to empty screen when no notes exist', async () => {
    mockUseNotes.mockReturnValue({
      notes: [],
      createNote: jest.fn(),
      findNoteById: jest.fn(),
      updateNote: jest.fn(),
      deleteNote: jest.fn(),
      togglePin: jest.fn(),
      getTopNoteId: jest.fn(() => undefined),
      isLoaded: true,
    });

    render(<IndexScreen />);
    
    await waitFor(() => {
      expect(mockRouter.replace).toHaveBeenCalledWith('/empty');
    });
  });

  it('does not redirect when data is not loaded', () => {
    mockUseNotes.mockReturnValue({
      notes: [],
      createNote: jest.fn(),
      findNoteById: jest.fn(),
      updateNote: jest.fn(),
      deleteNote: jest.fn(),
      togglePin: jest.fn(),
      getTopNoteId: jest.fn(),
      isLoaded: false, // データが読み込まれていない状態
    });

    render(<IndexScreen />);
    
    // データが読み込まれていない場合はリダイレクトしない
    expect(mockRouter.replace).not.toHaveBeenCalled();
  });
});
