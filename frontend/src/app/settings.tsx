import React from 'react';
import { Alert, DevSettings, ScrollView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { AccountInfo } from '@/components/settings/AccountInfo';
import { SettingsSection } from '@/components/settings/SettingsSection';
import { ThemeSettingItem } from '@/components/settings/ThemeSettingItem';
import { DefaultLifecycleSetting } from '@/components/Lifecycle/DefaultLifecycleSetting';
import { useSettings } from '@/contexts/SettingsContext';
import { BaseView } from '@/base/BaseView';
import { CoreColorKey } from '@/styles/tokens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '@/components/Button';
import { View } from 'react-native';

export default function SettingsScreen() {
  const {settings, setDefaultLifecycle} = useSettings();

  const handleClearStorage = () => {
    Alert.alert(
      "ストレージをリセット",
      "すべてのノートと設定を削除して、アプリを再起動しますか？",
      [
        { text: "キャンセル", style: "cancel" },
        {
          text: "リセット",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.clear(); // AsyncStorageの全データを削除
            DevSettings.reload(); // アプリをリロード
          },
        },
      ]
    );
  };
  return (
    <>
      <Stack.Screen options={{ title: '設定' }} />
      {/* ★★★ 1. contentContainerStyle を追加 */}
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {/* ★★★ 2. BaseView に flex: 1 のスタイルを追加 */}
        <BaseView 
          style={styles.baseView} 
          styleKit={{ color: { colorKey: CoreColorKey.Base}}}
        >
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
          <SettingsSection title="開発用">
            <View style={styles.develop}>
              <Button styleKit={{color: {colorKey: CoreColorKey.Danger}}} onPress={handleClearStorage} >
                危険！！ ストレージをリセット
              </Button>
            </View>
          </SettingsSection>
        </BaseView>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // ★★★ 3. contentContainerStyle用のスタイルを追加
  contentContainer: {
    flexGrow: 1,
  },
  // ★★★ 4. BaseView用のスタイルを追加
  baseView: {
    flex: 1,
  },
  develop: {
    padding: 10,
  }
});
