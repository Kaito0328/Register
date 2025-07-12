import React from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform, View } from 'react-native';
import { BaseView } from '@/components/base/BaseView';
import { BaseTextInput } from '@/components/base/BaseTextInput';
import { CoreColorKey } from '@/style/color';
import { SizeKey } from '@/style/size';
import { RoundKey } from '@/style/rounded';
import { DeleteButton } from './DeleteButton';

type NoteEditorProps = {
  text: string;
  onChangeText: (text: string) => void;
  onDelete: () => void;
};

export default function NoteEditor({ text, onChangeText, onDelete }: NoteEditorProps) {
  return (
    <BaseView styleKit={{ color: { colorKey: CoreColorKey.Secondary } }} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <BaseTextInput
          styleKit={{
            size: { sizeKey: SizeKey.LG },
            roundKey: RoundKey.Lg,
          }}
          style={styles.textInput}
          multiline
          placeholder="一時的なメモをここに..."
          value={text}
          onChangeText={onChangeText}
        />
        <View style={styles.buttonContainer}>

          <View style={{ width: 16 }} />
          <DeleteButton onPress={onDelete} />
        </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },
});
