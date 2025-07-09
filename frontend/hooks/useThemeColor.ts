import { useColorScheme } from 'react-native';

/**
 * 現在のアプリケーションのカラースキーム（'light'または'dark'）を返すカスタムフック。
 * useColorSchemeがnullを返す場合（非常に稀なケース）は、'light'をフォールバックとします。
 */
export const useThemeColor = (): 'light' | 'dark' => {
  const theme = useColorScheme() ?? 'light';
  return theme;
};