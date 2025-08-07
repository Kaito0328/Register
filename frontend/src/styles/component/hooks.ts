// style/hooks.ts

import { useMemo } from "react";
import { useRoundStyle, useShadowStyle, useFontWeightStyle, useTextSizeStyle, useViewSizeStyle, useColorTextStyle, useColorViewStyle } from "../tokens";
import { NonDefaultStates, PartialTextStyleKit, PartialViewStyleKit, StateFlags, StyleState, TextStyleKit, TextStyleMaps, TextStyles, ViewStyleKit, ViewStyleMaps, ViewStyles } from "./types";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { mergeTextStyleKits, mergeViewStyleKits } from "./utils";

// --- View Style Hook ---
export const useViewStyles = (
  defaultKit: ViewStyleKit,
  overrideKit: PartialViewStyleKit | undefined,
  maps: ViewStyleMaps
): ViewStyles => {
  const finalKit = mergeViewStyleKits(defaultKit, overrideKit);

  const colorStyles = useColorViewStyle(finalKit.color, maps.color);
  
  // 常にhookを呼び出し、結果を条件で使い分ける
  // undefinedの場合はデフォルト値を提供
  const allSizeStyles = useViewSizeStyle(finalKit.size || {} as any, maps.size);
  const sizeStyles = finalKit.size ? allSizeStyles : {};
  
  const allShadowStyles = useShadowStyle(finalKit.shadowKey || '' as any, maps.shadow || {} as any);
  const shadowStyles = (finalKit.shadowKey && maps.shadow) ? allShadowStyles : {};
  
  const allRoundStyles = useRoundStyle(maps.round || {} as any, finalKit.roundKey || '' as any);
  const roundStyle = (finalKit.roundKey && maps.round) ? allRoundStyles : {};


  return useMemo(() => {
    const allStates = [
      ...Object.keys(colorStyles),
      ...Object.keys(sizeStyles),
      ...Object.keys(shadowStyles),
    ] as StyleState[];
    const uniqueStates = [...new Set(allStates)];

    const finalStyles: ViewStyles = {};
    for (const state of uniqueStates) {
      // 全ての状態のスタイルをマージする
      finalStyles[state] = StyleSheet.flatten([
        colorStyles[state],
        sizeStyles[state],
        shadowStyles[state],
        roundStyle, // roundStyleは状態を持たないので、全ての状態に適用
      ]);
    }
    return finalStyles;
  }, [colorStyles, sizeStyles, shadowStyles, roundStyle]);
};

// --- Text Style Hook ---
export const useTextStyles = (
  defaultKit: TextStyleKit,
  overrideKit: PartialTextStyleKit | undefined,
  maps: TextStyleMaps
): TextStyles => {
  // 1. 受け取ったKitをマージして、最終的なKitを生成
  const finalKit = mergeTextStyleKits(defaultKit, overrideKit);

  // 2. 各パーツのスタイルを、状態ごとのマップとして取得
  const colorStyles = useColorTextStyle(finalKit.color, maps.color);
  const sizeStyles = useTextSizeStyle(finalKit.size, maps.size);
  
  // 常にhookを呼び出し、結果を条件で使い分ける
  const allFontWeightStyles = useFontWeightStyle(maps.fontWeight || {} as any, finalKit.fontWeightKey || '' as any);
  const fontWeightStyle = finalKit.fontWeightKey ? allFontWeightStyles : {};

  return useMemo(() => {
    const allStates = [
      ...Object.keys(colorStyles),
      ...Object.keys(sizeStyles),
    ] as StyleState[];
    const uniqueStates = [...new Set(allStates)];

    const finalStyles: TextStyles = {};
    for (const state of uniqueStates) {
      finalStyles[state] = StyleSheet.flatten([
        colorStyles[state],
        sizeStyles[state],
        fontWeightStyle,
      ]);
    }
    return finalStyles;
  }, [colorStyles, sizeStyles, fontWeightStyle]);
};
const statePriority: NonDefaultStates[] = [
  StyleState.Disabled,
  StyleState.LongPressed,
  StyleState.Pressed,
  StyleState.Focus,
];

/**
 * 状態に応じて適用すべきスタイルを解決する関数
 * @param styles 各状態に対応するスタイル定義
 * @param stateFlags 現在の状態フラグ
 * @returns 解決された最終的なスタイルオブジェクト
 */
export const resolveStyle = <T extends ViewStyle | TextStyle>(
  styles: Partial<Record<StyleState, T>>,
  stateFlags: StateFlags
): T => {
  // 1. ベースとしてdefaultスタイルを適用
  const stylesToMerge: T[] = [styles.default ?? ({} as T)];

  // 2. 優先順位に従って、有効な状態のスタイルを配列に追加
  for (const state of statePriority) {
    if (stateFlags[state] && styles[state]) {
      stylesToMerge.push(styles[state]);
    }
  }

  // 3. 全てのスタイルを一つのオブジェクトにマージして返す
  return StyleSheet.flatten(stylesToMerge) as T;
};