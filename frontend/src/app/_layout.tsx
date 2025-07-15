import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from "@react-navigation/drawer";
import DrawerContent from "@/components/sideMenu/DrawerContent";
import { NotesProvider } from "@/contexts/NotesContext";
import { SettingsProvider } from "@/contexts/SettingsContext";

// ★ 必要なスタイルシステムのフックと型をインポート
import {
  useViewStyles,
  useResolvedStyle,
  ViewStyleKit,
  StateFlags,
  viewStyleMaps,
} from "@/styles/component";
import {
  CoreColorKey,
  ColorViewProperty,
  ColorValueProperty,
  ColorValueStyleKit,
  useResolvedColorValues,
  defaultColorValueMap,
} from "@/styles/tokens";

// ★ ヘッダーのデフォルトの見た目をKitとして定義
const HEADER_VIEW_KIT: ViewStyleKit = {
  color: {
    colorKey: CoreColorKey.Primary,
    apply: {
      default: [ColorViewProperty.Bg],
    },
  },
  // ヘッダーにはsizeやroundなどは不要なため定義しない
};

// ★ ハンバーガーアイコンのデフォルトの色をKitとして定義
const ICON_VALUE_KIT: ColorValueStyleKit = {
  colorKey: CoreColorKey.Primary, // Primaryの背景に合うIconの色をMapで定義しておく
  apply: {
    default: [ColorValueProperty.Icon],
  },
};

export default function RootLayout() {
  // ★ スタイルを生成するためのフックを呼び出す
  const viewStyles = useViewStyles(HEADER_VIEW_KIT, undefined, viewStyleMaps);
  const colorValues = useResolvedColorValues(ICON_VALUE_KIT, defaultColorValueMap, {});

  // ★ 状態はないため、stateFlagsは空オブジェクトでOK
  const resolvedHeaderStyle = useResolvedStyle(viewStyles, {});
  const resolvedIconColor = colorValues.icon; // .iconで直接色を取得

  return (
    <NotesProvider>
      <SettingsProvider>
        <Drawer
          drawerContent={(props) => <DrawerContent {...props} />}
          screenOptions={{
            // ★ フックで生成したスタイルを適用
            headerStyle: resolvedHeaderStyle,
            headerTitleAlign: "center",
            // ★ フックで取得した色をtintColorに渡す
            headerLeft: () => <DrawerToggleButton tintColor={resolvedIconColor?.toString()} />,
          }}
        >
          {/* Drawer.Screen の部分は変更なし */}
          <Drawer.Screen
            name="+not-found"
            options={{
              drawerItemStyle: { display: "none" },
            }}
          />
          <Drawer.Screen
            name="(tabs)"
            options={{
              drawerItemStyle: { display: "none" },
            }}
          />
          <Drawer.Screen
            name="index"
            options={{
              title: ".temp",
            }}
          />
          <Drawer.Screen
            name="note/[id]"
            options={{ drawerItemStyle: { display: "none" } }}
          />
        </Drawer>
      </SettingsProvider>
    </NotesProvider>
  );
}