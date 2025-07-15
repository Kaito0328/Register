import { ColorTextMap, ColorTextProperty, ColorValueMap, ColorValueProperty, ColorViewMap, ColorViewProperty, CoreColorKey } from ".";
import { StyleState } from "@/styles/component";
import { ThemeMode } from "../../themeMode";

export const defaultColorViewMap: ColorViewMap = {
  [ThemeMode.Light]: {
    [CoreColorKey.Primary]: {
      [StyleState.Default]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#BEEBBA' }, // 明るく鮮やかな黄緑
      },
    },
    [CoreColorKey.Secondary]: {
      [StyleState.Default]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#E6F5E6' }, // さらに薄い黄緑
      },
    },
    [CoreColorKey.Base]: {
      [StyleState.Default]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#F8FCF8' }, // ほぼ白に近い緑がかった背景
      },
    },
  },
  [ThemeMode.Dark]: {
    [CoreColorKey.Primary]: {
      [StyleState.Default]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#355338ff' }, // 【変更】少し明るめの深い緑に変更
      },
    },
    [CoreColorKey.Secondary]: {
      [StyleState.Default]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#495649ff' }, // 【変更】Primaryに合わせて少し明るく
      },
    },
    [CoreColorKey.Base]: {
      [StyleState.Default]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#1d241dff' }, // 【変更】全体のトーンに合わせて少し明るく
      },
    },
  },
};

export const pressableColorViewMap: ColorViewMap = {
  [ThemeMode.Light]: {
    [CoreColorKey.Primary]: {
      ...defaultColorViewMap[ThemeMode.Light][CoreColorKey.Primary],
      [StyleState.Pressed]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#A8D8A4' }, // 少し濃く
      },
      [StyleState.Disabled]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#E0EAE0' }, // 無効色
      },
    },
    [CoreColorKey.Secondary]: {
      ...defaultColorViewMap[ThemeMode.Light][CoreColorKey.Secondary],
      [StyleState.Pressed]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#D0E0D0' },
      },
      [StyleState.Disabled]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#F0F5F0' },
      },
    },
  },
  [ThemeMode.Dark]: {
    [CoreColorKey.Primary]: {
      ...defaultColorViewMap[ThemeMode.Dark][CoreColorKey.Primary],
      [StyleState.Pressed]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#5C9B56' }, // 【変更】新しいPrimaryより少し明るく
      },
      [StyleState.Disabled]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#3A5A3A' }, // 【変更】無効色のトーンを調整
      },
    },
    [CoreColorKey.Secondary]: {
      ...defaultColorViewMap[ThemeMode.Dark][CoreColorKey.Secondary],
      [StyleState.Pressed]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#4A5B4A' }, // 【変更】新しいSecondaryに合わせて調整
      },
      [StyleState.Disabled]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#344034' }, // 【変更】無効色のトーンを調整
      },
    },
  },
};

export const defaultColorTextMap: ColorTextMap = {
  [ThemeMode.Light]: {
    // Primaryボタンの上の文字など
    [CoreColorKey.Primary]: {
      [StyleState.Default]: {
        [ColorTextProperty.Text]: { color: '#2A3F2A' }, // 濃い緑がかったグレー
      },
    },
    // 基本的な文字色
    [CoreColorKey.Base]: {
      [StyleState.Default]: {
        [ColorTextProperty.Text]: { color: '#2A3F2A' }, // 濃い緑がかったグレー
      },
      [StyleState.Disabled]: {
        [ColorTextProperty.Text]: { color: '#8A9A8A' }, // 薄い緑がかったグレー
      },
    },
    // エラーメッセージなど
    [CoreColorKey.Danger]: {
      [StyleState.Default]: {
        [ColorTextProperty.Text]: { color: '#D32F2F' },
      },
    },
  },
  [ThemeMode.Dark]: {
    [CoreColorKey.Primary]: {
      [StyleState.Default]: {
        [ColorTextProperty.Text]: { color: '#E8F5E9' }, // 【変更】背景に合わせて視認性の高い、より明るい色に
      },
    },
    [CoreColorKey.Base]: {
      [StyleState.Default]: {
        [ColorTextProperty.Text]: { color: '#E8F5E9' }, // 【変更】こちらも同様に明るく
      },
      [StyleState.Disabled]: {
        [ColorTextProperty.Text]: { color: '#7A8A7A' }, // 【変更】背景に合わせて少し明るく
      },
    },
    [CoreColorKey.Danger]: {
      [StyleState.Default]: {
        [ColorTextProperty.Text]: { color: '#EF9A9A' },
      },
    },
  },
};

export const defaultColorValueMap: ColorValueMap = {
  [ThemeMode.Light]: {
    [CoreColorKey.Primary]: {
      [StyleState.Default]: {
        [ColorValueProperty.Icon]: '#2A3F2A', // テキスト色と統一
      },
    },
    [CoreColorKey.Base]: {
      [StyleState.Default]: {
        [ColorValueProperty.Border]: '#C0D0C0',
        [ColorValueProperty.Icon]: '#4A5A4A',
      },
      [StyleState.Disabled]: {
        [ColorValueProperty.Icon]: '#8A9A8A', // テキスト無効色と統一
      },
    },
  },
  [ThemeMode.Dark]: {
    [CoreColorKey.Primary]: {
      [StyleState.Default]: {
        [ColorValueProperty.Icon]: '#E8F5E9', // 【変更】テキスト色と統一
      },
    },
    [CoreColorKey.Base]: {
      [StyleState.Default]: {
        [ColorValueProperty.Border]: '#5A6A5A', // 【変更】背景色との区別をしやすく
        [ColorValueProperty.Icon]: '#C8D8C8',   // 【変更】背景に合わせて少し明るく
      },
      [StyleState.Disabled]: {
        [ColorValueProperty.Icon]: '#7A8A7A', // 【変更】テキスト無効色と統一
      },
    },
  },
};

export const textInputColorValueMap: ColorValueMap = {
  [ThemeMode.Light]: {
    [CoreColorKey.Base]: {
      ...defaultColorValueMap[ThemeMode.Light][CoreColorKey.Base],
      [StyleState.Default]: {
        ...defaultColorValueMap[ThemeMode.Light][CoreColorKey.Base]?.[StyleState.Default],
        [ColorValueProperty.Placeholder]: '#8A9A8A', // テキスト無効色と統一
        [ColorValueProperty.Selection]: '#BEEBBA', // PrimaryColor
      },
      [StyleState.Focus]: {
        [ColorValueProperty.Border]: '#A8D8A4', // PrimaryColorの濃い方
      },
      [StyleState.Disabled]: {
        [ColorValueProperty.Border]: '#D0E0D0',
      },
    },
  },
  [ThemeMode.Dark]: {
    [CoreColorKey.Base]: {
      ...defaultColorValueMap[ThemeMode.Dark][CoreColorKey.Base],
      [StyleState.Default]: {
        ...defaultColorValueMap[ThemeMode.Dark][CoreColorKey.Base]?.[StyleState.Default],
        [ColorValueProperty.Placeholder]: '#7A8A7A', // 【変更】テキスト無効色と統一
        [ColorValueProperty.Selection]: '#4A7B46',   // 【変更】新しいPrimaryColorに
      },
      [StyleState.Focus]: {
        [ColorValueProperty.Border]: '#5C9B56', // 【変更】PrimaryのPressed色と合わせて分かりやすく
      },
      [StyleState.Disabled]: {
        [ColorValueProperty.Border]: '#4A5B4A', // 【変更】トーンを合わせて調整
      },
    },
  },
};