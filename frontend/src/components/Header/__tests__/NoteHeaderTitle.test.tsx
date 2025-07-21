import React from 'react';
import { render, fireEvent, act } from '@/utils/test-utils'; // 自作のテストユーティリティをインポート
import { NoteHeaderTitle } from '../NoteHeaderTitle';

// BaseTextInputのモック
jest.mock('@/base/BaseTextInput', () => {
  const React = require('react');
  const { TextInput } = require('react-native');
  return {
    BaseTextInput: React.forwardRef(({ value, onChangeText, placeholder, ...props }: any, ref: any) => (
      <TextInput
        ref={ref}
        testID="base-text-input"
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        {...props}
      />
    )),
  };
});

describe('NoteHeaderTitle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders with initial title', () => {
    const mockOnTitleChange = jest.fn();
    const { getByDisplayValue } = render(
      <NoteHeaderTitle initialTitle="Test Title" onTitleChange={mockOnTitleChange} />
    );
    
    expect(getByDisplayValue('Test Title')).toBeTruthy();
  });

  it('displays placeholder when no title', () => {
    const mockOnTitleChange = jest.fn();
    const { getByPlaceholderText } = render(
      <NoteHeaderTitle initialTitle="" onTitleChange={mockOnTitleChange} />
    );
    
    expect(getByPlaceholderText('タイトル')).toBeTruthy();
  });

  it('updates local state when user types', () => {
    const mockOnTitleChange = jest.fn();
    const { getByTestId } = render(
      <NoteHeaderTitle initialTitle="Initial" onTitleChange={mockOnTitleChange} />
    );
    
    const input = getByTestId('base-text-input');
    fireEvent.changeText(input, 'Updated Title');
    
    expect(input.props.value).toBe('Updated Title');
  });

  it('calls onTitleChange after debounce delay', () => {
    const mockOnTitleChange = jest.fn();
    const { getByTestId } = render(
      <NoteHeaderTitle initialTitle="Initial" onTitleChange={mockOnTitleChange} />
    );
    
    const input = getByTestId('base-text-input');
    fireEvent.changeText(input, 'Debounced Title');
    
    // 500ms待機（デバウンス期間）
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    expect(mockOnTitleChange).toHaveBeenCalledWith('Debounced Title');
  });

  it('cancels previous timer when text changes quickly', () => {
    const mockOnTitleChange = jest.fn();
    const { getByTestId } = render(
      <NoteHeaderTitle initialTitle="Initial" onTitleChange={mockOnTitleChange} />
    );
    
    const input = getByTestId('base-text-input');
    
    // 最初の変更
    fireEvent.changeText(input, 'First Change');
    
    // 200ms後に次の変更
    act(() => {
      jest.advanceTimersByTime(200);
    });
    fireEvent.changeText(input, 'Second Change');
    
    // さらに500ms待機
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    // 最後の変更のみが呼び出される
    expect(mockOnTitleChange).toHaveBeenCalledTimes(1);
    expect(mockOnTitleChange).toHaveBeenCalledWith('Second Change');
  });

  it('updates when initialTitle prop changes', () => {
    const mockOnTitleChange = jest.fn();
    const { getByTestId, rerender } = render(
      <NoteHeaderTitle initialTitle="Original Title" onTitleChange={mockOnTitleChange} />
    );
    
    const input = getByTestId('base-text-input');
    expect(input.props.value).toBe('Original Title');
    
    // propsを変更
    rerender(
      <NoteHeaderTitle initialTitle="New Title" onTitleChange={mockOnTitleChange} />
    );
    
    expect(input.props.value).toBe('New Title');
  });

  it('calls onTitleChange even if title has not changed (due to debounce)', () => {
    const mockOnTitleChange = jest.fn();
    const { getByTestId } = render(
      <NoteHeaderTitle initialTitle="Same Title" onTitleChange={mockOnTitleChange} />
    );
    
    const input = getByTestId('base-text-input');
    fireEvent.changeText(input, 'Same Title'); // 同じタイトルに変更
    
    act(() => {
      jest.advanceTimersByTime(500);
    });
    
    // デバウンス機能により、同じタイトルでもonTitleChangeが呼ばれる
    expect(mockOnTitleChange).toHaveBeenCalledWith('Same Title');
  });
});
