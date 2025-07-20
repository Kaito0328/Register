import React, { useMemo } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import { useNotes } from '@/contexts/NotesContext';
import { BaseText } from '@/base/BaseText';
import { ColorViewProperty, CoreColorKey } from '@/styles/tokens/color';
import { router, usePathname } from 'expo-router';
import { CreateMemoButton } from './CreateMemoButton';
import { MemoItem } from './MemoItem';
import { BaseView } from '../../base/BaseView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../Button';
import { ShadowKey } from '@/styles/tokens';

export default function DrawerContent(props: any) {
  const { notes, createNote, deleteNote, togglePin, getTopNoteId } = useNotes(); // ★ getTopNoteId を取得
  const insets = useSafeAreaInsets();
  const pathname = usePathname();

  const match = pathname.match(/\/note\/([\w-]+)/);
  const currentNoteId = match ? match[1] : undefined;

  const sortedNotes = useMemo(() => {
    return [...notes].sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return b.updatedAt - a.updatedAt;
    });
  }, [notes]);

  const handleCreateNote = () => {
    const newNote = createNote('');
    // ★★★ pushの代わりにreplaceを使うと、履歴がクリーンになります
    router.replace(`/note/${newNote.id}`);
    props.navigation.closeDrawer();
  };

  const navigateToSettings = () => {
    router.push('/settings');
    props.navigation.closeDrawer();
  };

  // ★★★ ノート削除用の新しい関数
  const handleDeleteNote = (id: string) => {
    // 1. ノートを削除する


    // 2. 現在開いているノートが削除されたものだった場合、画面を遷移させる
    if (id === currentNoteId) {
      // ★★★ replace('/') を使うことで、index.tsxの振り分けロジックを再利用し、
      // 履歴を残さずに次のトップノートへ移動できる
      router.replace('/');
    }

    deleteNote(id);
    
    // 3. props.navigation.closeDrawer() を呼ばないので、メニューは開いたままになる
  };

  return (
    <BaseView style={{flex: 1}} styleKit={{color: { colorKey: CoreColorKey.Secondary, apply: { default: [ColorViewProperty.Bg] } } }}>
      <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
        <BaseText style={styles.listHeader} styleKit={{ color: { colorKey: CoreColorKey.Base } }}>ノート一覧</BaseText>
        <BaseView style={styles.divider} styleKit={{ color: { colorKey: CoreColorKey.Primary } }} />

        <ScrollView>
          <CreateMemoButton onPress={handleCreateNote} />

          {sortedNotes.map((note) => (
            <MemoItem
              key={note.id}
              title={note.title || '空のノート'}
              isPinned={note.isPinned}
              onTogglePin={() => togglePin(note.id)}
              colorKey={note.id === currentNoteId ? CoreColorKey.Primary : CoreColorKey.Secondary}
              onPress={() => {
                router.replace(`/note/${note.id}`);
                props.navigation.closeDrawer();
              }}
              // ★★★ 新しい削除関数を渡す
              onDelete={() => handleDeleteNote(note.id)}
            />
          ))}
        </ScrollView>

        <BaseView style={styles.footer}>
          <Button 
            onPress={navigateToSettings}
            viewStyleKit={{color: {colorKey: CoreColorKey.Base, apply: {default: [ColorViewProperty.Bg], pressed: []}}, shadowKey: ShadowKey.None}}
          >
            設定
          </Button>
        </BaseView>
      </SafeAreaView>
    </BaseView>
  );
}

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
    padding: 8,
  }
});
