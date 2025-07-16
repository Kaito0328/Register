import { baseIconRoundMap, defaultColorTextMap, defaultColorViewMap, defaultRoundMap, defaultshadowMap, defaultSizeTextMap, defaultSizeViewMap, fontWeightMap, pressableColorViewMap, pressableSizeViewMap, textInputColorViewMap, textInputSizeViewMap } from "../tokens";
import { TextStyleMaps, ViewStyleMaps } from "./types";

export const viewStyleMaps: ViewStyleMaps = {
  color: defaultColorViewMap,
  size: defaultSizeViewMap,
  shadow: defaultshadowMap,
  round: defaultRoundMap,
};

export const pressableStyleMaps: ViewStyleMaps = {
  color: pressableColorViewMap, // 押下時の色変化を持つMap
  size: pressableSizeViewMap,   // 押下時のサイズ変化を持つMap
  shadow: defaultshadowMap,     // 押下時の影変化を持つMap
  round: defaultRoundMap,
};

export const textStyleMaps: TextStyleMaps = {
  color: defaultColorTextMap,
  size: defaultSizeTextMap,
  fontWeight: fontWeightMap,
};

export const iconStyleMaps: ViewStyleMaps = {
  color: defaultColorViewMap,
  size: defaultSizeViewMap,
  shadow: defaultshadowMap,
  round: baseIconRoundMap, // アイコンに特化した角丸定義
};

// --- TextInputのView部分のスタイル ---
export const textInputViewStyleMaps: ViewStyleMaps = {
  color: textInputColorViewMap,
  size: textInputSizeViewMap, // TextInputに特化したパディング定義
  round: defaultRoundMap,
  shadow: defaultshadowMap,
};

// --- TextInputのText部分のスタイル ---
export const textInputTextStyleMaps: TextStyleMaps = {
  color: defaultColorTextMap,
  size: defaultSizeTextMap,
  fontWeight: fontWeightMap,
};
