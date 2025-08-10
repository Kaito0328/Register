import { ExtensionLifecycle, LifecycleUnit, SpecialLifeCycleUnit, TimeUnit, type NoteLifecycle } from './Note';

/**
 * テーマ設定の選択肢
 * - light: ライトモード
 * - dark: ダークモード
 * - system: OSの設定に追従
 */

export enum ThemeOption {
  Light = 'light',
  Dark = 'dark',
  System = 'system',
}

/**
 * アプリ全体の設定を保持する型
 */
export type AppSettings = {
  theme: ThemeOption;
  /**
   * ノートのデフォルトのライフサイクル設定
   */
  defaultLifecycle: NoteLifecycle;
  extensionLifecycle: ExtensionLifecycle;

  /**
   * ノート削除時に確認ダイアログを表示するか
   */
  confirmBeforeDelete: boolean;
};

export const defaultAppSettings: AppSettings = {
    theme: ThemeOption.System,
  defaultLifecycle: {
    unit: SpecialLifeCycleUnit.Forever,
    value: null,
  },
  extensionLifecycle: {
    unit: TimeUnit.Day,
    value: 1,
  },
  confirmBeforeDelete: true,
};