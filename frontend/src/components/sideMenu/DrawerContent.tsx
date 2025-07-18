import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import { useNotes } from '@/contexts/NotesContext';
import { BaseText } from '@/base/BaseText';
import { ColorViewProperty, CoreColorKey } from '@/styles/tokens/color';
import { router } from 'expo-router';
import { CreateMemoButton } from './CreateMemoButton';
import { MemoItem } from './MemoItem';
import { BaseView } from '../../base/BaseView';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../Button';
import { ShadowKey } from '@/styles/tokens';

export default function DrawerContent(props: any) {
  const { notes, createNote, deleteNote } = useNotes();
  const insets = useSafeAreaInsets();

  const handleCreateNote = () => {
    const newNote = createNote('');
    router.push(`/note/${newNote.id}`);
    props.navigation.closeDrawer();
  };

  
  const navigateToSettings = () => {
    router.push('/settings');
    props.navigation.closeDrawer();
  };


  // ★ 1. SafeAreaViewを一番外側にして、背景色もここに適用
  return (
    <BaseView style={{flex: 1}} styleKit={{color: { colorKey: CoreColorKey.Secondary, apply: { default: [ColorViewProperty.Bg] } } }}>
    <SafeAreaView style={[styles.container, { paddingBottom: insets.bottom }]}>
      {/* --- ヘッダー部分（固定） --- */}
      <BaseText style={styles.listHeader} styleKit={{ color: { colorKey: CoreColorKey.Base } }}>ノート一覧</BaseText>
      <BaseView style={styles.divider} styleKit={{ color: { colorKey: CoreColorKey.Primary } }} />

      {/* --- スクロールさせたいコンテンツ全体をScrollViewで囲む --- */}
      <ScrollView>
        {/* ★ 2. ボタンをリストの上に配置 */}
        <CreateMemoButton onPress={handleCreateNote} />

        {notes.map((note) => (
          <MemoItem
            key={note.id}
            title={note.title || '空のノート'}
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