import React from 'react';
import { useFocusEffect, router } from 'expo-router';
import { useNotes } from '@/hooks/useNotes';
import { View } from 'react-native';

/**
 * この画面は、アプリ起動時に一瞬だけ表示され、
 * 新しいノートを作成して、その編集画面に即座にリダイレクトする役割を担います。
 */
export default function NewNoteRedirectScreen() {
  const { createNote } = useNotes();

  useFocusEffect(
    // useFocusEffectには、React.useCallbackでラップした関数を渡すのが作法です。
    React.useCallback(() => {
      // 1. 新しい空のノートを作成する
      const newNote = createNote('');
      
      // 2. 作成したノートの編集画面に遷移する（置き換える）
      // この時点ではナビゲーターの準備が完了しているので、エラーは発生しない。
      router.replace(`/note/${newNote.id}`);

      // このエフェクトは、画面からフォーカスが外れた際にクリーンアップ関数を返すこともできます。
      // 今回は不要なので、何も返しません。
    }, [createNote]) // createNoteが変更されない限り、この関数は再生成されない
  );

  // 遷移が完了するまでの間、何も表示しないか、ローディング画面を表示する
  return <View />;
}