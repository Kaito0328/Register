import { NotesProvider } from "@/contexts/NotesContext";
import { SettingsProvider } from "@/contexts/SettingsContext";
import DrawerLayout from "@/components/Drawer/DrawerLayout"; // ★ 新しいコンポーネントをインポート

export default function RootLayout() {
  // RootLayoutの役割はProviderを定義することだけに絞る
  return (
    <NotesProvider>
      <SettingsProvider>
        {/* ★ スタイルやDrawerのロジックは子コンポーネントに任せる */}
        <DrawerLayout />
      </SettingsProvider>
    </NotesProvider>
  );
}