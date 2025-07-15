
import { ThemeMode } from '@/styles/themeMode';
import { useColorScheme } from 'react-native';

/**
 * 現在のアプリケーションのカラースキーム（'light'または'dark'）を返すカスタムフック。
 * useColorSchemeがnullを返す場合（非常に稀なケース）は、'light'をフォールバックとします。
 */

export const useThemeColor = (): { themeMode: ThemeMode } => {
  const theme = useColorScheme();
  switch (theme) {
    case 'dark':
      return { themeMode: ThemeMode.Dark };
    case 'light':
      return { themeMode: ThemeMode.Light };
    default:
      return { themeMode: ThemeMode.Light }; // nullの場合はデフォルトでライト
  }
};