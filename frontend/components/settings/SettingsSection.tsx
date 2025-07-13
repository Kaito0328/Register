import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BaseText } from '../base/BaseText';

type Props = {
  title: string;
  children: React.ReactNode;
};

export const SettingsSection: React.FC<Props> = ({ title, children }) => {
  return (
    <View style={styles.container}>
      <BaseText style={styles.title}>{title}</BaseText>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 8,
    color: 'gray',
  },
  content: {
    backgroundColor: 'white', // テーマに応じて変更
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
});
