import { ViewStyle } from 'react-native';

export enum RoundKey {
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
  Full = 'full',
}

// borderRadiusは数値
export type RoundMap = Record<RoundKey, number>;

export const getRoundStyle = (
  map: RoundMap,
  roundKey?: RoundKey
): ViewStyle => {
  if (!roundKey) return {};
  const borderRadius = map[roundKey];
  return borderRadius !== undefined ? { borderRadius } : {};
};