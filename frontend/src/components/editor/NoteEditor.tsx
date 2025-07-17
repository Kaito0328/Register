import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View } from 'react-native';
import { BaseView } from '@/base/BaseView';
import { BaseTextInput } from '@/base/BaseTextInput';
import { CoreColorKey } from '@/styles/tokens/color';
import { SizeKey, SizeTextProperty, SizeViewProperty } from '@/styles/tokens/size';
import { RoundKey, ShadowKey } from '@/styles/tokens';

type NoteEditorProps = {
  text: string;
  onChangeText: (text: string) => void;
};

export default function NoteEditor({ text, onChangeText }: NoteEditorProps) {
  console.log("NoteEditor rendered", text); // デバッグ用ログ
  return (
    <BaseView styleKit={{ color: { colorKey: CoreColorKey.Base }, size: {sizeKey: SizeKey.LG, apply: {default: [SizeViewProperty.Padding]}}}} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <BaseTextInput
          viewStyleKit={{ size: {sizeKey: SizeKey.LG }, color: { colorKey: CoreColorKey.Base, apply: {default: []}}}}
          textStyleKit={{ size: {sizeKey: SizeKey.LG }, color: { colorKey: CoreColorKey.Base } }}

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
    textAlignVertical: 'top',
  },
});
