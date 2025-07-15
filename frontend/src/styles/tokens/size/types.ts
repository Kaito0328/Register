import { ViewStyle, TextStyle } from 'react-native';
import { StyleState } from '../../component';

export enum SizeKey {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
  XL = 'xl',
}

export enum SizeViewProperty {
  Padding = 'padding',
  PaddingHorizontal = 'paddingHorizontal',
  PaddingVertical = 'paddingVertical',
  Margin = 'margin',
  Gap = 'gap',
}

export enum SizeTextProperty {
  FontSize = 'fontSize',
}

export type SizeViewSlot = Partial<Record<SizeViewProperty, number>>;
export type SizeTextSlot = Partial<Record<SizeTextProperty, number>>;

export type SizeViewStateMap = Partial<Record<StyleState, SizeViewSlot>>;
export type SizeTextStateMap = Partial<Record<StyleState, SizeTextSlot>>;

export type SizeViewMap = Record<SizeKey, SizeViewStateMap>;
export type SizeTextMap = Record<SizeKey, SizeTextStateMap>;

export type SizeViewApply = Partial<Record<StyleState, SizeViewProperty[]>>;
export type SizeTextApply = Partial<Record<StyleState, SizeTextProperty[]>>;

export type SizeViewKit = {
  sizeKey: SizeKey;
  apply: SizeViewApply;
  fullWidth?: boolean;
};

export type SizeTextKit = {
  sizeKey: SizeKey;
  apply: SizeTextApply;
};

export type SizeViewStyle = Partial<Record<StyleState, ViewStyle>>;
export type SizeTextStyle = Partial<Record<StyleState, TextStyle>>;