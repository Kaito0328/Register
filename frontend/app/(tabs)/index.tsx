import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';

export default function MemoScreen() {
  const [text, setText] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.editorContainer}>
          <TextInput
            style={styles.textInput}
            multiline // 複数行の入力を許可
            placeholder="一時的なメモをここに..." // 入力前に表示されるテキスト
            placeholderTextColor="#999" // プレースホルダーの色
            value={text}
            onChangeText={setText}
            autoFocus // 画面を開いたらすぐに入力を開始
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // 背景色を白に
  },
  editorContainer: {
    flex: 1,
    padding: 20, // 内側の余白
  },
  textInput: {
    flex: 1,
    fontSize: 18, // 文字サイズ
    lineHeight: 28, // 行の高さ
    textAlignVertical: 'top', // Androidでカーソルを上部に配置
  },
});