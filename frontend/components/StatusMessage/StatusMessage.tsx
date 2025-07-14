import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // アイコンライブラリの例
import { BaseText } from '@/components/base/BaseText';
import { CoreColorKey } from '@/style/color';
import { ComponentStatus } from '@/types/ComponentStatus';



type Props = {
  status: ComponentStatus;
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  // アイドル状態でも高さを維持するかどうか
  keepHeightOnIdle?: boolean;
};

export const StatusMessage: React.FC<Props> = ({
  status,
  loadingMessage = '処理中...', // デフォルトメッセージを設定
  successMessage = '成功しました',
  errorMessage = 'エラーが発生しました',
  keepHeightOnIdle = true,
}) => {
  // Idle状態の場合は何も表示しない
  if (status === ComponentStatus.Idle) {
    return keepHeightOnIdle ? <View style={styles.container} /> : null;
  }

  const renderContent = () => {
    switch (status) {
      case ComponentStatus.Loading:
        return (
          <>
            <ActivityIndicator size="small" color="#666" style={styles.icon} />
            <BaseText style={styles.text}>{loadingMessage}</BaseText>
          </>
        );
      case ComponentStatus.Success:
        return (
          <>
            <Ionicons name="checkmark-circle-outline" size={18} style={[styles.icon, styles.successIcon]} />
            <BaseText style={[styles.text, styles.successText]} styleKit={{ color: { colorKey: CoreColorKey.Success } }}>
              {successMessage}
            </BaseText>
          </>
        );
      case ComponentStatus.Error:
        return (
          <>
            <Ionicons name="alert-circle-outline" size={18} style={[styles.icon, styles.errorIcon]} />
            <BaseText style={[styles.text, styles.errorText]} styleKit={{ color: { colorKey: CoreColorKey.Danger } }}>
              {errorMessage}
            </BaseText>
          </>
        );
      default:
        return null;
    }
  };

  return <View style={styles.container}>{renderContent()}</View>;
};

const styles = StyleSheet.create({
  container: {
    height: 24, // 高さを固定してレイアウトのガタつきを防ぐ
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 6,
  },
  text: {
    fontSize: 14,
    color: '#666', // デフォルトの文字色
  },
  successIcon: {
    color: '#28a745', // styleKitが適用される前のフォールバック
  },
  successText: {
    fontWeight: 'bold',
  },
  errorIcon: {
    color: '#dc3545',
  },
  errorText: {
    // スタイルはstyleKitで適用
  },
});

