import React, { useState } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Pressable, Alert } from 'react-native';
import { BaseText } from '../../base/BaseText';
import { Note } from '@/types/Note';
import { useNotes } from '@/contexts/NotesContext';
import { router } from 'expo-router';
import { BaseView } from '@/base/BaseView'; // ★ BaseViewをインポート
import { CoreColorKey } from '@/styles/tokens'; // ★ BorderKeyをインポート

type Props = {
  note: Note;
};

// メニューの各項目
const MenuItem: React.FC<{ label: string; onPress: () => void; isDestructive?: boolean }> = ({ label, onPress, isDestructive }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    {/* ★ destructiveの判定をstyleKitに移行 */}
    <BaseText styleKit={{ color: { colorKey: isDestructive ? CoreColorKey.Danger : CoreColorKey.Primary } }}>
      {label}
    </BaseText>
  </TouchableOpacity>
);

export const ThreeDotMenu: React.FC<Props> = ({ note }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { deleteNote, togglePin } = useNotes();

  const handleTogglePin = () => {
    togglePin(note.id);
    setModalVisible(false);
  };

  const handleDelete = () => {
    setModalVisible(false);
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
          {/* ★★★ ViewをBaseViewに変更し、styleKitで見た目を定義 */}
          <BaseView 
            style={styles.menuContainer}
            styleKit={{
              color: { colorKey: CoreColorKey.Base },
            }}
          >
            <MenuItem
              label={note.isPinned ? "ピンを外す" : "ピン留めする"}
              onPress={handleTogglePin}
            />
            {/* ★★★ 区切り線もBaseViewに変更 */}
            <BaseView style={styles.divider} styleKit={{ color: { colorKey: CoreColorKey.Secondary } }}/>
            <MenuItem label="削除" onPress={handleDelete} isDestructive />
          </BaseView>
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
    marginTop: 60,
    marginRight: 10,
    padding: 8,
    minWidth: 180,
    // ★★★ borderRadiusとshadow関連のスタイルを削除
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  divider: {
    height: 1,
    marginVertical: 4,
    // ★★★ backgroundColorを削除 (styleKitで制御するため)
  },
});
