import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BaseText } from '../base/BaseText';
import { BaseView } from '../base/BaseView';

// 将来的にユーザー情報をpropsで受け取る
export const AccountInfo: React.FC = () => {
  return (
    <BaseView style={styles.container}>
      <View style={styles.avatar} /> 
      <View>
        <BaseText style={styles.name}>ゲストユーザー</BaseText>
        <BaseText style={styles.email}>ログインしていません</BaseText>
      </View>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ccc',
    marginRight: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
});
