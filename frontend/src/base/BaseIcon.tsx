import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { useTextStyles, resolveStyle, PartialTextStyleKit, TextStyleKit, textStyleMaps, StateFlags } from "@/styles/component";
import { ColorTextProperty, CoreColorKey, SizeKey, SizeTextProperty } from "@/styles/tokens";

// ★修正点: アイコンコンポーネントが受け取るpropsの型を正確に定義
type IconComponentProps = {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

// デフォルトのスタイル定義
const DEFAULT_ICON_KIT: TextStyleKit = {
  color: {
    colorKey: CoreColorKey.Base,
    apply: { default: [ColorTextProperty.Text] },
  },
  size: {
    sizeKey: SizeKey.LG,
    apply: { default: [SizeTextProperty.FontSize] },
  },
};

export type BaseIconProps = {
  /** * 表示したいアイコンコンポーネントそのものを渡す 
   * (例: icon={ChevronDown}) 
   */
  icon: React.FC<IconComponentProps>; // ★修正点: 新しく定義した型を使用
  /** スタイルをカスタマイズするためのKit */
  styleKit?: PartialTextStyleKit;
  /** 回転などの追加スタイルを渡すためのprop */
  style?: StyleProp<ViewStyle>;
};

export const BaseIcon: React.FC<BaseIconProps> = ({ icon: IconComponent, styleKit, style }) => {
  // スタイル解決のロジックはそのまま
  const textStyles = useTextStyles(DEFAULT_ICON_KIT, styleKit, textStyleMaps);
  const stateFlags: StateFlags = {};
  const resolvedStyle = resolveStyle(textStyles, stateFlags);

  const { color, fontSize } = resolvedStyle as TextStyle;

  // ★修正点: fontSizeをsizeとして渡す
  return <IconComponent size={fontSize} color={color as string} style={style} />;
};