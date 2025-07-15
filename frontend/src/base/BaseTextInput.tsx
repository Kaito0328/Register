import { useThemeColor } from "@/hooks/useThemeColor";
import { ExclusiveMuliStyleProps, PartialTextStyleKit, PartialViewStyleKit, StateFlags, StyleState, textInputTextStyleMaps, textInputViewStyleMaps, TextStyleKit, resolveStyle, useTextStyles, useViewStyles, ViewStyleKit } from "@/styles/component";
import { ColorTextProperty, ColorValueProperty, ColorValueStyleKit, ColorViewProperty, CoreColorKey, FontWeightKey, RoundKey, SizeKey, SizeTextProperty, SizeViewProperty, textInputColorValueMap, useResolvedColorValues } from "@/styles/tokens";
import { useMemo, useState } from "react";
import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle } from "react-native";
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
    focus: [ColorValueProperty.Border],
    disabled: [ColorValueProperty.Border],
  },
};

// --- Propsの型定義 ---
export type BaseTextInputProps = TextInputProps & {
  // --- ★ 簡易Propsを追加 ---
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
const { themeMode } = useThemeColor();
  const [isFocused, setIsFocused] = useState(false);
  const isDisabled = editable === false;

  const stateFlags: StateFlags = {
    [StyleState.Focus]: isFocused,
    [StyleState.Disabled]: isDisabled,
  };

  // ★ 修正点: 簡易Propsから詳細Kitを生成するロジック
  const overrideViewKit = useMemo((): PartialViewStyleKit => {
    if (easyStyleKit) {
      return {
        color: easyStyleKit.colorKey ? { colorKey: easyStyleKit.colorKey } : undefined,
        size: easyStyleKit.sizeKey ? { sizeKey: easyStyleKit.sizeKey } : undefined,
        roundKey: easyStyleKit.roundKey,
      };
    }
    return viewStyleKit ?? {};
  }, [easyStyleKit, viewStyleKit]);

  const overrideTextKit = useMemo((): PartialTextStyleKit => {
    if (easyStyleKit) {
      return {
        color: easyStyleKit.colorKey ? { colorKey: easyStyleKit.colorKey } : undefined,
        size: easyStyleKit.sizeKey ? { sizeKey: easyStyleKit.sizeKey } : undefined,
        fontWeightKey: easyStyleKit.fontWeightKey,
      };
    }
    return textStyleKit ?? {};
  }, [easyStyleKit, textStyleKit]);

  // --- スタイルロジック ---
  const viewStyles = useViewStyles(DEFAULT_INPUT_VIEW_KIT, overrideViewKit, textInputViewStyleMaps);
  const textStyles = useTextStyles(DEFAULT_INPUT_TEXT_KIT, overrideTextKit, textInputTextStyleMaps);
  const colorValues = useResolvedColorValues(DEFAULT_INPUT_VALUE_KIT, textInputColorValueMap, stateFlags);

  const resolvedViewStyle = resolveStyle(viewStyles, stateFlags);
  const resolvedTextStyle = resolveStyle(textStyles, stateFlags);

  const finalInputStyle = StyleSheet.flatten([
    resolvedViewStyle,
    resolvedTextStyle,
    { borderColor: colorValues.border },
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