import { defaultColorMap } from '../defaults/defaultColorMap';
import { CoreColorKey } from '@/style/color';
import type { ColorThemeMap } from '@/style/color';

// --- ライトモード ---
// defaultColorMapをディープコピーして、安全に変更できるようにする
const lightInput: ColorThemeMap = JSON.parse(
  JSON.stringify(defaultColorMap.light)
);

// Baseキーのborderスタイルを取得（存在しない場合は空のオブジェクトをデフォルトにする）
const lightBaseBorder = lightInput[CoreColorKey.Base].border ?? { default: {} };

// 新しいborderスタイルを構築
lightInput[CoreColorKey.Base].border = {
  // 元のスタイル（default, active, loading）はそのまま維持する
  ...lightBaseBorder,
  // focus時のスタイルを上書きまたは追加する
  focus: { borderColor: '#BCCF82' },
};

// TextInputの背景は常に白にするなど、独自のルールを追加
lightInput[CoreColorKey.Base].bg = {
  default: { backgroundColor: '#FFFFFF' },
};


// --- ダークモード ---
const darkInput: ColorThemeMap = JSON.parse(
  JSON.stringify(defaultColorMap.dark)
);

const darkBaseBorder = darkInput[CoreColorKey.Base].border ?? { default: {} };

darkInput[CoreColorKey.Base].border = {
  ...darkBaseBorder,
  focus: { borderColor: '#BCCF82' },
};

darkInput[CoreColorKey.Base].bg = {
  default: { backgroundColor: '#2C2C2E' },
};


// --- 最終的なエクスポート ---
export const textInputColorMap = {
  light: lightInput,
  dark: darkInput,
};

import { defaultSizeMap } from '../defaults/defaultSizeMap';
import { defaultRoundMap } from '../defaults/defaultRoundMap';
import { defaultFontWeightMap } from '../defaults/defaultFontWeightMap';

export const textInputStyleMaps = {
  colorMap: textInputColorMap,
  sizeMap: defaultSizeMap,
  roundMap: defaultRoundMap,
  // shadowMap: undefined, // TextInputに影は通常不要
  fontWeightMap: defaultFontWeightMap,
};