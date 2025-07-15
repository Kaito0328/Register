import { iconStyleMaps, PartialTextStyleKit, StateFlags, TextStyleKit, textStyleMaps, useResolvedStyle, useTextStyles } from "@/styles/component";
import { ColorTextProperty, CoreColorKey, SizeKey, SizeTextProperty } from "@/styles/tokens";
import { MaterialIcons } from "@expo/vector-icons";
import { TextStyle } from "react-native";

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
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  styleKit?: PartialTextStyleKit;
};

export const BaseIcon: React.FC<BaseIconProps> = ({ name, styleKit }) => {
  // アイコンはViewのスタイルを持たないため、iconStyleMapsではなくtextStyleMapsを利用
  const textStyles = useTextStyles(DEFAULT_ICON_KIT, styleKit, textStyleMaps)
  const stateFlags: StateFlags = {}; // アイコン自体は状態を持たない
  const resolvedStyle = useResolvedStyle(textStyles, stateFlags);

  const { color, fontSize } = resolvedStyle as TextStyle;

  return <MaterialIcons name={name} size={fontSize} color={color} />;
};