import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BaseText } from '../base/BaseText';
import { useSettings } from '@/contexts/SettingsContext';
import { SegmentedControl } from './SegmentedControl'; // 再利用可能なUI部品として仮定

// SegmentedControlは別途作成するか、ライブラリを使用
// ここでは仮の実装
const options = [
  { label: 'ライト', value: 'light' },
  { label: 'ダーク', value: 'dark' },
  { label: 'システム', value: 'system' },
];

export const ThemeSettingItem: React.FC = () => {
  const { settings, setTheme } = useSettings();

  return (
    <View style={styles.container}>
      <BaseText style={styles.label}>テーマ</BaseText>
      <SegmentedControl
        options={options}
        selectedValue={settings.theme}
        onValueChange={(value) => setTheme(value as any)}
      />
    </View>
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
});
