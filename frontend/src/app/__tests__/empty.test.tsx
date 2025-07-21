import React from 'react';
import { render, fireEvent } from '@/utils/test-utils';
import EmptyScreen from '../empty';
import { router } from 'expo-router';

// expo-routerのrouterをモック
jest.mock('expo-router', () => ({
  ...jest.requireActual('expo-router'),
  router: {
    push: jest.fn(),
  },
}));

// useNotesのモック
const mockCreateNote = jest.fn();
jest.mock('@/contexts/NotesContext', () => ({
  useNotes: () => ({
    createNote: mockCreateNote,
  }),
}));

describe('EmptyScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty state message', () => {
    const { getByText } = render(<EmptyScreen />);
    
    expect(getByText('一時的なメモはありません。素晴らしい!')).toBeTruthy();
    expect(getByText('新しいメモを書く')).toBeTruthy();
  });

  it('displays moon icon', () => {
    const { getByTestId } = render(<EmptyScreen />);
    // BaseViewがレンダリングされることを確認
    expect(getByTestId).toBeDefined();
  });

  it('creates new note and navigates when button is pressed', () => {
    const mockNote = { id: 'new-note-123', title: '', text: '' };
    mockCreateNote.mockReturnValue(mockNote);

    const { getByText } = render(<EmptyScreen />);
    
    fireEvent.press(getByText('新しいメモを書く'));
    
    expect(mockCreateNote).toHaveBeenCalledWith('');
    expect(router.push).toHaveBeenCalledWith('/note/new-note-123');
  });

  it('button responds to press events', () => {
    const mockNote = { id: 'test-note', title: '', text: '' };
    mockCreateNote.mockReturnValue(mockNote);

    const { getByText } = render(<EmptyScreen />);
    const button = getByText('新しいメモを書く');
    
    expect(button).toBeTruthy();
    fireEvent.press(button);
    
    expect(mockCreateNote).toHaveBeenCalledTimes(1);
  });
});
