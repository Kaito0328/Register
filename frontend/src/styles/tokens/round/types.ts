import { ViewStyle } from 'react-native';

export enum RoundKey {
  Sm = 'sm',
  Md = 'md',
  Lg = 'lg',
  Full = 'full',
}

// borderRadiusは数値
export type RoundMap = Record<RoundKey, number>;