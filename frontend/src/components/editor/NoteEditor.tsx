import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View } from 'react-native';
import { BaseView } from '@/base/BaseView';
import { BaseTextInput } from '@/base/BaseTextInput';
import { CoreColorKey } from '@/styles/tokens/color';
import { SizeKey } from '@/styles/tokens/size';
import { RoundKey } from '@/styles/tokens';

type NoteEditorProps = {
  text: string;
  onChangeText: (text: string) => void;
};

export default function NoteEditor({ text, onChangeText }: NoteEditorProps) {
  return (
    <BaseView styleKit={{ color: { colorKey: CoreColorKey.Secondary } }} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <BaseTextInput
          easyStyleKit={{
            sizeKey: SizeKey.LG ,
            roundKey: RoundKey.Lg,
          }}
          style={styles.textInput}
          multiline
          placeholder="一時的なメモをここに..."
          value={text}
          onChangeText={onChangeText}
        />
      </KeyboardAvoidingView>
    </BaseView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    margin: 16,
    padding: 20,
    textAlignVertical: 'top',
  },
});
