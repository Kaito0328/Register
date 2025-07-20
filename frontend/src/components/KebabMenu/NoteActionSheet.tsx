import React, { useEffect } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Pressable, Alert } from 'react-native';
import { BaseText } from '../../base/BaseText';
import { Note, NoteLifecycle } from '@/types/Note';
import { useNotes } from '@/contexts/NotesContext';
import { router } from 'expo-router';
import { BaseView } from '@/base/BaseView';
import { CoreColorKey } from '@/styles/tokens';
import { ActionButton } from './ActionButton';
// ★★★ 1. react-native-reanimatedから必要なフックをインポート
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

type Props = {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  note: Note;
};

export const NoteActionSheet: React.FC<Props> = ({ visible, onClose, onDelete, note }) => {
  const { togglePin } = useNotes();
  // ★★★ 2. コンテンツのY軸（垂直方向）の位置を管理するアニメーション値
  const translateY = useSharedValue(500); // 画面外の十分な位置からスタート

  // ★★★ 3. translateYの値をtransformスタイルに変換する
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  // ★★★ 4. visibleプロパティの変更を監視してアニメーションを実行
  useEffect(() => {
    if (visible) {
      // モーダルが表示されたら、コンテンツを画面内にスライドインさせる
      translateY.value = withTiming(0, { duration: 250 });
    } else {
      // モーダルが非表示になったら、コンテンツを即座に画面外に戻す
      translateY.value = 500;
    }
  }, [visible, translateY]);


  const handleTogglePin = () => {
    togglePin(note.id);
    onClose();
  };

  const handleDelete = () => {
    onClose();
    Alert.alert("ノートを削除", "このノートを本当に削除しますか？", [
      { text: "キャンセル", style: "cancel" },
      { text: "削除", onPress: () => { 
          if (onDelete) onDelete(); 
        }, style: "destructive" }
    ]);
  };

  return (
    <Modal
      // ★★★ 5. 背景のオーバーレイはフワッと表示（フェード）させる
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        {/* ★★★ 6. スライドさせたいコンテンツ全体をAnimated.Viewで囲む */}
        <Animated.View style={animatedStyle}>
          {/* このPressableは、メニュー自体をタップしてもモーダルが閉じないようにするためのもの */}
          <Pressable>
            <BaseView style={styles.menuContainer} styleKit={{ color: { colorKey: CoreColorKey.Base } }}>
              <ActionButton
                label={note.isPinned ? "ピンを外す" : "ピン留めする"}
                onPress={handleTogglePin}
              />
              <BaseView style={styles.divider} styleKit={{ color: { colorKey: CoreColorKey.Secondary } }} />
              <ActionButton label="削除" onPress={handleDelete} isDestructive />
            </BaseView>
          </Pressable>

          <TouchableOpacity onPress={onClose}>
            <BaseView style={[styles.actionButton, styles.cancelButton]} styleKit={{ color: { colorKey: CoreColorKey.Base } }}>
              <BaseText style={styles.actionButtonText} styleKit={{ color: { colorKey: CoreColorKey.Primary } }}>
                キャンセル
              </BaseText>
            </BaseView>
          </TouchableOpacity>
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menuContainer: {
    marginHorizontal: 10,
  },
  actionButton: {
    padding: 20,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 18,
  },
  cancelButton: {
    marginHorizontal: 10,
    marginTop: 8,
    marginBottom: 30,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
  },
});
