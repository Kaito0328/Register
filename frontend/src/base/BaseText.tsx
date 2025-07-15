import { PartialTextStyleKit, StateFlags, TextStyleKit, textStyleMaps, resolveStyle, useTextStyles } from "@/styles/component";
import { ColorTextProperty, CoreColorKey, FontWeightKey, SizeKey, SizeTextProperty } from "@/styles/tokens";
import { Text, TextProps } from "react-native";


const DEFAULT_TEXT_KIT: TextStyleKit = {
  color: {
    colorKey: CoreColorKey.Base,
    apply: {
      default: [ColorTextProperty.Text],
      disabled: [ColorTextProperty.Text],
    },
  },
  size: {
    sizeKey: SizeKey.MD,
    apply: {
      default: [SizeTextProperty.FontSize],
    },
  },
  fontWeightKey: FontWeightKey.Normal,
};

export type BaseTextProps = TextProps & {
  styleKit?: PartialTextStyleKit;
  disabled?: boolean;
};

export const BaseText: React.FC<BaseTextProps> = ({
  styleKit,
  style,
  disabled,
  ...props
}) => {
  const textStyles = useTextStyles(DEFAULT_TEXT_KIT, styleKit, textStyleMaps);
  const stateFlags: StateFlags = {
    disabled: disabled ?? false,
  };
  const resolvedStyle = resolveStyle(textStyles, stateFlags);

  // Textのインポート元を 'react-native' に修正したことでエラーが解決
  return <Text style={[resolvedStyle, style]} {...props} />;
};