import React from 'react';
import { Button } from '../Button';
import { CoreColorKey } from '@/styles/tokens/color';
import { Alert } from 'react-native';

type Props = {
  onPress: () => void;
};

/**
 * ノートを削除するためのボタン
 * 誤操作を防ぐために確認ダイアログを表示します。
 */
export const DeleteButton: React.FC<Props> = ({ onPress }) => {
  const handleDeletePress = () => {
    Alert.alert(
      "ノートを削除",
      "このノートを本当に削除しますか？この操作は元に戻せません。",
      [
        {
          text: "キャンセル",
          style: "cancel"
        },
        { 
          text: "削除", 
          onPress: onPress, // OKが押されたら渡されたonPressを実行
          style: "destructive" 
        }
      ]
    );
  };

  return (
    <Button
      onPress={handleDeletePress}
      // 背景色をデンジャーカラーに
      viewStyleKit={{ color: { colorKey: CoreColorKey.Danger } }}
      // 文字色を背景色に合わせて調整
      textStyleKit={{ color: { colorKey: CoreColorKey.Secondary } }}
    >
      削除
    </Button>
  );
};
