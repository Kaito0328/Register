import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultAppSettings, ThemeOption, type AppSettings } from '@/types/Settings';
import type { ExtensionLifecycle, NoteLifecycle } from '@/types/Note';
import { LifecycleUnit } from '@/types/Note';
import { ThemeMode } from '@/styles/themeMode';
import { useColorScheme } from 'react-native';

const STORAGE_KEY = 'app_settings';

type SettingsContextType = {
  settings: AppSettings;
  themeMode: ThemeMode; // ★ 現在のテーマモードを提供
  setTheme: (theme: ThemeOption) => void;
  setDefaultLifecycle: (lifecycle: NoteLifecycle) => void;
  setConfirmBeforeDelete: (enabled: boolean) => void;
  setExtensionLifecycle: (lifecycle: ExtensionLifecycle) => void;
  isReady: boolean; // ★ 設定の読み込み完了を通知するフラグ
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isReady, setIsReady] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(defaultAppSettings);
  const [themeMode, setThemeMode] = useState<ThemeMode>(ThemeMode.Light);
  const systemTheme = useColorScheme();

  useEffect(() => {
     const option = settings.theme;
  if (option === ThemeOption.System) {
      // "System"が選択されている場合は、OSの設定に従う
  setThemeMode(systemTheme === 'dark' ? ThemeMode.Dark : ThemeMode.Light);
  } else {
      // "Light" or "Dark"が明示的に選択されている場合
   setThemeMode(option === ThemeOption.Dark ? ThemeMode.Dark : ThemeMode.Light);
  }
  }, [settings.theme, systemTheme]);

  // 初回起動時にAsyncStorageから設定を読み込む
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const storedSettings = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedSettings) {
          setSettings(JSON.parse(storedSettings));
        }
      } catch (e) {
        console.error('Failed to load settings.', e);
      } finally {
        setIsReady(true);
      }
    };
    loadSettings();
  }, []);

  // settingsが変更されたらAsyncStorageに保存
  useEffect(() => {
    // isReadyがtrueの時だけ保存（初回ロード時にデフォルト値で上書きしないように）
    if (isReady) {
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    }
  }, [settings, isReady]);

  const setTheme = useCallback((theme: ThemeOption) => {
    setSettings((prev) => ({ ...prev, theme }));
  }, []);

  const setDefaultLifecycle = useCallback((lifecycle: NoteLifecycle) => {
    setSettings((prev) => ({ ...prev, defaultLifecycle: lifecycle }));
  }, []);

  const setConfirmBeforeDelete = useCallback((enabled: boolean) => {
    setSettings((prev) => ({ ...prev, confirmBeforeDelete: enabled }));
  }, []);

  const setExtensionLifecycle = useCallback((lifecycle: ExtensionLifecycle) => {
    setSettings((prev) => ({ ...prev, extensionLifecycle: lifecycle }));
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, themeMode, setTheme, setDefaultLifecycle, setConfirmBeforeDelete, setExtensionLifecycle, isReady }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
