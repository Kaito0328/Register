import React, { useMemo } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import { useNotes } from '@/contexts/NotesContext';
import { BaseText } from '@/base/BaseText';
import { ColorViewProperty, CoreColorKey } from '@/styles/tokens/color';
import { router, useLocalSearchParams, usePathname, useRootNavigationState } from 'expo-router';
import { CreateMemoButton } from './CreateMemoButton';
import { MemoItem } from './MemoItem';
import { BaseView } from '../../base/BaseView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../Button';
import { ShadowKey } from '@/styles/tokens';
// components/DrawerContent.tsx

export default function DrawerContent(props: any) {
  // ★★★ togglePinと現在のノートIDを取得
  const { notes, createNote, deleteNote, togglePin } = useNotes();
  const insets = useSafeAreaInsets();
  const rootNavigationState = useRootNavigationState();
  const pathname = usePathname(); // 例: '/note/1752837466926'

  // ★★★ パス名から正規表現でIDを抽出する（より安全な方法）
  const match = pathname.match(/\/note\/(\w+)/);
  const currentNoteId = match ? match[1] : undefined;

  // ★★★ ピン留めされたノートを優先的にソートする
  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => {
      // aがピン留めされていてbが違うならaを先に
      if (a.isPinned && !b.isPinned) return -1;
      // bがピン留めされていてaが違うならbを先に
      if (!a.isPinned && b.isPinned) return 1;
      // それ以外（両方ピン留め or 両方違う）は更新日時順
      return b.updatedAt - a.updatedAt;
    });
  }, [notes]);

  const handleCreateNote = () => {
    const newNote = createNote('');
    router.push(`/note/${newNote.id}`);
    props.navigation.closeDrawer();
  };

  const navigateToSettings = () => {
    router.push('/settings');
    props.navigation.closeDrawer();
  };

  return (
    <BaseView style={{flex: 1}} styleKit={{color: { colorKey: CoreColorKey.Secondary, apply: { default: [ColorViewProperty.Bg] } } }}>
      <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
        <BaseText style={styles.listHeader} styleKit={{ color: { colorKey: CoreColorKey.Base } }}>ノート一覧</BaseText>
        <BaseView style={styles.divider} styleKit={{ color: { colorKey: CoreColorKey.Primary } }} />

        <ScrollView>
          <CreateMemoButton onPress={handleCreateNote} />

          {/* ★★★ ソート済みの配列をmapで展開 */}
          {sortedNotes.map((note) => (
            <MemoItem
              key={note.id}
              title={note.title || '空のノート'}
              isPinned={note.isPinned} // ★ ピンの状態を渡す
              onTogglePin={() => togglePin(note.id)} // ★ ピン切り替え関数を渡す
              // ★★★ 現在開いているノートの背景色を変更
              colorKey={note.id === currentNoteId ? CoreColorKey.Primary : CoreColorKey.Secondary}
              onPress={() => {
                router.push(`/note/${note.id}`);
                props.navigation.closeDrawer();
              }}
              onDelete={() => deleteNote(note.id)}
            />
          ))}
        </ScrollView>

        <BaseView style={styles.footer}>
          <Button 
            onPress={navigateToSettings}
            viewStyleKit={{color: {colorKey: CoreColorKey.Base, apply: {default: []}}, shadowKey: ShadowKey.None}}
          >
            設定
          </Button>
        </BaseView>
      </SafeAreaView>
    </BaseView>
  );
}
// (stylesは変更なし)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  divider: {
    height: 1,
    marginVertical: 10,
    marginHorizontal: 16,
  },
  listHeader: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10
  },
    footer: {
    borderTopWidth: 1,
    padding: 8,
  }
});