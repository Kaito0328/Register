// style/types.ts

import { TextStyle, ViewStyle } from "react-native";
import { ColorViewStyleKit, ColorViewMap, ColorTextStyleKit, ColorTextMap, SizeViewKit, SizeViewMap, SizeTextKit, SizeTextMap, FontWeightKey, FontWeightMap, RoundKey, RoundMap,  ShadowKey, ShadowMap, SizeTextApply, ColorTextApply, SizeViewApply, ColorViewApply, ColorKey, SizeKey  } from "../tokens";


export enum StyleState {
  Default = 'default',
  Pressed = 'pressed',
  LongPressed = 'longPressed',
  Disabled = 'disabled',
  Focus = 'focus',  
}

export type NonDefaultStates = Exclude<StyleState, StyleState.Default>;

export type StateFlags = Partial<Record<NonDefaultStates, boolean>>;

// --- View Style ---
export type ViewStyleKit = {
  color: ColorViewStyleKit;
  size?: SizeViewKit;
  roundKey?: RoundKey;
  shadowKey?: ShadowKey;
};
export type ViewStyleMaps = {
  color: ColorViewMap;
  size: SizeViewMap;
  round?: RoundMap;
  shadow?: ShadowMap;
};
export type ViewStyles = Partial<Record<StyleState, ViewStyle>>;

// --- Text Style ---
export type TextStyleKit = {
  color: ColorTextStyleKit;
  size: SizeTextKit;
  fontWeightKey?: FontWeightKey;
};
export type TextStyleMaps = {
  color: ColorTextMap;
  size: SizeTextMap;
  fontWeight: FontWeightMap;
};
export type TextStyles = Partial<Record<StyleState, TextStyle>>;

export type PartialColorViewKit = Partial<Omit<ColorViewStyleKit, 'apply'>> & {
  apply?: Partial<ColorViewApply>;
};
export type PartialSizeViewKit = Partial<Omit<SizeViewKit, 'apply'>> & {
  apply?: Partial<SizeViewApply>;
};
export type PartialColorTextKit = Partial<Omit<ColorTextStyleKit, 'apply'>> & {
  apply?: Partial<ColorTextApply>;
};
export type PartialSizeTextKit = Partial<Omit<SizeTextKit, 'apply'>> & {
  apply?: Partial<SizeTextApply>;
};


// --- Final Partial Kits ---
// 上記のPartial Sub-Kitsを使って、最終的なPartial Kitを定義
export type PartialViewStyleKit = {
  color?: PartialColorViewKit;
  size?: PartialSizeViewKit;
  roundKey?: RoundKey;
  shadowKey?: ShadowKey;
};

export type PartialTextStyleKit = {
  color?: PartialColorTextKit;
  size?: PartialSizeTextKit;
  fontWeightKey?: FontWeightKey;
};

export type EasyStyleKit = {
  colorKey?: ColorKey;
  sizeKey?: SizeKey;
  roundKey?: RoundKey;
  fontWeightKey?: FontWeightKey;
  shadowKey?: ShadowKey;
};

/**
 * 簡易版か詳細版のどちらか一方のスタイル指定を強制するための型
 * @param D 詳細版のStyleKitの型
 */
export type ExclusiveStyleProps<D> =
  | {
      easyStyleKit: EasyStyleKit;
      styleKit?: never; // 詳細版を無効化
    }
  | {
      easyStyleKit?: never; // 簡易版を無効化
      styleKit?: D;
    };

/**
 * 複数の詳細Kitを持つコンポーネント用の排他型
 * @param V View用の詳細Kitの型
 * @param T Text用の詳細Kitの型
 */
export type ExclusiveMuliStyleProps<V, T> =
  | {
      easyStyleKit: EasyStyleKit;
      viewStyleKit?: never;
      textStyleKit?: never;
    }
  | {
      easyStyleKit?: never;
      viewStyleKit?: V;
      textStyleKit?: T;
    };