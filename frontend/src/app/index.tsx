import React, { useCallback } from 'react'; // ★ useCallbackをインポート
import { router, useFocusEffect } from 'expo-router'; // ★ useFocusEffectをインポート
import { useNotes } from '@/contexts/NotesContext';
import { View, ActivityIndicator } from 'react-native';

export default function IndexScreen() {
  const { isLoaded, getTopNoteId } = useNotes();

  // ★★★ このuseFocusEffectがメインのロジックになります
  // このフックは、この画面にフォーカスが当たった時に毎回実行されます
  useFocusEffect(
    useCallback(() => {
      // データの読み込みが完了していなければ、何もしない
      if (!isLoaded) {
        return;
      }

      // 読み込みが完了したら、行き先を判断する
      const topNoteId = getTopNoteId();

      if (topNoteId) {
        console.log('[IndexScreen] Focused. 一番上のノートに移動します:', topNoteId);
        router.replace(`/note/${topNoteId}`);
      } else {
        console.log('[IndexScreen] Focused. ノートがないのでempty画面に移動します');
        router.replace('/empty');
      }
    }, [isLoaded, getTopNoteId]) // isLoadedかgetTopNoteIdが変わった時に再実行
  );

  // このコンポーネント自体は、常にローディング画面を表示するだけ
  // 実際の画面遷移はuseFocusEffectが担当してくれます
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" testID="loading-indicator" />
    </View>
  );
}
