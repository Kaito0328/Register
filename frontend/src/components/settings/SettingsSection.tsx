import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BaseText } from '../../base/BaseText';
import { BaseView } from '@/base/BaseView';
import { CoreColorKey, FontWeightKey, SizeKey } from '@/styles/tokens';

type Props = {
  title: string;
  children: React.ReactNode;
};

export const SettingsSection: React.FC<Props> = ({ title, children }) => {
  return (
    <BaseView style={styles.container} styleKit={{ color: { colorKey: CoreColorKey.Secondary } }}>
      <BaseText style={styles.title} styleKit={{color: {colorKey: CoreColorKey.Secondary}, size: {sizeKey: SizeKey.LG}, fontWeightKey: FontWeightKey.Bold}}>{title}</BaseText>
      <BaseView style={styles.content} styleKit={{ color: { colorKey: CoreColorKey.Base } }}>
        {children}
      </BaseView>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  title: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  content: {
  },
});
