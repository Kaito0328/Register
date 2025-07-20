import React from 'react';
import NoteEditor from './NoteEditor';
import { StyleSheet, View } from 'react-native';
import { CreationDateDisplay } from './CreationDateDisplay';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CharacterCount } from './CharacterCount';
import { BaseView } from '@/base/BaseView';
import { CoreColorKey } from '@/styles/tokens';

type Props = {
  text: string;
  onChangeText: (text: string) => void;
  createdAt: number;
};

export const NoteContent = ({ text, onChangeText, createdAt }: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <NoteEditor
        text={text}
        onChangeText={onChangeText}
      />
      <BaseView style={[styles.footer]} styleKit={{color: {colorKey: CoreColorKey.Secondary}}}>
        <CreationDateDisplay createdAt={createdAt} />
        <CharacterCount text={text} />
      </BaseView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    zIndex: 1,
  },
});