import { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import { RoundKey, RoundMap } from './types'; // 型定義は別ファイルと仮定

export const useRoundStyle = (
  map: RoundMap,
  roundKey?: RoundKey
): ViewStyle => {
  const style = useMemo(() => {
    if (!roundKey) {
      return {};
    }
    const borderRadius = map[roundKey];
    return borderRadius !== undefined ? { borderRadius } : {};
  }, [map, roundKey]);

  return style;
};