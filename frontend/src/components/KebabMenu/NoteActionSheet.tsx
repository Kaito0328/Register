import React, { useState } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Pressable, Alert } from 'react-native';
import { BaseText } from '../../base/BaseText';
import { Note, NoteLifecycle } from '@/types/Note';
import { useNotes } from '@/contexts/NotesContext';
import { router } from 'expo-router';
import { LifecycleSettingsModal } from './LifecycleSettingsModal';

type Props = {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void; // 削除時のコールバック
  note: Note;
};

// メニューの各項目ボタン
const ActionButton: React.FC<{ label: string; onPress: () => void; isDestructive?: boolean }> = ({ label, onPress, isDestructive }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    <BaseText style={[styles.actionButtonText, isDestructive && styles.destructiveText]}>{label}</BaseText>
  </TouchableOpacity>
);

export const NoteActionSheet: React.FC<Props> = ({ visible, onClose, onDelete, note }) => {
  const { deleteNote, togglePin, updateNote } = useNotes();
  const [lifecycleModalVisible, setLifecycleModalVisible] = useState(false);

  const handleTogglePin = () => {
    togglePin(note.id);
    onClose();
  };

  const handleSetLifecycle = (lifecycle: NoteLifecycle) => {
    updateNote(note.id, {lifecycle});
  };
  
  const handleDelete = () => {
    onDelete();
    Alert.alert("ノートを削除", "このノートを本当に削除しますか？", [
      { text: "キャンセル", style: "cancel" },
      { text: "削除", onPress: () => { deleteNote(note.id); router.back(); }, style: "destructive" }
    ]);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <Pressable style={styles.modalOverlay} onPress={onClose}>
          <Pressable style={styles.menuContainer}>
            <ActionButton
              label={note.isPinned ? "ピンを外す" : "ピン留めする"}
              onPress={handleTogglePin}
            />
            <ActionButton label="ライフサイクル設定" onPress={() => setLifecycleModalVisible(true)} />
            <ActionButton label="削除" onPress={handleDelete} isDestructive />
          </Pressable>
          <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={onClose}>
            <BaseText style={styles.actionButtonText}>キャンセル</BaseText>
          </TouchableOpacity>
        </Pressable>
      </Modal>

      {/* ライフサイクル設定用のモーダル */}
      <LifecycleSettingsModal
        visible={lifecycleModalVisible}
        onClose={() => setLifecycleModalVisible(false)}
        onSave={handleSetLifecycle}
        currentLifecycle={note.lifecycle}
      />
    </>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menuContainer: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    borderRadius: 14,
    overflow: 'hidden',
  },
  actionButton: {
    padding: 20,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
  },
  actionButtonText: {
    fontSize: 18,
    color: '#007AFF',
  },
  destructiveText: {
    color: 'red',
  },
  cancelButton: {
    backgroundColor: 'white',
    borderRadius: 14,
    marginHorizontal: 10,
    marginTop: 8,
    marginBottom: 30, // 下部のセーフエリアを考慮
  },
});
