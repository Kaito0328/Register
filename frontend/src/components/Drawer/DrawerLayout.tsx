import React from 'react';
import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from "@react-navigation/drawer";
import DrawerContent from "@/components/sideMenu/DrawerContent";

// ★ 必要なスタイルシステムのフックと型をインポート
import {
  useViewStyles,
  resolveStyle,
  ViewStyleKit,
  viewStyleMaps, // viewStyleMapsをインポート
} from "@/styles/component";
import {
  CoreColorKey,
  ColorViewProperty,
  ColorValueProperty,
  ColorValueStyleKit,
  useResolvedColorValues,
  defaultColorValueMap,
} from "@/styles/tokens";

// ★ Kitの定義
const HEADER_VIEW_KIT: ViewStyleKit = {
  color: {
    colorKey: CoreColorKey.Secondary, // 背景色をSecondaryに変更
    apply: { default: [ColorViewProperty.Bg] },
  },
};
const ICON_VALUE_KIT: ColorValueStyleKit = {
  colorKey: CoreColorKey.Primary, // アイコンの色をPrimaryに
  apply: { default: [ColorValueProperty.Icon] },
};

// ★ 新しいコンポーネントとしてロジックを切り出す
export default function DrawerLayout() {
  // このコンポーネントはProviderの内側にあるので、フックは正常に動作する
  const viewStyles = useViewStyles(HEADER_VIEW_KIT, undefined, viewStyleMaps);
  // ★ colorMaps.valueを渡す
  const colorValues = useResolvedColorValues(ICON_VALUE_KIT, defaultColorValueMap, {});

  const resolvedHeaderStyle = resolveStyle(viewStyles, {});
  const resolvedIconColor = colorValues.icon;

  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      initialRouteName='index'
      screenOptions={{
        headerStyle: resolvedHeaderStyle,
        headerTitleAlign: "center",
        // ★ headerLeftをここに移動して、全画面で共通化
        headerLeft: () => <DrawerToggleButton tintColor={resolvedIconColor?.toString()} />,
        drawerStyle: {
          width: '60%',
        }
      }}
    >
      {/* ★★★ アプリに存在する実際の画面をここに定義 ★★★ */}
      <Drawer.Screen
        name="note/[id]"
        options={{
          title: 'ノート',
          drawerItemStyle: { display: "none" }, // DrawerContentでリスト表示するので、ここでは非表示
        }}
      />
      <Drawer.Screen
        name="empty"
        options={{
          title: 'ノート',
          drawerItemStyle: { display: "none" },
        }}
      />
      <Drawer.Screen
        name="settings"
        options={{
          title: '設定',
          drawerItemStyle: { display: "none" }, // DrawerContentのフッターで表示するので、非表示
        }}
      />
      <Drawer.Screen
        name="index"
        options={{
          headerShown: false, // indexはリダイレクト専用なのでヘッダーも非表示
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer>
  );
}
