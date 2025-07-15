import React from 'react';
import { View, type ViewProps } from 'react-native';
import { PartialViewStyleKit, StyleState, useViewStyles, ViewStyleKit, viewStyleMaps } from '@/styles/component';
import { ColorViewProperty, CoreColorKey, SizeKey } from '@/styles/tokens';

const DEFAULT_VIEW_KIT: ViewStyleKit = {
  color: {
    colorKey: CoreColorKey.Base,
    apply: {
      default: [ColorViewProperty.Bg],
    },
  },
  size: {
    sizeKey: SizeKey.MD,
    apply: {
      default: [],
    },
  },
};

export type BaseViewProps = ViewProps & {
  styleKit?: PartialViewStyleKit;
};

export const BaseView: React.FC<BaseViewProps> = ({
  styleKit,
  style,
  ...props
}) => {
  const viewStyles = useViewStyles(DEFAULT_VIEW_KIT, styleKit, viewStyleMaps);

  return <View style={[viewStyles[StyleState.Default], style]} {...props} />;
};