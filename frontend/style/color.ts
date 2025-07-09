import { useThemeColor } from '@/hooks/useThemeColor';
import type { ViewStyle, TextStyle } from 'react-native';

// --- React Native用に型定義を翻訳 ---

/**
 * React Nativeのスタイルプロパティを持つオブジェクトの型。
 * ViewとTextの両方のスタイルを許容します。
 */
export type StyleObject = ViewStyle & TextStyle;

// --- Keyの定義はそのまま利用 ---
export enum CoreColorKey {
  Base = 'base',
  Primary = 'primary',
  Secondary = 'secondary',
  Danger = 'danger',
  Success = 'success',
}

export enum SpecialColorKey {
  Heart = 'Heart',
}

export type ColorKey = CoreColorKey | SpecialColorKey;

export enum ColorPropertyKey {
  Bg = 'bg',
  Text = 'text', // RNでは "Label" より "Text" が一般的
  Border = 'border',
  // RingはRNに無いため省略
}

// 各状態が持つのは、クラス名ではなくスタイルオブジェクト
export type ColorStateStyles = {
  default: StyleObject;
  active?: StyleObject; // 押下時
  focus?: StyleObject;  // TextInput用
  loading?: StyleObject;
};

export enum ThemeColor {
  light = 'light',
  dark = 'dark',
}

// 各プロパティが持つのは、状態ごとのスタイルオブジェクト
export type ColorSlot = Partial<Record<ColorPropertyKey, ColorStateStyles>>;

// カラーマップの型定義
export type ColorThemeMap = Record<ColorKey, ColorSlot>;

export type ColorMap = Record<ThemeColor, ColorThemeMap>;

// スタイルを適用するコンポーネントが渡す情報
export type ColorStyle = {
  colorKey: ColorKey;
  properties: ColorPropertyKey[];
  // コンポーネントの状態を直接渡す
  isActive?: boolean;
  isFocused?: boolean;
  isLoading?: boolean;
};

// スタイルオブジェクトを生成するヘルパー関数
export const getColorStyle = (
  map: ColorMap,
  style: ColorStyle
): StyleObject => {
  const themeColor = useThemeColor();
  const themeMap = map[themeColor];
  const slot = themeMap[style.colorKey];
  if (!slot) return {};

  const combinedStyle: StyleObject = {};

  for (const prop of style.properties) {
    const stateStyles = slot[prop];
    if (!stateStyles) continue;

    // 1. デフォルトのスタイルを適用
    Object.assign(combinedStyle, stateStyles.default);

    // 2. 状態に応じてスタイルを上書き
    if (style.isLoading && stateStyles.loading) {
      Object.assign(combinedStyle, stateStyles.loading);
    } else if (style.isActive && stateStyles.active) {
      Object.assign(combinedStyle, stateStyles.active);
    } else if (style.isFocused && stateStyles.focus) {
      Object.assign(combinedStyle, stateStyles.focus);
    }
  }
  return combinedStyle;
};