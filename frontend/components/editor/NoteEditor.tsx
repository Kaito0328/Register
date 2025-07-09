// --------------------------------------------------
import React, { useState, useEffect } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { BaseView } from '@/components/base/BaseView';
import { BaseTextInput } from '@/components/base/BaseTextInput';
import { CoreColorKey } from '@/style/color';
import { SizeKey } from '@/style/size';
import { Note } from '@/hooks/useNotes';
import { RoundKey } from '@/style/rounded';

type NoteEditorProps = {
  note: Note;
  onSave: (id: string, text: string) => void;
};

export default function NoteEditor({ note, onSave }: NoteEditorProps) {
  const [text, setText] = useState(note.text);

  // 3秒間入力がなかったら自動で保存する
  useEffect(() => {
    const handler = setTimeout(() => {
      if (text !== note.text) {
        onSave(note.id, text);
      }
    }, 3000);

    return () => {
      clearTimeout(handler);
    };
  }, [text, note, onSave]);

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
          onChangeText={setText}
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