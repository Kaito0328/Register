import { ColorTextMap, ColorTextProperty, ColorValueMap, ColorValueProperty, ColorViewMap, ColorViewProperty, CoreColorKey } from "./types";
import { StyleState } from "@/styles/component/types";
import { ThemeMode } from "../../themeMode";

// ★★★ 基本となるコンポーネントの背景色マップ
export const defaultColorViewMap: ColorViewMap = {
  [ThemeMode.Light]: {
    [CoreColorKey.Primary]: {
      [StyleState.Default]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#A5D6A7' }, // 少し彩度を抑えた目に優しい緑
      },
    },
    [CoreColorKey.Secondary]: {
      [StyleState.Default]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#C8E6C9' }, // Primaryより薄い緑
      },
    },
    [CoreColorKey.Base]: {
      [StyleState.Default]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#F1F8E9' }, // ほんのり緑がかったニュートラルな背景
      },
    },
    [CoreColorKey.Danger]: {
      [StyleState.Default]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#EF5350' }, // モダンな赤
      },
    },
    [CoreColorKey.Success]: {
      [StyleState.Default]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#66BB6A' }, // Primaryと調和する成功色
      },  
    },
  },
  [ThemeMode.Dark]: {
    [CoreColorKey.Primary]: {
      [StyleState.Default]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#386641' }, // 深みのある森のような緑
      },
    },
    [CoreColorKey.Secondary]: {
      [StyleState.Default]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#435244' }, // 少しグレーがかった緑
      },
    },
    [CoreColorKey.Base]: {
      [StyleState.Default]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#1B231C' }, // 黒に近く緑のニュアンスを感じる背景
      },
    },
    [CoreColorKey.Danger]: {
      [StyleState.Default]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#E57373' }, // ダークテーマで映える明るめの赤
      },
    },
    [CoreColorKey.Success]: {
      [StyleState.Default]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#4CAF50' }, // ダークテーマで視認しやすい緑
      },
    },
  },
};

// ★★★ ボタンなど、押せるコンポーネント用の背景色マップ
export const pressableColorViewMap: ColorViewMap = {
  [ThemeMode.Light]: {
    [CoreColorKey.Primary]: {
      ...defaultColorViewMap[ThemeMode.Light][CoreColorKey.Primary],
      [StyleState.Pressed]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#81C784' }, // 押した時に少し濃く
      },
      [StyleState.Disabled]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#E8F5E9' }, // 無効色は薄く
      },
    },
    [CoreColorKey.Secondary]: {
      ...defaultColorViewMap[ThemeMode.Light][CoreColorKey.Secondary],
      [StyleState.Pressed]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#A5D6A7' },
      },
      [StyleState.Disabled]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#E8F5E9' },
      },
    },
    [CoreColorKey.Base]: {
      ...defaultColorViewMap[ThemeMode.Light][CoreColorKey.Base],
      [StyleState.Pressed]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#E0E0E0' },
      },
      [StyleState.Disabled]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#F5F5F5' },
      },
    },
    [CoreColorKey.Danger]: {
      ...defaultColorViewMap[ThemeMode.Light][CoreColorKey.Danger],
      [StyleState.Pressed]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#E53935' },
      },
      [StyleState.Disabled]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#E8F5E9' },
      },
    },
    [CoreColorKey.Success]: {
      ...defaultColorViewMap[ThemeMode.Light][CoreColorKey.Success],
      [StyleState.Pressed]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#4CAF50' },
      },
      [StyleState.Disabled]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#E8F5E9' },
      },
    },
  },
  [ThemeMode.Dark]: {
    [CoreColorKey.Primary]: {
      ...defaultColorViewMap[ThemeMode.Dark][CoreColorKey.Primary],
      [StyleState.Pressed]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#4CAF50' }, // 押した時に少し明るく
      },
      [StyleState.Disabled]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#2E4B31' }, 
      },
    },
    [CoreColorKey.Secondary]: {
      ...defaultColorViewMap[ThemeMode.Dark][CoreColorKey.Secondary],
      [StyleState.Pressed]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#546E7A' },
      },
      [StyleState.Disabled]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#37474F' },
      },
    },
    [CoreColorKey.Base]: {
        ...defaultColorViewMap[ThemeMode.Dark][CoreColorKey.Base],
        [StyleState.Pressed]: {
          [ColorViewProperty.Bg]: { backgroundColor: '#2C3A2D' },
        },
        [StyleState.Disabled]: {
          [ColorViewProperty.Bg]: { backgroundColor: '#212121' },
        },
      },
      [CoreColorKey.Danger]: {
        ...defaultColorViewMap[ThemeMode.Dark][CoreColorKey.Danger],
        [StyleState.Pressed]: {
          [ColorViewProperty.Bg]: { backgroundColor: '#F44336' },
        },
        [StyleState.Disabled]: {
          [ColorViewProperty.Bg]: { backgroundColor: '#2E4B31' },
        },
      },
      [CoreColorKey.Success]: {
        ...defaultColorViewMap[ThemeMode.Dark][CoreColorKey.Success],
        [StyleState.Pressed]: {
          [ColorViewProperty.Bg]: { backgroundColor: '#66BB6A' },
        },
        [StyleState.Disabled]: {
          [ColorViewProperty.Bg]: { backgroundColor: '#2E4B31' },
        },
      },
  },
};

// ★★★ テキスト入力用の背景色マップ
export const textInputColorViewMap: ColorViewMap = {
  [ThemeMode.Light]: {
    [CoreColorKey.Base]: {
      [StyleState.Default]: defaultColorViewMap[ThemeMode.Light]?.[CoreColorKey.Base]?.[StyleState.Default],
      [StyleState.Focus]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#FFFFFF' }, // フォーカス時はクリーンな白に
      },
      [StyleState.Disabled]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#F5F5F5' },
      },
    },
    [CoreColorKey.Primary]: {
      [StyleState.Default]: defaultColorViewMap[ThemeMode.Light]?.[CoreColorKey.Primary]?.[StyleState.Default],
      [StyleState.Focus]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#E8F5E9' }, 
      },
      [StyleState.Disabled]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#E8F5E9' },
      },
    },
    [CoreColorKey.Secondary]: {
        [StyleState.Default]: defaultColorViewMap[ThemeMode.Light]?.[CoreColorKey.Secondary]?.[StyleState.Default],
        [StyleState.Focus]: {
            [ColorViewProperty.Bg]: { backgroundColor: '#E8F5E9' },
        },
        [StyleState.Disabled]: {
            [ColorViewProperty.Bg]: { backgroundColor: '#F5F5F5' },
        },
    },
  },
  [ThemeMode.Dark]: {
    [CoreColorKey.Base]: {
      [StyleState.Default]: defaultColorViewMap[ThemeMode.Dark]?.[CoreColorKey.Base]?.[StyleState.Default],
      [StyleState.Focus]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#2C3A2D' }, // フォーカス時は少し明るく
      },
      [StyleState.Disabled]: {
        [ColorViewProperty.Bg]: { backgroundColor: '#212121' },
      },
    },
    [CoreColorKey.Primary]: {
        [StyleState.Default]: defaultColorViewMap[ThemeMode.Dark]?.[CoreColorKey.Primary]?.[StyleState.Default],
        [StyleState.Focus]: {
            [ColorViewProperty.Bg]: { backgroundColor: '#2E4B31' },
        },
        [StyleState.Disabled]: {
            [ColorViewProperty.Bg]: { backgroundColor: '#212121' },
        },
    },
    [CoreColorKey.Secondary]: {
        [StyleState.Default]: defaultColorViewMap[ThemeMode.Dark]?.[CoreColorKey.Secondary]?.[StyleState.Default],
        [StyleState.Focus]: {
            [ColorViewProperty.Bg]: { backgroundColor: '#37474F' },
        },
        [StyleState.Disabled]: {
            [ColorViewProperty.Bg]: { backgroundColor: '#212121' },
        },
    },
  },
};

// ★★★ 基本となるテキストの色マップ
export const defaultColorTextMap: ColorTextMap = {
  [ThemeMode.Light]: {
    [CoreColorKey.Primary]: {
      [StyleState.Default]: {
        [ColorTextProperty.Text]: { color: '#1B5E20' }, // コントラスト比を確保した濃い緑
      },
    },
    [CoreColorKey.Base]: {
      [StyleState.Default]: {
        [ColorTextProperty.Text]: { color: '#212121' }, // 標準テキストは黒に近い色
      },
      [StyleState.Disabled]: {
        [ColorTextProperty.Text]: { color: '#BDBDBD' },
      },
    },
    [CoreColorKey.Secondary]: {
      [StyleState.Default]: {
        [ColorTextProperty.Text]: { color: '#757575' }, // 少し薄いグレー
      },
      [StyleState.Disabled]: {
        [ColorTextProperty.Text]: { color: '#BDBDBD' },
      },
    },
    [CoreColorKey.Danger]: {
      [StyleState.Default]: {
        [ColorTextProperty.Text]: { color: '#D32F2F' },
      },
    },
    [CoreColorKey.Success]: {
      [StyleState.Default]: {
        [ColorTextProperty.Text]: { color: '#388E3C' },
      },
    },
  },
  [ThemeMode.Dark]: {
    [CoreColorKey.Primary]: {
      [StyleState.Default]: {
        [ColorTextProperty.Text]: { color: '#C8E6C9' }, // 濃い背景でも読める明るい緑
      },
    },
    [CoreColorKey.Base]: {
      [StyleState.Default]: {
        [ColorTextProperty.Text]: { color: '#FAFAFA' }, // 標準テキストは白に近い色
      },
      [StyleState.Disabled]: {
        [ColorTextProperty.Text]: { color: '#616161' },
      },
    },
    [CoreColorKey.Secondary]: {
      [StyleState.Default]: {
        [ColorTextProperty.Text]: { color: '#BDBDBD' }, // 少し暗い白
      },
      [StyleState.Disabled]: {
        [ColorTextProperty.Text]: { color: '#616161' },
      },
    },
    [CoreColorKey.Danger]: {
      [StyleState.Default]: {
        [ColorTextProperty.Text]: { color: '#EF9A9A' },
      },
    },
    [CoreColorKey.Success]: {
      [StyleState.Default]: {
        [ColorTextProperty.Text]: { color: '#A5D6A7' },
      },
    },
  },
};

// ★★★ アイコンや境界線など、単一の色値のマップ
export const defaultColorValueMap: ColorValueMap = {
  [ThemeMode.Light]: {
    [CoreColorKey.Primary]: {
      [StyleState.Default]: {
        [ColorValueProperty.Icon]: '#1B5E20', // テキスト色と統一
      },
    },
    [CoreColorKey.Base]: {
      [StyleState.Default]: {
        [ColorValueProperty.Border]: '#BDBDBD',
        [ColorValueProperty.Icon]: '#757575',
      },
      [StyleState.Disabled]: {
        [ColorValueProperty.Icon]: '#BDBDBD',
      },
    },
  },
  [ThemeMode.Dark]: {
    [CoreColorKey.Primary]: {
      [StyleState.Default]: {
        [ColorValueProperty.Icon]: '#C8E6C9', // テキスト色と統一
      },
    },
    [CoreColorKey.Base]: {
      [StyleState.Default]: {
        [ColorValueProperty.Border]: '#424242',
        [ColorValueProperty.Icon]: '#BDBDBD',
      },
      [StyleState.Disabled]: {
        [ColorValueProperty.Icon]: '#616161',
      },
    },
  },
};

// ★★★ テキスト入力用の単一の色値のマップ
export const textInputColorValueMap: ColorValueMap = {
  [ThemeMode.Light]: {
    [CoreColorKey.Base]: {
      ...defaultColorValueMap[ThemeMode.Light][CoreColorKey.Base],
      [StyleState.Default]: {
        ...defaultColorValueMap[ThemeMode.Light][CoreColorKey.Base]?.[StyleState.Default],
        [ColorValueProperty.Placeholder]: '#BDBDBD',
        [ColorValueProperty.Selection]: '#A5D6A7', // PrimaryColor
      },
      [StyleState.Focus]: {
        [ColorValueProperty.Border]: '#388E3C', // 濃い緑でフォーカスを明確に
      },
      [StyleState.Disabled]: {
        [ColorValueProperty.Border]: '#EEEEEE',
      },
    },
  },
  [ThemeMode.Dark]: {
    [CoreColorKey.Base]: {
      ...defaultColorValueMap[ThemeMode.Dark][CoreColorKey.Base],
      [StyleState.Default]: {
        ...defaultColorValueMap[ThemeMode.Dark][CoreColorKey.Base]?.[StyleState.Default],
        [ColorValueProperty.Placeholder]: '#616161',
        [ColorValueProperty.Selection]: '#386641', // PrimaryColor
      },
      [StyleState.Focus]: {
        [ColorValueProperty.Border]: '#A5D6A7', // 明るい緑でフォーカスを明確に
      },
      [StyleState.Disabled]: {
        [ColorValueProperty.Border]: '#212121',
      },
    },
  },
};
