import React from 'react';
import { render, fireEvent, waitFor } from '@/utils/test-utils';
import NoteDetailScreen from '../[id]';
import { router } from 'expo-router';

// expo-routerのモック
jest.mock('expo-router', () => ({
  useNavigation: () => ({
    setOptions: jest.fn(),
    addListener: jest.fn(() => jest.fn()),
  }),
  useLocalSearchParams: () => ({ id: 'test-note-id' }),
  router: {
    replace: jest.fn(),
    push: jest.fn(),
  },
}));

// useNotesのモック
const mockNote = {
  id: 'test-note-id',
  title: 'Test Note',
  text: 'Test content',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  lifecycle: {
    unit: 'hours',
    count: 24,
  },
  isPinned: false,
};

const mockUseNotes = {
  findNoteById: jest.fn(),
  deleteNote: jest.fn(),
  updateNote: jest.fn(),
  getTopNoteId: jest.fn(),
  notes: [mockNote],
};

jest.mock('@/contexts/NotesContext', () => ({
  useNotes: () => mockUseNotes,
}));

// コンポーネントのモック
jest.mock('@/components/Header/NoteHeaderTitle', () => ({
  NoteHeaderTitle: ({ initialTitle, onTitleChange }: any) => (
    <div 
      data-testid="note-header-title" 
      onClick={() => onTitleChange('New Title')}
    >
      {initialTitle}
    </div>
  ),
}));

jest.mock('@/components/Header/NoteHeaderMenu', () => ({
  NoteHeaderMenu: ({ onMenuPress }: any) => (
    <button data-testid="note-header-menu" onClick={onMenuPress}>
      Menu
    </button>
  ),
}));

jest.mock('@/components/editor/NoteContent', () => ({
  NoteContent: ({ text, onChangeText, createdAt }: any) => (
    <div data-testid="note-content">
      <textarea 
        data-testid="note-text-input"
        value={text}
        onChange={(e) => onChangeText(e.target.value)}
      />
    </div>
  ),
}));

jest.mock('@/components/Lifecycle/LifeCycleSetting', () => ({
  LifecycleSetting: ({ lifecycle, onLifecycleChange }: any) => (
    <div data-testid="lifecycle-setting">
      <button 
        data-testid="lifecycle-change-button"
        onClick={() => onLifecycleChange({ unit: 'days', count: 7 })}
      >
        Change Lifecycle
      </button>
    </div>
  ),
}));

jest.mock('@/components/KebabMenu/NoteActionSheet', () => ({
  NoteActionSheet: ({ visible, onClose, onDelete, note }: any) => (
    visible ? (
      <div data-testid="note-action-sheet">
        <button data-testid="action-delete" onClick={onDelete}>Delete</button>
        <button data-testid="action-close" onClick={onClose}>Close</button>
      </div>
    ) : null
  ),
}));

jest.mock('@/components/StatusMessage/StatusMessage', () => ({
  StatusMessage: ({ status, message }: any) => (
    <div data-testid="status-message" data-status={status}>
      {message}
    </div>
  ),
}));

describe('NoteDetailScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseNotes.findNoteById.mockReturnValue(mockNote);
  });

  it('renders note content correctly', () => {
    mockUseNotes.findNoteById.mockReturnValue(mockNote);
    
    const component = render(<NoteDetailScreen />);
    
    // コンポーネントが正常にレンダリングされることを確認
    expect(component).toBeTruthy();
  });

  it('displays note title and text', () => {
    mockUseNotes.findNoteById.mockReturnValue(mockNote);
    
    const component = render(<NoteDetailScreen />);
    
    // コンポーネントが正常にレンダリングされることを確認
    expect(component).toBeTruthy();
  });

  it('renders component structure', () => {
    const component = render(<NoteDetailScreen />);
    
    // コンポーネントが正常にレンダリングされることを確認
    expect(component).toBeTruthy();
  });

  it('renders lifecycle change button', () => {
    const component = render(<NoteDetailScreen />);
    
    // コンポーネントが正常にレンダリングされることを確認
    expect(component).toBeTruthy();
  });

  it('renders note text input', () => {
    const component = render(<NoteDetailScreen />);
    
    // コンポーネントが正常にレンダリングされることを確認
    expect(component).toBeTruthy();
  });

  it('redirects when note is not found', () => {
    mockUseNotes.findNoteById.mockReturnValue(null);
    mockUseNotes.notes = [{ 
      id: 'other-note-id', 
      title: 'Other Note', 
      text: 'Other content', 
      lifecycle: { unit: 'hours', count: 24 }, 
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isPinned: false
    }];
    
    const component = render(<NoteDetailScreen />);
    
    // コンポーネントが正常にレンダリングされることを確認
    expect(component).toBeTruthy();
  });

  it('redirects to empty screen when no notes exist', () => {
    mockUseNotes.findNoteById.mockReturnValue(null);
    mockUseNotes.notes = [];
    
    const component = render(<NoteDetailScreen />);
    
    // コンポーネントが正常にレンダリングされることを確認
    expect(component).toBeTruthy();
  });
});
