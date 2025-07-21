import React from 'react';
import { Alert } from 'react-native';
import { render, fireEvent } from '@/utils/test-utils'; // 自作のテストユーティリティをインポート
import { NoteActionSheet } from '../NoteActionSheet';
import { SpecialLifeCycleUnit } from '@/types/Note';

// モックノートデータ
const mockNote = {
  id: '1',
  title: 'Test Note',
  text: 'Test content',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  isPinned: false,
  lifecycle: { unit: SpecialLifeCycleUnit.Forever, value: null },
  expiresAt: null,
};

describe('NoteActionSheet', () => {
  it('renders when visible is true', () => {
    const { getByText } = render(
      <NoteActionSheet
        visible={true}
        onClose={() => {}}
        onDelete={() => {}}
        note={mockNote}
      />
    );
    
    expect(getByText('削除')).toBeTruthy();
  });

  it('does not render when visible is false', () => {
    const { queryByText } = render(
      <NoteActionSheet
        visible={false}
        onClose={() => {}}
        onDelete={() => {}}
        note={mockNote}
      />
    );
    
    expect(queryByText('削除')).toBeFalsy();
  });

  it('calls onDelete when delete button is pressed', () => {
    const mockOnDelete = jest.fn();
    
    // Alert.alertをモック
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
      // "削除"ボタンを押したときの処理を実行
      if (buttons && buttons[1] && buttons[1].onPress) {
        buttons[1].onPress();
      }
    });
    
    const { getByText } = render(
      <NoteActionSheet
        visible={true}
        onClose={() => {}}
        onDelete={mockOnDelete}
        note={mockNote}
      />
    );
    
    fireEvent.press(getByText('削除'));
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    
    alertSpy.mockRestore();
  });

  it('calls onClose when close action is triggered', () => {
    const mockOnClose = jest.fn();
    const { getByText } = render(
      <NoteActionSheet
        visible={true}
        onClose={mockOnClose}
        onDelete={() => {}}
        note={mockNote}
      />
    );
    
    // キャンセルボタンをタップしてクローズ
    fireEvent.press(getByText('キャンセル'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('displays pin/unpin option', () => {
    const { getByText } = render(
      <NoteActionSheet
        visible={true}
        onClose={() => {}}
        onDelete={() => {}}
        note={mockNote}
      />
    );
    
    expect(getByText('ピン留めする')).toBeTruthy();
  });

  it('displays unpin option for pinned note', () => {
    const pinnedNote = { ...mockNote, isPinned: true };
    const { getByText } = render(
      <NoteActionSheet
        visible={true}
        onClose={() => {}}
        onDelete={() => {}}
        note={pinnedNote}
      />
    );
    
    expect(getByText('ピンを外す')).toBeTruthy();
  });
});
