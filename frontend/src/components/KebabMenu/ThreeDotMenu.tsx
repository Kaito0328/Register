import React, { useState } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { BaseText } from '../../base/BaseText';
import { Note } from '@/types/Note';
import { useNotes } from '@/contexts/NotesContext';
import { router } from 'expo-router';
import { Alert } from 'react-native';

type Props = {
  note: Note;
};

// メニューの各項目
const MenuItem: React.FC<{ label: string; onPress: () => void; isDestructive?: boolean }> = ({ label, onPress, isDestructive }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <BaseText style={{ color: isDestructive ? 'red' : 'black' }}>{label}</BaseText>
  </TouchableOpacity>
);

export const ThreeDotMenu: React.FC<Props> = ({ note }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { deleteNote, togglePin } = useNotes();

  const handleTogglePin = () => {
    togglePin(note.id);
    setModalVisible(false);
  };

  const handleSetLifecycle = () => {
    // ここでライフサイクル選択用のUI（別のモーダルなど）を開く
    Alert.alert("ライフサイクル設定", "（この機能は現在開発中です）");
    setModalVisible(false);
  };

  const handleDelete = () => {
    setModalVisible(false); // 先にモーダルを閉じる
    Alert.alert(
      "ノートを削除",
      "このノートを本当に削除しますか？",
      [
        { text: "キャンセル", style: "cancel" },
        {
          text: "削除",
          onPress: () => {
            deleteNote(note.id);
            router.back();
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
        <BaseText style={{ fontSize: 24, fontWeight: 'bold' }}>...</BaseText>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.menuContainer}>
            <MenuItem
              label={note.isPinned ? "ピンを外す" : "ピン留めする"}
              onPress={handleTogglePin}
            />
            <MenuItem label="ライフサイクル設定" onPress={handleSetLifecycle} />
            <View style={styles.divider} />
            <MenuItem label="削除" onPress={handleDelete} isDestructive />
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  menuContainer: {
    marginTop: 60, // ヘッダーの高さに応じて調整
    marginRight: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    minWidth: 180,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 4,
  },
});
