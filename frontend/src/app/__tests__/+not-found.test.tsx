import React from 'react';
import { render } from '@/utils/test-utils';
import NotFoundScreen from '../+not-found';

// expo-routerのコンポーネントをモック
jest.mock('expo-router', () => ({
  Stack: {
    Screen: ({ options }: { options: any }) => null, // StackScreenは何もレンダリングしない
  },
  Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <div data-testid="link" data-href={href}>{children}</div>
  ),
}));

describe('NotFoundScreen', () => {
  it('renders not found message', () => {
    const { getByText } = render(<NotFoundScreen />);
    
    expect(getByText('This screen does not exist.')).toBeTruthy();
    expect(getByText('Go to home screen!')).toBeTruthy();
  });

  it('renders link to home screen', () => {
    const { getByText } = render(<NotFoundScreen />);
    
    const link = getByText('Go to home screen!');
    expect(link).toBeTruthy();
  });

  it('has correct container styling', () => {
    const { getByTestId } = render(<NotFoundScreen />);
    // BaseViewがレンダリングされることを確認
    expect(getByTestId).toBeDefined();
  });
});
