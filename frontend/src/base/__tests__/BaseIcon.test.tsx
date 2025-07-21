import React from 'react';
import { render } from '@/utils/test-utils'; // 自作のテストユーティリティをインポート
import { BaseIcon } from '../BaseIcon';
import { CoreColorKey, SizeKey } from '@/styles/tokens';

// モックアイコンコンポーネント
const MockHomeIcon = ({ size, color, ...props }: any) => {
  const { Text } = require('react-native');
  return <Text testID="mock-home-icon" {...props}>Home-{size}-{color}</Text>;
};

const MockSettingsIcon = ({ size, color, ...props }: any) => {
  const { Text } = require('react-native');
  return <Text testID="mock-settings-icon" {...props}>Settings-{size}-{color}</Text>;
};

describe('BaseIcon', () => {
  it('renders icon correctly', () => {
    const { getByTestId } = render(
      <BaseIcon icon={MockHomeIcon} />
    );
    
    expect(getByTestId('mock-home-icon')).toBeTruthy();
  });

  it('applies default size and color', () => {
    const { getByTestId } = render(
      <BaseIcon icon={MockHomeIcon} />
    );
    
    const icon = getByTestId('mock-home-icon');
    expect(icon.props.children).toBeDefined();
  });

  it('applies style kit correctly', () => {
    const { getByTestId } = render(
      <BaseIcon 
        icon={MockSettingsIcon} 
        styleKit={{ 
          color: { colorKey: CoreColorKey.Primary },
          size: { sizeKey: SizeKey.SM }
        }} 
      />
    );
    
    expect(getByTestId('mock-settings-icon')).toBeTruthy();
  });

  it('applies custom style', () => {
    const customStyle = { transform: [{ rotate: '45deg' }] };
    const { getByTestId } = render(
      <BaseIcon icon={MockHomeIcon} style={customStyle} />
    );
    
    expect(getByTestId('mock-home-icon')).toBeTruthy();
  });
});
