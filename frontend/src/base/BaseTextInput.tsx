import { useSettings } from "@/contexts/SettingsContext"; // useThemeColorの代わりにuseSettingsを使用すると仮定
import { ExclusiveMuliStyleProps, PartialTextStyleKit, PartialViewStyleKit, StateFlags, StyleState, textInputTextStyleMaps, textInputViewStyleMaps, TextStyleKit, resolveStyle, useTextStyles, useViewStyles, ViewStyleKit } from "@/styles/component";
import { ColorTextProperty, ColorValueProperty, ColorValueStyleKit, ColorViewProperty, CoreColorKey, FontWeightKey, RoundKey, SizeKey, SizeTextProperty, SizeViewProperty, SizeViewStyle, textInputColorValueMap, useResolvedColorValues } from "@/styles/tokens";
import { useMemo, useState } from "react";
import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, ViewStyle } from "react-native";

// --- デフォルトKitの定義 ---
const DEFAULT_INPUT_VIEW_KIT: ViewStyleKit = {
  color: {
    colorKey: CoreColorKey.Base,
    apply: { default: [ColorViewProperty.Bg] },
  },
  size: {
    sizeKey: SizeKey.MD,
    apply: { default: [SizeViewProperty.PaddingHorizontal, SizeViewProperty.PaddingVertical] },
  },
  roundKey: RoundKey.Md,
};

const DEFAULT_INPUT_TEXT_KIT: TextStyleKit = {
  color: {
    colorKey: CoreColorKey.Base,
    apply: { default: [ColorTextProperty.Text], disabled: [ColorTextProperty.Text] },
  },
  size: {
    sizeKey: SizeKey.MD,
    apply: { default: [SizeTextProperty.FontSize] },
  },
  fontWeightKey: FontWeightKey.Normal,
};

const DEFAULT_INPUT_VALUE_KIT: ColorValueStyleKit = {
  colorKey: CoreColorKey.Base,
  apply: {
    default: [ColorValueProperty.Placeholder, ColorValueProperty.Border, ColorValueProperty.Selection],
    focus: [ColorValueProperty.Border], // focus状態のボーダー色を解決
    disabled: [ColorValueProperty.Border], // disabled状態のボーダー色を解決
  },
};

// --- Propsの型定義 ---
export type BaseTextInputProps = TextInputProps & {
  colorKey?: CoreColorKey;
} & ExclusiveMuliStyleProps<PartialViewStyleKit, PartialTextStyleKit>;

export const BaseTextInput: React.FC<BaseTextInputProps> = ({
  colorKey,
  easyStyleKit,
  viewStyleKit,
  textStyleKit,
  style,
  onFocus,
  onBlur,
  editable,
  ...props
}) => {
  // useThemeColor() は存在しないと仮定し、useSettings() から取得
  const { themeMode } = useSettings();
  const [isFocused, setIsFocused] = useState(false);
  const isDisabled = (editable === false); //editable がundefinedを考慮

  const stateFlags: StateFlags = {
    [StyleState.Focus]: isFocused,
    [StyleState.Disabled]: isDisabled,
  };

  // 簡易Propsから詳細Kitを生成するロジック
  const overrideViewKit = useMemo((): PartialViewStyleKit => {
    if (easyStyleKit) {
      return {
        color: easyStyleKit.colorKey ? { colorKey: easyStyleKit.colorKey } : undefined,
        size: easyStyleKit.sizeKey ? { sizeKey: easyStyleKit.sizeKey } : undefined,
        roundKey: easyStyleKit.roundKey,
      };
    }
    // colorKey propをviewStyleKitにマージ
    if (colorKey) {
        return { ...viewStyleKit, color: { ...viewStyleKit?.color, colorKey } };
    }
    return viewStyleKit ?? {};
  }, [easyStyleKit, viewStyleKit, colorKey]);

  const overrideTextKit = useMemo((): PartialTextStyleKit => {
    if (easyStyleKit) {
      return {
        color: easyStyleKit.colorKey ? { colorKey: easyStyleKit.colorKey } : undefined,
        size: easyStyleKit.sizeKey ? { sizeKey: easyStyleKit.sizeKey } : undefined,
        fontWeightKey: easyStyleKit.fontWeightKey,
      };
    }
    // colorKey propをtextStyleKitにマージ
    if (colorKey) {
        return { ...textStyleKit, color: { ...textStyleKit?.color, colorKey } };
    }
    return textStyleKit ?? {};
  }, [easyStyleKit, textStyleKit, colorKey]);

  // ★ 修正点: colorKeyをColorValueKitにも反映させる
  const finalValueKit = useMemo((): ColorValueStyleKit => {
    const finalColorKey = easyStyleKit?.colorKey || colorKey || DEFAULT_INPUT_VALUE_KIT.colorKey;
    return {
      ...DEFAULT_INPUT_VALUE_KIT,
      colorKey: finalColorKey,
    };
  }, [easyStyleKit, colorKey]);


  // --- スタイルロジック ---
  const viewStyles = useViewStyles(DEFAULT_INPUT_VIEW_KIT, overrideViewKit, textInputViewStyleMaps);
  const textStyles = useTextStyles(DEFAULT_INPUT_TEXT_KIT, overrideTextKit, textInputTextStyleMaps);
  // finalValueKit を使用して色を解決
  const colorValues = useResolvedColorValues(finalValueKit, textInputColorValueMap, stateFlags);

  const resolvedViewStyle = resolveStyle(viewStyles, stateFlags);
  const resolvedTextStyle = resolveStyle(textStyles, stateFlags);

  // ★ 修正点: colorValues.borderが存在する場合に、borderColorとborderWidthを適用する
  const borderStyle = useMemo((): ViewStyle => {
    if (colorValues.border) {
      return {
        borderColor: colorValues.border,
        borderWidth: 1, // 色が指定されている場合、幅を1に設定
      };
    }
    return {}; // 色がなければ、スタイルを適用しない
  }, [colorValues.border]);


  const finalInputStyle = StyleSheet.flatten([
    resolvedViewStyle,
    resolvedTextStyle,
    borderStyle, // 生成したボーダースタイルを適用
    style,
  ]);

  return (
    <TextInput
      style={finalInputStyle as StyleProp<TextStyle>}
      placeholderTextColor={colorValues.placeholder}
      selectionColor={colorValues.selection}
      onFocus={(e) => { setIsFocused(true); onFocus?.(e); }}
      onBlur={(e) => { setIsFocused(false); onBlur?.(e); }}
      editable={!isDisabled}
      keyboardAppearance={themeMode}
      {...props}
    />
  );
};
