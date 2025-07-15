import { ColorValue, TextStyle, ViewStyle } from "react-native";
import { StyleState } from "../../component";
import { ThemeMode } from "../../themeMode";



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

export enum ColorViewProperty {
  Bg = 'backgroundColor',
  Border = 'borderColor',
}
export enum ColorTextProperty {
  Text = 'text',
}

export enum ColorValueProperty {
  Placeholder = 'placeholder',
  Selection = 'selection',
  Icon = 'icon',
  Border = 'border', // styleオブジェクトではなく、色だけ欲しいケース
}

// 背景色に必要なスタイルだけを抜き出す
type BackgroundColorStyle = Pick<ViewStyle, 'backgroundColor'>;

// 枠線色に必要なスタイルだけを抜き出す
type BorderColorStyle = Pick<ViewStyle, 'borderColor' | 'borderWidth'>; // borderWidthも一緒に定義できると便利

// 文字色に必要なスタイルだけを抜き出す
type TextColorStyle = Pick<TextStyle, 'color'>;


// ColorViewSlotの定義をより厳密にする
export type ColorViewSlot = {
  [ColorViewProperty.Bg]?: BackgroundColorStyle;
  [ColorViewProperty.Border]?: BorderColorStyle;
};

// ColorTextSlotの定義をより厳密にする
export type ColorTextSlot = {
  [ColorTextProperty.Text]?: TextColorStyle;
};

export type ColorValueSlot = Partial<Record<ColorValueProperty, ColorValue>>;

export type ColorViewStateMap = Partial<Record<StyleState, ColorViewSlot>>;
export type ColorTextStateMap = Partial<Record<StyleState, ColorTextSlot>>;
export type ColorValueStateMap = Partial<Record<StyleState, ColorValueSlot>>;

export type ColorViewKeyMap = Partial<Record<ColorKey, ColorViewStateMap>>;
export type ColorTextKeyMap = Partial<Record<ColorKey, ColorTextStateMap>>;
export type ColorValueKeyMap = Partial<Record<ColorKey, ColorValueStateMap>>;

export type ColorViewMap = Record<ThemeMode, ColorViewKeyMap>;
export type ColorTextMap = Record<ThemeMode, ColorTextKeyMap>;
export type ColorValueMap = Record<ThemeMode, ColorValueKeyMap>;

export type ColorViewApply = Partial<Record<StyleState, ColorViewProperty[]>>;
export type ColorTextApply = Partial<Record<StyleState, ColorTextProperty[]>>;
export type ColorValueApply = Partial<Record<StyleState, ColorValueProperty[]>>;

export type ColorViewStyleKit = {
  colorKey: ColorKey;
  apply: ColorViewApply;
};

export type ColorTextStyleKit = {
  colorKey: ColorKey;
  apply: ColorTextApply;
};

export type ColorValueStyleKit = {
  colorKey: ColorKey;
  apply: ColorValueApply;
};

export type ColorViewStyle = Partial<Record<StyleState, ViewStyle>>;
export type ColorTextStyle = Partial<Record<StyleState, TextStyle>>;
export type ColorValueStyle = Partial<Record<StyleState, ColorValue>>;