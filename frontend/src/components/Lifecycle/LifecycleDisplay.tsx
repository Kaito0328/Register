import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, LayoutAnimation, Platform, UIManager, TouchableOpacity } from 'react-native';
import { BaseText } from '../../base/BaseText';
import { BaseTextInput } from '../../base/BaseTextInput';
import { Note, NoteLifecycle, RemainingTime, RemainingTimeSpecialStatus, SpecialLifeCycleUnit, TimeUnit } from '@/types/Note';
import { ColorViewProperty, CoreColorKey, RoundKey, SizeKey, SizeViewProperty } from '@/styles/tokens';
import { isValidLifecycle, getErrorMessage, getRemainingTime } from '@/utils/LifeCycleUtils';
import { LifeCycleUnitButton } from './LifeCycleUnitButton';
import { BaseView } from '../../base/BaseView';
import { ComponentStatus } from '@/types/ComponentStatus';

// AndroidでLayoutAnimationを有効にするための設定
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- 1. 表示用コンポーネント (LifecycleDisplay) ---

type DisplayProps = {
  lifecycle: NoteLifecycle;
  expiresAt: number | null;
  onSelectSpecialUnit: (unit: SpecialLifeCycleUnit) => void;
};

/**
 * 通常時に表示されるコンポーネント。残り時間と特殊設定ボタンを表示します。
 */
export const LifecycleDisplay: React.FC<DisplayProps> = ({ lifecycle, expiresAt, onSelectSpecialUnit }) => {
  const remaining = getRemainingTime(expiresAt); // 表示用に毎回計算

  const renderRemainingText = (time: RemainingTime) => {
    if (time.unit === RemainingTimeSpecialStatus.Forever) {
      return '🗑️ 無期限';
    }
    if (time.unit === RemainingTimeSpecialStatus.Expired) {
      return '🗑️ 期限切れ';
    }
    if (time.value === null) {
      return `🗓️ ${time.unit} 後に消去`;
    }
    return `⏳ ${time.value}${time.unit} 後に消去`;
  };

  return (
    <BaseView style={styles.displayContainer}>
      <View style={styles.remainingText}>
        <BaseText styleKit={{color: {colorKey: CoreColorKey.Base}}}>{renderRemainingText(remaining)}</BaseText>
      </View>
      <View style={styles.quickOptionsContainer}>
        <LifeCycleUnitButton
          unit={SpecialLifeCycleUnit.Today}
          isSelected={lifecycle.unit === SpecialLifeCycleUnit.Today}
          onPress={() => onSelectSpecialUnit(SpecialLifeCycleUnit.Today)}
        />
        <LifeCycleUnitButton
          unit={SpecialLifeCycleUnit.Forever}
          isSelected={lifecycle.unit === SpecialLifeCycleUnit.Forever}
          onPress={() => onSelectSpecialUnit(SpecialLifeCycleUnit.Forever)}
        />
      </View>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  displayContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  remainingText: {
    marginRight: 16,
  },
  quickOptionsContainer: {
    flexDirection: 'row',
    gap: 8,
  }
});