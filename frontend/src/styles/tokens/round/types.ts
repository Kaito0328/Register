import { ViewStyle } from 'react-native';

export enum RoundKey {
  None = 'none',
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
  Full = 'full',
}

// borderRadiusは数値
export type RoundMap = Record<RoundKey, number>;