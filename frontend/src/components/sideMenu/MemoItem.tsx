import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BasePressable } from '../../base/BasePressable';
import { BaseText } from '../../base/BaseText';
import { CoreColorKey } from '@/styles/tokens/color';
import { DeleteButton } from '../editor/DeleteButton';

type Props = {
  onPress: () => void;
  onDelete: () => void; // ★ onDelete propを追加
  title: string;
};

export const MemoItem: React.FC<Props> = ({ onPress, onDelete, title }) => {
  return (
    <View style={styles.container}>
      {/* ノートタイトル部分（押したら編集画面へ） */}
      <BasePressable onPress={onPress} style={styles.pressableArea} styleKit={{ color: { colorKey: CoreColorKey.Secondary, apply: {default: []}} }}>
        <BaseText styleKit={{ color: { colorKey: CoreColorKey.Base } }} numberOfLines={1}>
          {title}
        </BaseText>
      </BasePressable>

      {/* 削除ボタン */}
      <View style={styles.deleteButtonWrapper}>
        <DeleteButton onPress={onDelete} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 4,
  },
  pressableArea: {
    flex: 1, // タイトル部分が可能な限り幅を取るように
    paddingVertical: 12,
  },
  deleteButtonWrapper: {
    marginLeft: 8,
  },
});
