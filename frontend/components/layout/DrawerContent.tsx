import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { useNotes } from '@/hooks/useNotes';
import { BaseText } from '@/components/base/BaseText';
import { useThemeColor } from '@/hooks/useThemeColor';
import { defaultColorMap } from '@/styleMap/defaults/defaultColorMap';
import { router } from 'expo-router';
import { CoreColorKey } from '@/style/color';

export default function DrawerContent(props: any) {
  const { notes } = useNotes();
  const theme = useThemeColor();
  const colors = defaultColorMap[theme];

  return (
    <DrawerContentScrollView {...props}>
      {/* デフォルトのメニュー項目（新しいメモなど）を表示 */}
      <DrawerItemList {...props} />
      
      {/* 区切り線 */}
      <View style={[styles.divider, { backgroundColor: colors[CoreColorKey.Base].border?.default.borderColor }]} />
      
      {/* ノート一覧 */}
      {notes.map((note) => (
        <DrawerItem
          key={note.id}
          label={() => (
            <BaseText styleKit={{ color: { colorKey: CoreColorKey.Base } }}>
              {note.title || '無題のメモ'}
            </BaseText>
          )}
          onPress={() => {
            router.push(`/note/${note.id}`);
          }}
        />
      ))}
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    marginVertical: 10,
    marginHorizontal: 16,
  },
});