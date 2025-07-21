import React from 'react';
import { render, fireEvent } from '@/utils/test-utils'; // 自作のテストユーティリティをインポート
import { Button } from '../Button';
import { CoreColorKey, SizeKey, RoundKey } from '@/styles/tokens';

describe('Button', () => {
  it('renders with children correctly', () => {
    const { getByText } = render(
      <Button onPress={() => {}}>Click Me</Button>
    );
    
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('handles press events', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button onPress={mockOnPress}>Press Button</Button>
    );
    
    fireEvent.press(getByText('Press Button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('handles disabled state', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button onPress={mockOnPress} disabled>Disabled Button</Button>
    );
    
    const button = getByText('Disabled Button');
    fireEvent.press(button);
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('applies easyStyleKit correctly', () => {
    const { getByTestId } = render(
      <Button 
        onPress={() => {}} 
        easyStyleKit={{
          colorKey: CoreColorKey.Primary,
          sizeKey: SizeKey.LG,
          roundKey: RoundKey.Lg
        }}
        testID="easy-styled-button"
      >
        Easy Styled
      </Button>
    );
    
    expect(getByTestId('easy-styled-button')).toBeTruthy();
  });

  it('applies viewStyleKit correctly', () => {
    const { getByTestId } = render(
      <Button 
        onPress={() => {}} 
        viewStyleKit={{
          color: { colorKey: CoreColorKey.Secondary },
          size: { sizeKey: SizeKey.MD }
        }}
        testID="view-styled-button"
      >
        View Styled
      </Button>
    );
    
    expect(getByTestId('view-styled-button')).toBeTruthy();
  });

  it('applies textStyleKit correctly', () => {
    const { getByTestId } = render(
      <Button 
        onPress={() => {}} 
        textStyleKit={{
          color: { colorKey: CoreColorKey.Base },
          size: { sizeKey: SizeKey.SM }
        }}
        testID="text-styled-button"
      >
        Text Styled
      </Button>
    );
    
    expect(getByTestId('text-styled-button')).toBeTruthy();
  });

  it('applies custom style', () => {
    const { getByTestId } = render(
      <Button 
        onPress={() => {}} 
        style={{ backgroundColor: 'red' }}
        testID="custom-styled-button"
      >
        Custom Styled
      </Button>
    );
    
    expect(getByTestId('custom-styled-button')).toBeTruthy();
  });
});
