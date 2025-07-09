import React, { useState } from 'react';
import { TextInput, type TextInputProps, StyleSheet } from 'react-native';
import { CoreColorKey, ColorPropertyKey } from '@/style/color';
import { SizeKey, SizeProperty } from '@/style/size';
import { FontWeightKey } from '@/style/fontWeight';
import { RoundKey } from '@/style/rounded';
import { ComponentStyle, getComponentStyle, PartialComponentStyle } from '@/style/style';
import { useTheme } from '@react-navigation/native';
import { useThemeColor } from '@/hooks/useThemeColor';

// TextInputのデフォルトの見た目を定義
const defaultStyle: ComponentStyle = {
  color: {
    colorKey: CoreColorKey.Base,
    properties: [ColorPropertyKey.Bg, ColorPropertyKey.Text, ColorPropertyKey.Border],
  },
  size: {
    sizeKey: SizeKey.MD,
    properties: [SizeProperty.Text, SizeProperty.Padding],
  },
  roundKey: RoundKey.Md,
  fontWeightKey: FontWeightKey.Normal,
};

// BaseTextInputが受け取るpropsの型
export type BaseTextInputProps = TextInputProps & {
  styleKit?: PartialComponentStyle;
};

export const BaseTextInput: React.FC<BaseTextInputProps> = ({ styleKit, style, onFocus, onBlur, ...props }) => {
const theme = useThemeColor();
  // ★フォーカスされているかどうかをstateで管理
  const [isFocused, setIsFocused] = useState(false);

    const themedStyle = getComponentStyle(defaultStyle, styleKit);

  // --- End of Style Logic ---
  
  return (
    <TextInput
      style={[themedStyle, style]}
      onFocus={(e) => {
        setIsFocused(true);
        onFocus?.(e); // 元のonFocusイベントも呼び出す
      }}
      onBlur={(e) => {
        setIsFocused(false);
        onBlur?.(e); // 元のonBlurイベントも呼び出す
      }}
      keyboardAppearance={theme}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    borderWidth: 1, // ボーダーを常に表示
  },
});