import { SizeMap, SizeProperty } from '@/style/size';

export const defaultSizeMap: SizeMap = {
  sm: {
    [SizeProperty.Text]: 12,
    [SizeProperty.Padding]: 8,
    [SizeProperty.Margin]: 4,
    [SizeProperty.Gap]: 4,
  },
  md: {
    [SizeProperty.Text]: 16,
    [SizeProperty.Padding]: 12,
    [SizeProperty.Margin]: 8,
    [SizeProperty.Gap]: 8,
  },
  lg: {
    [SizeProperty.Text]: 20,
    [SizeProperty.Padding]: 16,
    [SizeProperty.Margin]: 12,
    [SizeProperty.Gap]: 12,
  },
  xl: {
    [SizeProperty.Text]: 28,
    [SizeProperty.Padding]: 20,
    [SizeProperty.Margin]: 16,
    [SizeProperty.Gap]: 16,
  },
};