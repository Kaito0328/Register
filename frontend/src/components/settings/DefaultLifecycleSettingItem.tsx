import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { BaseText } from '../../base/BaseText';
import { useSettings } from '@/contexts/SettingsContext';
import { LifecycleSettingsModal } from '../KebabMenu/LifecycleSettingsModal';
import type { NoteLifecycle } from '@/types/Note';
import { LifecycleUnit, SpecialLifeCycleUnit, TimeUnit } from '@/types/Note';

/**
 * ライフサイクルオブジェクトを人間が読める文字列に変換するヘルパー関数
 */
const formatLifecycle = (lifecycle: NoteLifecycle): string => {
  switch (lifecycle.unit) {
    case SpecialLifeCycleUnit.Forever:
      return "無期限";
    case SpecialLifeCycleUnit.Today:
      return "今日の終わりまで";
    case TimeUnit.Hour:
      return `${lifecycle.value} 時間`;
    case TimeUnit.Day:
      return `${lifecycle.value} 日`;
    case TimeUnit.Month:
      return `${lifecycle.value} ヶ月`;
    case TimeUnit.Year:
      return `${lifecycle.value} 年`;
    default:
      return "未設定";
  }
};

export const DefaultLifecycleSettingItem: React.FC = () => {
  const { settings, setDefaultLifecycle } = useSettings();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSave = (lifecycle: NoteLifecycle) => {
    setDefaultLifecycle(lifecycle);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={() => setModalVisible(true)}>
        <BaseText style={styles.label}>デフォルトのライフサイクル</BaseText>
        <View style={styles.valueContainer}>
          <BaseText style={styles.valueText}>
            {formatLifecycle(settings.defaultLifecycle)}
          </BaseText>
          <BaseText style={styles.arrow}>{'>'}</BaseText>
        </View>
      </TouchableOpacity>

      <LifecycleSettingsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
        currentLifecycle={settings.defaultLifecycle}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 16,
    color: 'gray',
    marginRight: 8,
  },
  arrow: {
    fontSize: 16,
    color: '#c7c7cc', // iOSの標準的な矢印の色
  },
});