import React from 'react';
import { render, fireEvent } from '@/utils/test-utils'; // 自作のテストユーティリティをインポート
import { BasePressable } from '../BasePressable';
import { CoreColorKey, SizeKey } from '@/styles/tokens';

describe('BasePressable', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <BasePressable>
        <TestComponent>Test Content</TestComponent>
      </BasePressable>
    );
    
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('handles press events', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <BasePressable onPress={mockOnPress} testID="pressable">
        <TestComponent>Press Me</TestComponent>
      </BasePressable>
    );
    
    fireEvent.press(getByTestId('pressable'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('applies style kit correctly', () => {
    const { getByTestId } = render(
      <BasePressable 
        styleKit={{ 
          color: { colorKey: CoreColorKey.Primary },
          size: { sizeKey: SizeKey.LG }
        }}
        testID="styled-pressable"
      >
        <TestComponent>Styled Content</TestComponent>
      </BasePressable>
    );
    
    expect(getByTestId('styled-pressable')).toBeTruthy();
  });

  it('handles disabled state', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <BasePressable onPress={mockOnPress} disabled testID="disabled-pressable">
        <TestComponent>Disabled</TestComponent>
      </BasePressable>
    );
    
    fireEvent.press(getByTestId('disabled-pressable'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('applies custom style', () => {
    const customStyle = { opacity: 0.5 };
    const { getByTestId } = render(
      <BasePressable style={customStyle} testID="custom-style-pressable">
        <TestComponent>Custom Style</TestComponent>
      </BasePressable>
    );
    
    expect(getByTestId('custom-style-pressable')).toBeTruthy();
  });
});

// テスト用のシンプルなコンポーネント
const TestComponent = ({ children }: { children: React.ReactNode }) => {
  const { Text } = require('react-native');
  return <Text>{children}</Text>;
};
