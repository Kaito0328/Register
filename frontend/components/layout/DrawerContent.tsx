import React from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Platform, StatusBar } from 'react-native';
import { useNotes } from '@/contexts/NotesContext';
import { BaseText } from '@/components/base/BaseText';
import { CoreColorKey } from '@/style/color';
import { router } from 'expo-router';
import { CreateMemoButton } from '../sideMenu/CreateMemoButton';
import { MemoItem } from '../sideMenu/MemoItem';
import { BaseView } from '../base/BaseView';
import { defaultColorMap } from '@/styleMap/defaults/defaultColorMap';
import { useTheme } from '@react-navigation/native';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function DrawerContent(props: any) {
  const { notes, createNote, deleteNote } = useNotes();

  const handleCreateNote = () => {
    const newNote = createNote('');
    router.push(`/note/${newNote.id}`);
    props.navigation.closeDrawer();
  };

  // ★ 1. SafeAreaViewを一番外側にして、背景色もここに適用
  return (
    <BaseView style={{flex: 1}}>
    <SafeAreaView style={styles.container}>
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
            title={note.title || '無題のメモ'}
            onPress={() => {
              router.push(`/note/${note.id}`);
              props.navigation.closeDrawer();
            }}
            onDelete={() => deleteNote(note.id)}
          />
        ))}
      </ScrollView>
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
  }
});