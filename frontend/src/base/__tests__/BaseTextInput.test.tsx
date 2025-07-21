import React from 'react';
import { render, fireEvent } from '@/utils/test-utils'; // 自作のテストユーティリティをインポート
import { BaseTextInput } from '../BaseTextInput';
import { CoreColorKey, SizeKey, RoundKey } from '@/styles/tokens';

describe('BaseTextInput', () => {
  it('renders with default props', () => {
    const { getByTestId } = render(
      <BaseTextInput testID="text-input" />
    );
    
    expect(getByTestId('text-input')).toBeTruthy();
  });

  it('handles text input correctly', () => {
    const mockOnChangeText = jest.fn();
    const { getByTestId } = render(
      <BaseTextInput 
        onChangeText={mockOnChangeText}
        testID="text-input"
      />
    );
    
    fireEvent.changeText(getByTestId('text-input'), 'Hello World');
    expect(mockOnChangeText).toHaveBeenCalledWith('Hello World');
  });

  it('displays placeholder correctly', () => {
    const { getByPlaceholderText } = render(
      <BaseTextInput placeholder="Enter text here" />
    );
    
    expect(getByPlaceholderText('Enter text here')).toBeTruthy();
  });

  it('handles controlled value', () => {
    const { getByDisplayValue } = render(
      <BaseTextInput value="Controlled Text" />
    );
    
    expect(getByDisplayValue('Controlled Text')).toBeTruthy();
  });

  it('applies view style kit correctly', () => {
    const { getByTestId } = render(
      <BaseTextInput 
        viewStyleKit={{ 
          color: { colorKey: CoreColorKey.Secondary },
          size: { sizeKey: SizeKey.LG },
          roundKey: RoundKey.Md
        }}
        testID="styled-input"
      />
    );
    
    expect(getByTestId('styled-input')).toBeTruthy();
  });

  it('applies text style kit correctly', () => {
    const { getByTestId } = render(
      <BaseTextInput 
        textStyleKit={{ 
          color: { colorKey: CoreColorKey.Base },
          size: { sizeKey: SizeKey.MD }
        }}
        testID="text-styled-input"
      />
    );
    
    expect(getByTestId('text-styled-input')).toBeTruthy();
  });

  it('handles multiline correctly', () => {
    const { getByTestId } = render(
      <BaseTextInput 
        multiline
        numberOfLines={4}
        testID="multiline-input"
      />
    );
    
    const input = getByTestId('multiline-input');
    expect(input.props.multiline).toBe(true);
    expect(input.props.numberOfLines).toBe(4);
  });

  it('handles secure text entry', () => {
    const { getByTestId } = render(
      <BaseTextInput 
        secureTextEntry
        testID="secure-input"
      />
    );
    
    const input = getByTestId('secure-input');
    expect(input.props.secureTextEntry).toBe(true);
  });

  it('applies custom style', () => {
    const customStyle = { borderWidth: 2 };
    const { getByTestId } = render(
      <BaseTextInput 
        style={customStyle}
        testID="custom-styled-input"
      />
    );
    
    expect(getByTestId('custom-styled-input')).toBeTruthy();
  });
});
