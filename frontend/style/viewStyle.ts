import { defaultColorMap } from "@/styleMap/defaults/defaultColorMap";
import { ColorPropertyKey, getColorStyle } from "./color";
import { ComponentStyle, PartialComponentStyle, StyleMaps } from "./style";
import { getSizeStyle } from "./size";
import { getRoundStyle } from "./rounded";
import { getShadowStyle } from "./shadow";
import { defaultSizeMap } from "@/styleMap/defaults/defaultSizeMap";
import { StyleSheet } from "react-native";


export const getViewStyle = (
  defaultStyle: ComponentStyle,
  style?: PartialComponentStyle,
  maps?: StyleMaps
) => {
  const mergedStyle: ComponentStyle = {
    color: { ...defaultStyle.color, ...style?.color },
    size: { ...defaultStyle.size, ...style?.size },
    roundKey: style?.roundKey ?? defaultStyle.roundKey,
    shadowKey: style?.shadowKey ?? defaultStyle.shadowKey,
    // fontWeightKeyはここでは扱わない
  };

  // 'text' プロパティは除外して色を生成
  const viewColorProperties = mergedStyle.color.properties.filter(
    (p) => p !== ColorPropertyKey.Text
  );

  const color = getColorStyle(maps?.colorMap ?? defaultColorMap, {
      ...mergedStyle.color,
      properties: viewColorProperties,
  });

  const size = getSizeStyle(maps?.sizeMap ?? defaultSizeMap, mergedStyle.size);
  const round = maps?.roundMap ? getRoundStyle(maps?.roundMap, mergedStyle.roundKey) : undefined;
  const shadow = maps?.shadowMap ? getShadowStyle(maps?.shadowMap, mergedStyle.shadowKey) : undefined;

  // fontWeightは生成しない
  return StyleSheet.flatten([color, size, round, shadow]);
};