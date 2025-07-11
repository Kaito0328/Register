import { defaultColorMap } from "@/styleMap/defaults/defaultColorMap";
import { ColorPropertyKey, getColorStyle } from "./color";
import { ComponentStyle, PartialComponentStyle, StyleMaps } from "./style";
import { getSizeStyle } from "./size";
import { defaultSizeMap } from "@/styleMap/defaults/defaultSizeMap";
import { getFontWeightStyle } from "./fontWeight";
import { StyleSheet } from "react-native";

// テキスト用のスタイルを生成する (TextStyleを返す)
export const getTextStyle = (
  defaultStyle: ComponentStyle,
  style?: PartialComponentStyle,
  maps?: StyleMaps
) => {
  const mergedStyle: ComponentStyle = {
    color: { ...defaultStyle.color, ...style?.color },
    size: { ...defaultStyle.size, ...style?.size },
    fontWeightKey: style?.fontWeightKey ?? defaultStyle.fontWeightKey,
    // roundKey, shadowKeyはここでは扱わない
  };

  // 'text' プロパティのみに限定して色を生成
  const textColorProperties = mergedStyle.color.properties.filter(
    (p) => p === ColorPropertyKey.Text
  );

  const color = getColorStyle(maps?.colorMap ?? defaultColorMap, {
      ...mergedStyle.color,
      properties: textColorProperties,
  });

  const size = getSizeStyle(maps?.sizeMap ?? defaultSizeMap, mergedStyle.size); // fontSizeなどもここで扱う想定
  const fontWeight = maps?.fontWeightMap ? getFontWeightStyle(maps?.fontWeightMap, mergedStyle.fontWeightKey) : undefined;

  // round, shadowは生成しない
  return StyleSheet.flatten([color, size, fontWeight]);
};