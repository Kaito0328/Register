import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BaseText } from '@/base/BaseText';
import { CoreColorKey } from '@/styles/tokens';

type Props = {
  createdAt: number;
};

// 日時をフォーマットするヘルパー関数
const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${year}/${month}/${day} ${hours}:${minutes}`;
};

export const CreationDateDisplay: React.FC<Props> = ({ createdAt }) => {
  const formattedDate = formatDate(createdAt);

  return (
    <View style={styles.container}>
      <BaseText style={styles.text} styleKit={{ color: { colorKey: CoreColorKey.Base } }}>
        作成日時: {formattedDate}
      </BaseText>
      {/* デバッグ用にcreatedAtの値を表示 */}
      {/* <BaseText style={styles.debugText} styleKit={{ color: { colorKey: CoreColorKey.Base } }}>
        (createdAt: {createdAt})
      </BaseText> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontSize: 12,
  },
  debugText: {
    fontSize: 10,
    opacity: 0.6,
  },
});