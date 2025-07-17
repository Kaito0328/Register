// app/note/[id].tsx

import React, { useState, useLayoutEffect, useEffect, useCallback, useRef } from 'react';
import { useNavigation, useLocalSearchParams, router, useFocusEffect } from 'expo-router';
import { AppState, View, StyleSheet, Pressable, LayoutAnimation } from 'react-native';
import { BaseText } from '@/base/BaseText';
import { BaseView } from '@/base/BaseView';
import { useNotes } from '@/contexts/NotesContext';
import { NoteActionSheet } from '@/components/KebabMenu/NoteActionSheet';
import { Note, NoteLifecycle } from '@/types/Note';
import { CoreColorKey } from '@/styles/tokens';

import { NoteHeaderTitle, type NoteHeaderTitleHandle } from '@/components/Header/NoteHeaderTitle';
import { NoteHeaderMenu } from '@/components/Header/NoteHeaderMenu';
import { NoteContent, type NoteContentHandle } from '@/components/editor/NoteContent';
import { LifecycleSetting, type LifecycleSettingHandle } from '@/components/Lifecycle/LifeCycleSetting';

export default function NoteDetailScreen() {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { findNoteById, deleteNote } = useNotes();
  const note = findNoteById(id);

  console.log("id:", id); // デバッグ用ログ
  console.log("note:", note); // デバッグ用ログ

  const [menuVisible, setMenuVisible] = useState(false);
  const [isLifecycleExpanded, setIsLifecycleExpanded] = useState(false);

  // ★★★ 子コンポーネントを操作するためのrefを準備
  const titleRef = useRef<NoteHeaderTitleHandle>(null);
  const contentRef = useRef<NoteContentHandle>(null);
  const lifecycleRef = useRef<LifecycleSettingHandle>(null);

  const handleToggleExpand = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsLifecycleExpanded(prev => !prev);
  }, []);

  // ★★★ 親の役割は「全員に保存を命令する」ことだけ
  const handleFinalSave = useCallback(() => {
    titleRef.current?.save();
    contentRef.current?.save();
    lifecycleRef.current?.save();
  }, []);

  const handleDelete = () => {
    if (!note) return;
    deleteNote(note.id);
    router.back();
  };

  useFocusEffect(
    useCallback(() => {
      console.log(`Screen focused for note ID: ${id}`); // デバッグ用ログ
      
      // ★★★ このスクリーンからフォーカスが外れた時に実行されるクリーンアップ関数
      return () => {
        console.log(`Screen lost focus for note ID: ${id}, saving note...`); // デバッグ用ログ
        handleFinalSave();
      };
    }, [handleFinalSave, id]) // idも依存配列に追加
  );

  // ★★★ ページから離れる直前の保存処理（beforeRemoveイベント）
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      console.log(`beforeRemove triggered for note ID: ${id}, saving note...`); // デバッグ用ログ
      // 保存処理を実行
      handleFinalSave();
    });

    return unsubscribe;
  }, [navigation, handleFinalSave, id]);

  // ★★★ ノートIDが変更された時の保存処理
  const prevIdRef = useRef<string | undefined>(id);
  useEffect(() => {
    if (prevIdRef.current && prevIdRef.current !== id) {
      console.log(`Note ID changed from ${prevIdRef.current} to ${id}, saving previous note...`); // デバッグ用ログ
      // 前のノートの保存を即座に実行
      handleFinalSave();
    }
    prevIdRef.current = id;
  }, [id, handleFinalSave]);

  useLayoutEffect(() => {
    if (!note) return;
    navigation.setOptions({
      headerTitle: () => (
        <NoteHeaderTitle ref={titleRef} noteId={note.id} initialTitle={note.title} />
      ),
      headerRight: () => (
        <NoteHeaderMenu onPress={() => setMenuVisible(true)} />
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, note]);
  
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState.match(/inactive|background/)) {
        console.log('App going to background, saving note...'); // デバッグ用ログ
        handleFinalSave();
      }
    });
    
    // ★★★ コンポーネントのアンマウント時にも保存
    return () => {
      console.log('Component unmounting, saving note...'); // デバッグ用ログ
      subscription.remove();
      handleFinalSave();
    };
  }, [handleFinalSave]);

  if (!note) {
    return <BaseView style={styles.container}><BaseText>ノートが見つかりません。</BaseText></BaseView>;
  }

  return (
    <BaseView style={styles.container} styleKit={{ color: { colorKey: CoreColorKey.Base } }}>
      <View style={styles.settingWrapper}>
        <LifecycleSetting
          noteId={note.id}
          createdAt={note.createdAt}
          ref={lifecycleRef}
          noteLifecycle={note.lifecycle}
          expiresAt={note.expiresAt}
          isExpanded={isLifecycleExpanded}
          onToggleExpand={handleToggleExpand}
        />
      </View>

      <View style={styles.contentWrapper}>
        <NoteContent
          ref={contentRef}
          noteId={note.id}
          initialText={note.text || ''}
        />
      </View>

      {isLifecycleExpanded && (
        <Pressable style={styles.backdrop} onPress={handleToggleExpand} />
      )}

      <NoteActionSheet
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
        onDelete={handleDelete}
        note={note}
      />
    </BaseView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    width: '100%',
  },
  settingWrapper: {
    zIndex: 100,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 99,
  },
});