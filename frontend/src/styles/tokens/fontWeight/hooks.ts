import { useMemo } from 'react';
import { TextStyle } from 'react-native';
import { FontWeightKey, FontWeightMap } from './types'; // 型定義は別ファイルと仮定

export const useFontWeightStyle = (
  map: FontWeightMap,
  fontWeightKey?: FontWeightKey
): TextStyle => {
  const style = useMemo(() => {
    if (!fontWeightKey) {
      return {};
    }
    const fontWeight = map[fontWeightKey];
    return fontWeight ? { fontWeight } : {};
  }, [map, fontWeightKey]);

  return style;
};