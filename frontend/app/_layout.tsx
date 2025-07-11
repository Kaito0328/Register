import { Drawer } from "expo-router/drawer";
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useThemeColor } from "@/hooks/useThemeColor";
import { getComponentStyle } from "@/style/style";
import { CoreColorKey, ColorPropertyKey } from "@/style/color";
import { SizeKey, SizeProperty } from "@/style/size";
import DrawerContent from "@/components/layout/DrawerContent";
import { NotesProvider } from "@/contexts/NotesContext";

export default function RootLayout() {

  const headerStyle = getComponentStyle({
    color: { colorKey: CoreColorKey.Primary, properties: [ColorPropertyKey.Bg] },
    size: { sizeKey: SizeKey.MD, properties: [] }
  });

  return (
          <NotesProvider>
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
  name="+not-found" 
  options={{ 
    // この行を追加
    drawerItemStyle: { display: 'none' } 
  }} 
/>
      <Drawer.Screen 
  name="(tabs)" 
  options={{ 
    // この行を追加
    drawerItemStyle: { display: 'none' } 
  }} 
/>

      <Drawer.Screen
        name="index"
        options={{
          title: ".temp",
        }}
      />
      {/* 他の画面はDrawerに表示しないようにする */}
      <Drawer.Screen name="note/[id]" options={{ drawerItemStyle: { display: 'none' } }} />

    </Drawer>
    </NotesProvider>
  );
}