import { ViewStyle } from 'react-native';
import { StyleState } from '@/styles/component';

export enum ShadowKey {
  None = 'none',
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

// RNのシャドウは複数のプロパティで表現
export type ShadowViewStyle = Pick<
  ViewStyle,
  | 'shadowColor'
  | 'shadowOffset'
  | 'shadowOpacity'
  | 'shadowRadius'
  | 'elevation'
>;

// 変更点: ShadowStateMapがStyleStateからShadowViewStyleを直接引くように
export type ShadowStateMap = Partial<Record<StyleState, ShadowViewStyle>>;

export type ShadowMap = Record<ShadowKey, ShadowStateMap>;

export type ShadowStyle = Partial<Record<StyleState, ViewStyle>>;