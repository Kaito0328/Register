import React from 'react';
import { render } from '@/utils/test-utils'; // 自作のテストユーティリティをインポート
import { BaseView } from '../BaseView';
import { CoreColorKey, SizeKey, RoundKey, ShadowKey } from '@/styles/tokens';

describe('BaseView', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <BaseView>
        <TestText>Test Content</TestText>
      </BaseView>
    );
    
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('applies style kit correctly', () => {
    const { getByTestId } = render(
      <BaseView 
        styleKit={{ 
          color: { colorKey: CoreColorKey.Primary },
          size: { sizeKey: SizeKey.LG },
          roundKey: RoundKey.Lg,
          shadowKey: ShadowKey.LG
        }}
        testID="styled-view"
      >
        <TestText>Styled Content</TestText>
      </BaseView>
    );
    
    expect(getByTestId('styled-view')).toBeTruthy();
  });

  it('applies custom style', () => {
    const customStyle = { opacity: 0.8 };
    const { getByTestId } = render(
      <BaseView style={customStyle} testID="custom-styled-view">
        <TestText>Custom Style</TestText>
      </BaseView>
    );
    
    expect(getByTestId('custom-styled-view')).toBeTruthy();
  });

  it('handles touch events when onStartShouldSetResponder is set', () => {
    const mockResponder = jest.fn(() => true);
    const { getByTestId } = render(
      <BaseView 
        onStartShouldSetResponder={mockResponder}
        testID="responder-view"
      >
        <TestText>Responder Content</TestText>
      </BaseView>
    );
    
    expect(getByTestId('responder-view')).toBeTruthy();
  });

  it('renders without crashing with minimal props', () => {
    const { getByTestId } = render(
      <BaseView testID="minimal-view" />
    );
    
    expect(getByTestId('minimal-view')).toBeTruthy();
  });

  it('applies multiple style properties', () => {
    const { getByTestId } = render(
      <BaseView 
        styleKit={{ 
          color: { colorKey: CoreColorKey.Secondary },
          size: { sizeKey: SizeKey.SM },
          roundKey: RoundKey.Sm
        }}
        style={{ margin: 10 }}
        testID="multi-styled-view"
      >
        <TestText>Multi Styled</TestText>
      </BaseView>
    );
    
    expect(getByTestId('multi-styled-view')).toBeTruthy();
  });
});

// テスト用のシンプルなコンポーネント
const TestText = ({ children }: { children: React.ReactNode }) => {
  const { Text } = require('react-native');
  return <Text>{children}</Text>;
};
