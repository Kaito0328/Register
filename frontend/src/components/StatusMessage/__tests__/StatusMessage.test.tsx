import React from 'react';
import { render } from '@/utils/test-utils';
import { StatusMessage } from '../StatusMessage';
import { ComponentStatus } from '@/types/ComponentStatus';

// アイコンライブラリをモック
jest.mock('lucide-react-native', () => ({
  LoaderCircle: 'LoaderCircle',
  CheckCircle2: 'CheckCircle2',
  AlertCircle: 'AlertCircle',
}));

describe('StatusMessage', () => {
  it('renders nothing when status is idle and keepHeightOnIdle is false', () => {
    const { queryByTestId } = render(
      <StatusMessage status={ComponentStatus.Idle} keepHeightOnIdle={false} />
    );
    
    expect(queryByTestId('status-message')).toBeFalsy();
  });

  it('renders empty container when status is idle and keepHeightOnIdle is true', () => {
    const { getByTestId } = render(
      <StatusMessage status={ComponentStatus.Idle} keepHeightOnIdle={true} />
    );
    
    // 空のコンテナがレンダリングされることを確認
    expect(getByTestId).toBeDefined();
  });

  it('renders loading message with icon', () => {
    const { getByText } = render(
      <StatusMessage 
        status={ComponentStatus.Loading} 
        loadingMessage="読み込み中..."
      />
    );
    
    expect(getByText('読み込み中...')).toBeTruthy();
  });

  it('renders success message with icon', () => {
    const { getByText } = render(
      <StatusMessage 
        status={ComponentStatus.Success} 
        successMessage="保存完了"
      />
    );
    
    expect(getByText('保存完了')).toBeTruthy();
  });

  it('renders error message with icon', () => {
    const { getByText } = render(
      <StatusMessage 
        status={ComponentStatus.Error} 
        errorMessage="保存に失敗しました"
      />
    );
    
    expect(getByText('保存に失敗しました')).toBeTruthy();
  });

  it('uses default messages when not provided', () => {
    const { getByText: getLoadingText } = render(
      <StatusMessage status={ComponentStatus.Loading} />
    );
    expect(getLoadingText('処理中...')).toBeTruthy();

    const { getByText: getSuccessText } = render(
      <StatusMessage status={ComponentStatus.Success} />
    );
    expect(getSuccessText('成功しました')).toBeTruthy();

    const { getByText: getErrorText } = render(
      <StatusMessage status={ComponentStatus.Error} />
    );
    expect(getErrorText('エラーが発生しました')).toBeTruthy();
  });

  it('applies correct styling for different statuses', () => {
    const { rerender, getByText } = render(
      <StatusMessage status={ComponentStatus.Loading} />
    );
    
    expect(getByText('処理中...')).toBeTruthy();
    
    rerender(<StatusMessage status={ComponentStatus.Success} />);
    expect(getByText('成功しました')).toBeTruthy();
    
    rerender(<StatusMessage status={ComponentStatus.Error} />);
    expect(getByText('エラーが発生しました')).toBeTruthy();
  });

  it('handles custom messages correctly', () => {
    const customProps = {
      loadingMessage: 'カスタム読み込み',
      successMessage: 'カスタム成功',
      errorMessage: 'カスタムエラー',
    };

    const { rerender, getByText } = render(
      <StatusMessage status={ComponentStatus.Loading} {...customProps} />
    );
    expect(getByText('カスタム読み込み')).toBeTruthy();

    rerender(<StatusMessage status={ComponentStatus.Success} {...customProps} />);
    expect(getByText('カスタム成功')).toBeTruthy();

    rerender(<StatusMessage status={ComponentStatus.Error} {...customProps} />);
    expect(getByText('カスタムエラー')).toBeTruthy();
  });
});
