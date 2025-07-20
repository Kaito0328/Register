import { useMemo } from 'react';
import { ShadowKey, ShadowMap, ShadowStyle } from './types';

export const useShadowStyle = (key: ShadowKey, map: ShadowMap): ShadowStyle => {
  return useMemo(() => {

    // 指定されたshadowKeyに対応する状態ごとのスタイルマップをそのまま返す
    const shadowStateMap = map[key];

    return shadowStateMap ?? {};
  }, [key, map]);
};