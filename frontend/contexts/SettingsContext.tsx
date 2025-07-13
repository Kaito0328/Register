import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { defaultAppSettings, type AppSettings, type ThemeOption } from '@/types/Settings';
import type { NoteLifecycle } from '@/types/Note';
import { LifecycleUnit } from '@/types/Note';

const STORAGE_KEY = 'app_settings';

type SettingsContextType = {
  settings: AppSettings;
  setTheme: (theme: ThemeOption) => void;
  setDefaultLifecycle: (lifecycle: NoteLifecycle) => void;
  setConfirmBeforeDelete: (enabled: boolean) => void;
  isReady: boolean; // ★ 設定の読み込み完了を通知するフラグ
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [isReady, setIsReady] = useState(false);
  const [settings, setSettings] = useState<AppSettings>(defaultAppSettings);

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

  return (
    <SettingsContext.Provider value={{ settings, setTheme, setDefaultLifecycle, setConfirmBeforeDelete, isReady }}>
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
