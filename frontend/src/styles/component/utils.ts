// style/component/utils.ts または hooks.ts の上部

import { ViewStyleKit, TextStyleKit, PartialViewStyleKit, PartialTextStyleKit } from './types';

// ViewStyleKit用のマージ関数
export const mergeViewStyleKits = (
  defaultKit: ViewStyleKit,
  overrideKit?: PartialViewStyleKit
): ViewStyleKit => {
  if (!overrideKit) return defaultKit;

  return {
    color: {
      ...defaultKit.color,
      ...overrideKit.color,
      apply: { ...defaultKit.color.apply, ...overrideKit?.color?.apply },
    },
    size: defaultKit.size?.sizeKey ?  {
      ...defaultKit.size,
      ...overrideKit.size,
      sizeKey: defaultKit.size?.sizeKey,
      apply: { ...defaultKit?.size?.apply, ...overrideKit?.size?.apply },
    }  : overrideKit.size?.sizeKey ? {
      ...defaultKit.size,
      ...overrideKit.size,
      sizeKey: overrideKit.size.sizeKey,
      apply: { ...defaultKit?.size?.apply, ...overrideKit?.size?.apply },
    } : undefined,
    roundKey: overrideKit.roundKey ?? defaultKit.roundKey,
    shadowKey: overrideKit.shadowKey ?? defaultKit.shadowKey,
  };
};

// TextStyleKit用のマージ関数
export const mergeTextStyleKits = (
  defaultKit: TextStyleKit,
  overrideKit?: PartialTextStyleKit
): TextStyleKit => {
  if (!overrideKit) return defaultKit;
  
  return {
    color: {
      ...defaultKit.color,
      ...overrideKit.color,
      apply: { ...defaultKit.color.apply, ...overrideKit?.color?.apply },
    },
    size: {
      ...defaultKit.size,
      ...overrideKit.size,
      apply: { ...defaultKit.size.apply, ...overrideKit?.size?.apply },
    },
    fontWeightKey: overrideKit.fontWeightKey ?? defaultKit.fontWeightKey,
  };
};