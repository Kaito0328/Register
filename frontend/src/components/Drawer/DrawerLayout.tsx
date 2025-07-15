import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from "@react-navigation/drawer";
import DrawerContent from "@/components/sideMenu/DrawerContent";
// ★ 必要なスタイルシステムのフックと型をインポート
import {
  useViewStyles,
  resolveStyle,
  ViewStyleKit,
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

// ★ Kitの定義は変更なし
const HEADER_VIEW_KIT: ViewStyleKit = {
  color: {
    colorKey: CoreColorKey.Primary,
    apply: { default: [ColorViewProperty.Bg] },
  },
};
const ICON_VALUE_KIT: ColorValueStyleKit = {
  colorKey: CoreColorKey.Primary,
  apply: { default: [ColorValueProperty.Icon] },
};

// ★ 新しいコンポーネントとしてロジックを切り出す
export default function DrawerLayout() {
  // このコンポーネントはProviderの内側にあるので、フックは正常に動作する
  const viewStyles = useViewStyles(HEADER_VIEW_KIT, undefined, viewStyleMaps);
  const colorValues = useResolvedColorValues(ICON_VALUE_KIT, defaultColorValueMap, {});

  const resolvedHeaderStyle = resolveStyle(viewStyles, {});
  const resolvedIconColor = colorValues.icon;

  return (
    <Drawer
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerStyle: resolvedHeaderStyle,
        headerTitleAlign: "center",
        headerLeft: () => <DrawerToggleButton tintColor={resolvedIconColor?.toString()} />,
      }}
    >
      {/* Drawer.Screen の部分は変更なし */}
      <Drawer.Screen name="+not-found" options={{ drawerItemStyle: { display: "none" } }} />
      <Drawer.Screen name="(tabs)" options={{ drawerItemStyle: { display: "none" } }} />
      <Drawer.Screen name="index" options={{ title: ".temp" }} />
      <Drawer.Screen name="note/[id]" options={{ drawerItemStyle: { display: "none" } }} />
    </Drawer>
  );
}