import React, { useState, useEffect, useRef } from 'react';
import { BaseTextInput } from '@/base/BaseTextInput';
import { ColorViewProperty, CoreColorKey, RoundKey, SizeKey } from '@/styles/tokens';

type Props = {
  // 親が持つ「公式の」タイトルを初期値として受け取る
  initialTitle: string;
  // 親の「公式の」タイトルを更新するための関数
  onTitleChange: (newTitle: string) => void;
};

export const NoteHeaderTitle = React.memo(({ initialTitle, onTitleChange }: Props) => {
  // ★★★ ユーザーの入力をリアルタイムに反映するための内部的なstate
  const [localTitle, setLocalTitle] = useState(initialTitle);
  const debounceTimer = useRef<number | null>(null);

  // ★★★ ノートが切り替わった時（initialTitleが変わった時）に内部のstateも更新
  useEffect(() => {
    setLocalTitle(initialTitle);
  }, [initialTitle]);

  // ★★★ ユーザーが入力するたびに、親への通知を500ms遅延させる（デバウンス）
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(() => {
      // ユーザーの入力が500ms止まったら、親のstateを更新する
      onTitleChange(localTitle);
    }, 500);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [localTitle, onTitleChange]);

  return (
    <BaseTextInput
      value={localTitle} // 内部のstateをvalueに設定
      onChangeText={setLocalTitle} // 入力中は内部のstateだけを更新
      viewStyleKit={{ color: { colorKey: CoreColorKey.Secondary, apply: {default:[ColorViewProperty.Bg,], focus: [ColorViewProperty.Bg, ColorViewProperty.Border]} }, size: { sizeKey: SizeKey.LG }, roundKey: RoundKey.None }}
      textStyleKit={{color: {colorKey: CoreColorKey.Base}}}
      style={{ textAlign: 'center', width: 200 }}
      placeholder="タイトル"
    />
  );
});