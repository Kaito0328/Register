import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useNotes } from '@/contexts/NotesContext';
import { BaseView } from '@/base/BaseView';
import { BaseText } from '@/base/BaseText';
import { CoreColorKey } from '@/styles/tokens';
import { Feather } from '@expo/vector-icons'; // アイコン用にインポート

export default function EmptyScreen() {
  const { createNote } = useNotes();

  const handleCreateNote = () => {
    // 新しいノートを作成し、そのノートのIDを取得
    const newNote = createNote(""); // 最初は空のテキストで作成
    // 作成したノートの編集画面に遷移
    router.push(`/note/${newNote.id}`);
  };

  return (
    <BaseView style={styles.container} styleKit={{ color: { colorKey: CoreColorKey.Base } }}>
      <View style={styles.content}>
        <Feather name="moon" size={48} color="#cccccc" />
        <BaseText style={styles.message}>
          一時的なメモはありません。素晴らしい!
        </BaseText>
        <TouchableOpacity style={styles.button} onPress={handleCreateNote}>
          <BaseText style={styles.buttonText}>新しいメモを書く</BaseText>
        </TouchableOpacity>
      </View>
    </BaseView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingBottom: 50, // ボタンとのバランスを調整
  },
  message: {
    marginTop: 24,
    fontSize: 16,
    color: '#a0a0a0',
    textAlign: 'center',
  },
  button: {
    marginTop: 48,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#808080',
  },
});
