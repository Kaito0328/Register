import { useMemo } from 'react';
import { SizeTextKit, SizeTextMap, SizeTextStyle, SizeViewKit, SizeViewMap, SizeViewStyle } from '.';
import { StyleState } from '../../component';
import { TextStyle, ViewStyle } from 'react-native';

export const useViewSizeStyle = (
  kit: SizeViewKit,
  map: SizeViewMap
): SizeViewStyle => {
  return useMemo(() => {
    const { sizeKey, apply, fullWidth } = kit;
    const finalStyle: SizeViewStyle = {};

    const sizeStateMap = map[sizeKey];
    if (!sizeStateMap) return {};

    for (const state in apply) {
      const typedState = state as StyleState;
      const propertiesToApply = apply[typedState];
      const sizeSlot = sizeStateMap[typedState];

      if (!propertiesToApply || !sizeSlot) continue;

      const combinedStyle: ViewStyle = {};
      for (const prop of propertiesToApply) {
        const value = sizeSlot[prop];
        if (value !== undefined) {
          // SizeViewPropertyの各ケースをViewStyleのプロパティに割り当てる
          (combinedStyle as any)[prop] = value;
        }
      }
      finalStyle[typedState] = combinedStyle;
    }

    // fullWidthがtrueの場合、すべての状態にwidth: '100%'を適用
    if (fullWidth) {
      for (const state in finalStyle) {
        finalStyle[state as StyleState]!.width = '100%';
      }
    }

    return finalStyle;
  }, [kit, map]);
};

export const useTextSizeStyle = (
  kit: SizeTextKit,
  map: SizeTextMap
): SizeTextStyle => {
  return useMemo(() => {
    const { sizeKey, apply } = kit;
    const finalStyle: SizeTextStyle = {};

    const sizeStateMap = map[sizeKey];
    if (!sizeStateMap) return {};

    for (const state in apply) {
      const typedState = state as StyleState;
      const propertiesToApply = apply[typedState];
      const sizeSlot = sizeStateMap[typedState];

      if (!propertiesToApply || !sizeSlot) continue;

      const combinedStyle: TextStyle = {};
      for (const prop of propertiesToApply) {
        const value = sizeSlot[prop];
        if (value !== undefined) {
          // SizeTextPropertyの各ケースをTextStyleのプロパティに割り当てる
          (combinedStyle as any)[prop] = value;
        }
      }
      finalStyle[typedState] = combinedStyle;
    }

    return finalStyle;
  }, [kit, map]);
};