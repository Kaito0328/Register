import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { AccountInfo } from '@/components/settings/AccountInfo';
import { SettingsSection } from '@/components/settings/SettingsSection';
import { ThemeSettingItem } from '@/components/settings/ThemeSettingItem';
import { LifecycleSetting } from '@/components/Lifecycle/LifeCycleSetting';
import { DefaultLifecycleSetting } from '@/components/Lifecycle/DefaultLifecycleSetting';
import { useSettings } from '@/contexts/SettingsContext';
import { BaseView } from '@/base/BaseView';
import { CoreColorKey } from '@/styles/tokens';
// 他の設定項目コンポーネントもインポート

export default function SettingsScreen() {
  const {settings, setDefaultLifecycle} = useSettings();
  return (
    <>
      <Stack.Screen options={{ title: '設定' }} />
      <ScrollView style={styles.container}>
        <BaseView styleKit={{ color: { colorKey: CoreColorKey.Base}}}>
        <AccountInfo />

        <SettingsSection title="一般">
          <ThemeSettingItem />
          {/* 他の一般設定項目... */}
        </SettingsSection>

        <SettingsSection title="ノート">
          <DefaultLifecycleSetting
            defaultLifecycle={settings.defaultLifecycle}
            saveDefaultLifecycle={setDefaultLifecycle}
          />
        </SettingsSection>
        </BaseView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
});
