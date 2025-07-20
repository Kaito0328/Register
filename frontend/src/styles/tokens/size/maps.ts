import { SizeKey, SizeTextMap, SizeTextProperty, SizeViewMap, SizeViewProperty } from "./types";
import { StyleState } from "../../component/types";

export const defaultSizeViewMap: SizeViewMap = {
  [SizeKey.SM]: {
    [StyleState.Default]: {
      [SizeViewProperty.Padding]: 8,
      [SizeViewProperty.Gap]: 4,
    },
  },
  [SizeKey.MD]: {
    [StyleState.Default]: {
      [SizeViewProperty.Padding]: 12,
      [SizeViewProperty.Gap]: 8,
    },
  },
  [SizeKey.LG]: {
    [StyleState.Default]: {
      [SizeViewProperty.Padding]: 16,
      [SizeViewProperty.Gap]: 12,
    },
  },
  [SizeKey.XL]: {
    [StyleState.Default]: {
      [SizeViewProperty.Padding]: 24,
      [SizeViewProperty.Gap]: 16,
    },
  },
};

export const pressableSizeViewMap: SizeViewMap = {
  ...defaultSizeViewMap, // まずデフォルトの定義をすべて継承
  [SizeKey.MD]: {
    ...defaultSizeViewMap[SizeKey.MD], // MDサイズのデフォルト定義を継承
    [StyleState.Pressed]: {
      // 押下時はPaddingを少しだけ小さくする
      [SizeViewProperty.Padding]: 11,
      [SizeViewProperty.Gap]: 8,
    },
  },
};

export const textInputSizeViewMap: SizeViewMap = {
  ...defaultSizeViewMap, // デフォルトを継承しつつ、必要な部分を上書き
  [SizeKey.MD]: {
    [StyleState.Default]: {
      [SizeViewProperty.PaddingHorizontal]: 16,
      [SizeViewProperty.PaddingVertical]: 12,
    },
    // フォーカス時にサイズを変えるなどの拡張も可能
  },
};

export const defaultSizeTextMap: SizeTextMap = {
  [SizeKey.SM]: {
    [StyleState.Default]: { [SizeTextProperty.FontSize]: 12 },
  },
  [SizeKey.MD]: {
    [StyleState.Default]: { [SizeTextProperty.FontSize]: 14 },
  },
  [SizeKey.LG]: {
    [StyleState.Default]: { [SizeTextProperty.FontSize]: 16 },
  },
  [SizeKey.XL]: {
    [StyleState.Default]: { [SizeTextProperty.FontSize]: 20 },
  },
};