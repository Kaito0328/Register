import { ColorTextMap, ColorTextProperty, ColorValueMap, ColorValueProperty, ColorViewMap, ColorViewProperty, CoreColorKey } from ".";
import { StyleState } from "@/styles/component";
import { ThemeMode } from "../../themeMode";

export const defaultColorViewMap: ColorViewMap = {
  [ThemeMode.Light]: {
    [CoreColorKey.Primary]: {
      [StyleState.Default]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#C4E4A5' },
      },
    },
    [CoreColorKey.Secondary]: {
      [StyleState.Default]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#F0F0F0' },
      },
    },
    [CoreColorKey.Base]: {
      [StyleState.Default]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#FFFFFF' },
      },
    },
  },
  [ThemeMode.Dark]: {
    [CoreColorKey.Primary]: {
      [StyleState.Default]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#A8D88A' },
      },
    },
    [CoreColorKey.Secondary]: {
      [StyleState.Default]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#2C2C2E' },
      },
    },
    [CoreColorKey.Base]: {
      [StyleState.Default]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#1C1C1E' },
      },
    },
  },
};

export const pressableColorViewMap: ColorViewMap = {
  [ThemeMode.Light]: {
    [CoreColorKey.Primary]: {
      ...defaultColorViewMap[ThemeMode.Light][CoreColorKey.Primary],
      [StyleState.Pressed]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#A8D88A' }, // 少し濃く
      },
      [StyleState.Disabled]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#E8F0E8' }, // 無効色
      },
    },
    [CoreColorKey.Secondary]: {
      ...defaultColorViewMap[ThemeMode.Light][CoreColorKey.Secondary],
      [StyleState.Pressed]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#E0E0E0' },
      },
      [StyleState.Disabled]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#F5F5F5' },
      },
    },
  },
  [ThemeMode.Dark]: {
    [CoreColorKey.Primary]: {
      ...defaultColorViewMap[ThemeMode.Dark][CoreColorKey.Primary],
      [StyleState.Pressed]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#C4E4A5' }, // 少し明るく
      },
      [StyleState.Disabled]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#2C2C2E' }, // 無効色
      },
    },
    [CoreColorKey.Secondary]: {
      ...defaultColorViewMap[ThemeMode.Dark][CoreColorKey.Secondary],
      [StyleState.Pressed]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#3A3A3C' },
      },
      [StyleState.Disabled]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#1C1C1E' },
      },
    },
  },
};

export const defaultColorTextMap: ColorTextMap = {
  [ThemeMode.Light]: {
    // Primaryボタンの上の文字など、主要なアクションを示す文字色
    [CoreColorKey.Primary]: {
      [StyleState.Default]: {
        [ColorTextProperty.Text]: { color: '#3E4A3E' },
      },
    },
    // 基本的な文字色
    [CoreColorKey.Base]: {
      [StyleState.Default]: {
        [ColorTextProperty.Text]: { color: '#3E4A3E' },
      },
      [StyleState.Disabled]: {
        [ColorTextProperty.Text]: { color: '#A8B0A8' },
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
        [ColorTextProperty.Text]: { color: '#3E4A3E' },
      },
    },
    [CoreColorKey.Base]: {
      [StyleState.Default]: {
        [ColorTextProperty.Text]: { color: '#E8F0E8' },
      },
      [StyleState.Disabled]: {
        [ColorTextProperty.Text]: { color: '#6E786E' },
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
        [ColorValueProperty.Icon]: '#3E4A3E',
      },
    },
    [CoreColorKey.Base]: {
      [StyleState.Default]: {
        [ColorValueProperty.Border]: '#D0D0D0',
        [ColorValueProperty.Icon]: '#5E6B5E',
      },
      [StyleState.Disabled]: {
        [ColorValueProperty.Icon]: '#A8B0A8',
      },
    },
  },
  [ThemeMode.Dark]: {
    [CoreColorKey.Primary]: {
      [StyleState.Default]: {
        [ColorValueProperty.Icon]: '#3E4A3E',
      },
    },
    [CoreColorKey.Base]: {
      [StyleState.Default]: {
        [ColorValueProperty.Border]: '#4A4A4E',
        [ColorValueProperty.Icon]: '#B8C0B8',
      },
      [StyleState.Disabled]: {
        [ColorValueProperty.Icon]: '#6E786E',
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
        [ColorValueProperty.Placeholder]: '#A8B0A8',
        [ColorValueProperty.Selection]: '#C4E4A5', // PrimaryColor
      },
      [StyleState.Focus]: {
        [ColorValueProperty.Border]: '#A8D88A', // PrimaryColorの濃い方
      },
      [StyleState.Disabled]: {
        [ColorValueProperty.Border]: '#E0E0E0',
      },
    },
  },
  [ThemeMode.Dark]: {
    [CoreColorKey.Base]: {
      ...defaultColorValueMap[ThemeMode.Dark][CoreColorKey.Base],
      [StyleState.Default]: {
        ...defaultColorValueMap[ThemeMode.Dark][CoreColorKey.Base]?.[StyleState.Default],
        [ColorValueProperty.Placeholder]: '#6E786E',
        [ColorValueProperty.Selection]: '#A8D88A', // PrimaryColor
      },
      [StyleState.Focus]: {
        [ColorValueProperty.Border]: '#C4E4A5', // PrimaryColorの明るい方
      },
      [StyleState.Disabled]: {
        [ColorValueProperty.Border]: '#3A3A3C',
      },
    },
  },
};