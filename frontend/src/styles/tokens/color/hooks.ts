import { ColorTextMap, ColorTextStyle, ColorTextStyleKit, ColorValueMap, ColorValueProperty, ColorValueStyleKit, ColorViewMap, ColorViewProperty, ColorViewStyle, ColorViewStyleKit } from "./types";
import { useMemo } from "react";
import { NonDefaultStates, StateFlags, StyleState } from "../../component/types";
import { ColorValue } from "react-native";
import { useSettings } from "@/contexts/SettingsContext";

/**
 * View用のスタイルを生成するカスタムフック
 *
 * @param kit - 適用する色の役割(colorKey)と適用ルール(apply)
 * @param map - テーマごとの色定義全体(カラーパレット)
 * @returns 状態ごとのViewStyleオブジェクト
 */
export function useColorViewStyle(
  kit: ColorViewStyleKit,
  map: ColorViewMap
): ColorViewStyle {
  const { themeMode } = useSettings();

  const colorStyle = useMemo(() => {
    const { colorKey, apply } = kit;
    const finalStyle: ColorViewStyle = {};

    // 1. 現在のテーマとcolorKeyに合致するスタイル定義を取得します
    const colorStateMap = map[themeMode]?.[colorKey];
    if (!colorStateMap) {
      // console.warn(`[useColorViewStyle] Color key "${colorKey}" not found in theme "${themeMode}".`);
      return {};
    }

    // 2. `apply`ルールを元に、状態(default, pressedなど)ごとにループします
    for (const state in apply) {
      const typedState = state as StyleState;
      const propertiesToApply = apply[typedState];
      const stylesForState = colorStateMap[typedState];

      if (!propertiesToApply || !stylesForState) {
        continue;
      }

      // 3. この状態のスタイルオブジェクトを初期化し、適用ルールに従ってスタイルを合成します
      finalStyle[typedState] = {};
      for (const prop of propertiesToApply) {
        const styleForProp = stylesForState[prop];
        if (styleForProp) {
          Object.assign(finalStyle[typedState]!, styleForProp);

          // ★★★ 変更点 ★★★
          // 'borderColor'プロパティが適用され、かつborderWidthが未定義の場合、
          // デフォルトでborderWidth: 1を設定します。
          // これにより、colorKeyでborderColorを指定するだけで枠線が表示されるようになります。
          if (prop === ColorViewProperty.Border && finalStyle[typedState]!.borderColor) {
            if (finalStyle[typedState]!.borderWidth === undefined) {
              finalStyle[typedState]!.borderWidth = 1;
            }
          }
        }
      }
    }

    return finalStyle;
  }, [kit, map, themeMode]);

  return colorStyle;
}

/**
 * Text用のスタイルを生成するカスタムフック
 *
 * @param kit - 適用する色の役割(colorKey)と適用ルール(apply)
 * @param map - テーマごとの色定義全体(カラーパレット)
 * @returns 状態ごとのTextStyleオブジェクト
 */
export function useColorTextStyle(
  kit: ColorTextStyleKit,
  map: ColorTextMap
): ColorTextStyle {
  const { themeMode } = useSettings();

  const colorStyle = useMemo(() => {
    const { colorKey, apply } = kit;
    const finalStyle: ColorTextStyle = {};

    // 1. 現在のテーマとcolorKeyに合致するスタイル定義を取得します
    const colorStateMap = map[themeMode]?.[colorKey];
    if (!colorStateMap) {
      // console.warn(`[useCreateColorTextStyle] Color key "${colorKey}" not found in theme "${themeMode}".`);
      return {};
    }

    // 2. `apply`ルールを元に、状態(default, pressedなど)ごとにループします
    for (const state in apply) {
      const typedState = state as StyleState;
      const propertiesToApply = apply[typedState];
      const stylesForState = colorStateMap[typedState];

      if (!propertiesToApply || !stylesForState) {
        continue;
      }

      // 3. この状態のスタイルオブジェクトを初期化し、適用ルールに従ってスタイルを合成します
      finalStyle[typedState] = {};
      for (const prop of propertiesToApply) {
        const styleForProp = stylesForState[prop];
        if (styleForProp) {
          // Textの場合は、`{ text: { color: '...' } }` のような構造から
          // `{ color: '...' }` の部分をマージします
          Object.assign(finalStyle[typedState]!, styleForProp);
        }
      }
    }

    return finalStyle;
  }, [kit, map, themeMode]);

  return colorStyle;
}

// 状態の優先順位リスト
const statePriority: NonDefaultStates[] = [
  StyleState.Disabled,
  StyleState.LongPressed,
  StyleState.Pressed,
  StyleState.Focus,
];


/**
 * ColorValueKitで指定された複数のプロパティについて、
 * 現在の状態に応じた最終的な色の値を一括で解決して返すフック。
 * @returns { placeholder: ColorValue, icon: ColorValue, ... } 形式のオブジェクト
 */
export const useResolvedColorValues = (
  kit: ColorValueStyleKit,
  map: ColorValueMap,
  stateFlags: StateFlags
): Partial<Record<ColorValueProperty, ColorValue>> => {
  const { themeMode } = useSettings();
  return useMemo(() => {
    const { colorKey, apply } = kit;
    const resolvedValues: Partial<Record<ColorValueProperty, ColorValue>> = {};
    // 1. ベースとなる色の定義を取得
    const colorStateMap = map[themeMode]?.[colorKey];
    if (!colorStateMap) return {};

    // 2. kitのapplyルールで要求されている全てのプロパティをリストアップ
    const propertiesToResolve = [
      ...new Set(Object.values(apply).flat()),
    ] as ColorValueProperty[];

    // 3. 要求された各プロパティについて、状態に応じた色を解決
    for (const prop of propertiesToResolve) {
      let resolvedValue: ColorValue | undefined;

      // 4. 優先順位に従って、最初に合致した状態の色を探す
      for (const state of statePriority) {
        if (stateFlags[state] && colorStateMap[state]?.[prop]) {
          resolvedValue = colorStateMap[state]?.[prop];
          break; // 最初に見つかった時点でループを抜ける
        }
      }

      // 5. どの状態にも合致しなければ、デフォルトの色を使う
      if (resolvedValue === undefined) {
        resolvedValue = colorStateMap.default?.[prop];
      }

      // 6. 解決した色を最終的なオブジェクトに格納
      if (resolvedValue) {
        resolvedValues[prop] = resolvedValue;
      }
    }

    return resolvedValues;
    // useThemeColorはthemeModeに依存するため、themeModeを依存配列に追加
  }, [kit, map, stateFlags, themeMode]);
};