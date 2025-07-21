import React from 'react';
import { render } from '@/utils/test-utils'; // 自作のテストユーティリティをインポート
import { BaseText } from '../BaseText';
import { CoreColorKey } from '@/styles/tokens';

describe('BaseText', () => {
  it('renders text correctly', () => {
    const { getByText } = render(
      <BaseText>Hello World</BaseText>
    );
    
    expect(getByText('Hello World')).toBeTruthy();
  });

  it('applies style kit correctly', () => {
    const { getByText } = render(
      <BaseText styleKit={{ color: { colorKey: CoreColorKey.Primary } }}>
        Styled Text
      </BaseText>
    );
    
    expect(getByText('Styled Text')).toBeTruthy();
  });
});
