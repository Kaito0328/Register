import React from 'react';
// SafeAreaViewとScrollViewをimportする
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
// DrawerContentScrollViewは不要になる
// import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useNotes } from '@/contexts/NotesContext';
import { BaseText } from '@/components/base/BaseText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { defaultColorMap } from '@/styleMap/defaults/defaultColorMap';
import { CoreColorKey } from '@/style/color';
import { router } from 'expo-router';
import { CreateMemoButton } from '../sideMenu/CreateMemoButton';
import { MemoItem } from '../sideMenu/MemoItem';
import { BaseView } from '../base/BaseView';

export default function DrawerContent(props: any) {
  const { notes, createNote } = useNotes();
  const theme = useThemeColor();
  const colors = defaultColorMap[theme];

  const handleCreateNote = () => {
    const newNote = createNote('');
    router.push(`/note/${newNote.id}`);
    props.navigation.closeDrawer();
  };

  // DrawerContentScrollViewの代わりにSafeAreaViewとScrollViewを使う
  return (
    <BaseView style={styles.container}>
      <BaseText style={styles.listHeader} styleKit={{ color: { colorKey: CoreColorKey.Base } }}>ノート一覧</BaseText>
      <BaseView style={[styles.divider, { backgroundColor: colors.base.bg?.default.backgroundColor }]} styleKit={{color: {colorKey: CoreColorKey.Base}}} />

      <ScrollView>
        {notes.map((note) => (
          <MemoItem
            key={note.id}
            title={note.title || '無題のメモ'}
            onPress={() => {
              router.push(`/note/${note.id}`);
              props.navigation.closeDrawer();
            }}
          />
        ))}
        <CreateMemoButton onPress={handleCreateNote} />
      </ScrollView>
    </BaseView>
  );
}

const styles = StyleSheet.create({
  // SafeAreaViewに適用するスタイルを追加
  container: {
    flex: 1, // ドロワー全体に広がるようにする
  },
  divider: {
    height: 1,
    marginVertical: 10,
    marginHorizontal: 16,
  },
  listHeader: {
    paddingHorizontal: 16,
    paddingTop: 10, // 上部の余白を調整
    paddingBottom: 10
  }
});