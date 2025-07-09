import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useThemeColor } from "@/hooks/useThemeColor";
import { getComponentStyle } from "@/style/style";
import { CoreColorKey, ColorPropertyKey } from "@/style/color";
import { SizeKey, SizeProperty } from "@/style/size";
import DrawerContent from "@/components/layout/DrawerContent";

export default function RootLayout() {
  const theme = useThemeColor();

  const headerStyle = getComponentStyle({
    color: { colorKey: CoreColorKey.Primary, properties: [ColorPropertyKey.Bg] },
    size: { sizeKey: SizeKey.MD, properties: [] }
  });

  const headerTintColor = getComponentStyle({
    color: { colorKey: CoreColorKey.Primary, properties: [ColorPropertyKey.Text] },
    size: { sizeKey: SizeKey.MD, properties: [] }
  }, {});

  return (
    <Drawer
      // ★ハンバーガーメニューの中身をカスタムコンポーネントで描画
      drawerContent={(props) => <DrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: headerStyle.backgroundColor },
        headerTitleAlign: 'center',
        // ★デフォルトのハンバーガーアイコンを表示
        headerLeft: () => <DrawerToggleButton/>,
      }}
    >
      <Drawer.Screen
        name="index"
        options={{
          title: ".temp",
        }}
      />
      {/* 他の画面はDrawerに表示しないようにする */}
      <Drawer.Screen name="note/[id]" options={{ drawerItemStyle: { display: 'none' } }} />
    </Drawer>
  );
}