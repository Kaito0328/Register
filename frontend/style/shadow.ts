import { ViewStyle, Platform } from 'react-native';

export enum ShadowKey {
  None = 'none',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

// RNのシャドウは複数のプロパティで表現
export type ShadowStyleObject = {
  // iOS
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
  // Android
  elevation?: number;
};

export type ShadowMap = Record<ShadowKey, ShadowStyleObject>;

export const getShadowStyle = (
  map: ShadowMap,
  shadowKey?: ShadowKey
): ViewStyle => {
  if (!shadowKey || shadowKey === ShadowKey.None) return {};
  return map[shadowKey] ?? {};
};