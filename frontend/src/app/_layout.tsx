import React from 'react';
import { NotesProvider } from '@/contexts/NotesContext';
import { SettingsProvider } from '@/contexts/SettingsContext';
import DrawerLayout from '@/components/Drawer/DrawerLayout'; // ★ 作成されたDrawerLayoutをインポート

// RootLayoutの役割は、Providerを定義し、DrawerLayoutを呼び出すことだけ
export default function RootLayout() {
  return (
    <SettingsProvider>
      <NotesProvider>
        <DrawerLayout />
      </NotesProvider>
    </SettingsProvider>
  );
}
