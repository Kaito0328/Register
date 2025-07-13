import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { AccountInfo } from '@/components/settings/AccountInfo';
import { SettingsSection } from '@/components/settings/SettingsSection';
import { ThemeSettingItem } from '@/components/settings/ThemeSettingItem';
import { DefaultLifecycleSettingItem } from '@/components/settings/DefaultLifecycleSettingItem';
// 他の設定項目コンポーネントもインポート

export default function SettingsScreen() {
  return (
    <>
      <Stack.Screen options={{ title: '設定' }} />
      <ScrollView style={styles.container}>
        <AccountInfo />

        <SettingsSection title="一般">
          <ThemeSettingItem />
          {/* 他の一般設定項目... */}
        </SettingsSection>

        <SettingsSection title="ノート">
          <DefaultLifecycleSettingItem />
          {/* <ConfirmDeleteSettingItem /> */}
        </SettingsSection>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f7', // テーマに応じて変更
  },
});
