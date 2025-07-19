import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { BaseText } from '@/base/BaseText';
import { CoreColorKey } from '@/styles/tokens/color';
import { ComponentStatus } from '@/types/ComponentStatus';
// ★★★ lucide-react-native と BaseIcon をインポート
import { LoaderCircle, CheckCircle2, AlertCircle } from 'lucide-react-native';
import { BaseIcon } from '@/base/BaseIcon';

type Props = {
  status: ComponentStatus;
  loadingMessage?: string;
  successMessage?: string;
  errorMessage?: string;
  keepHeightOnIdle?: boolean;
};

export const StatusMessage: React.FC<Props> = ({
  status,
  loadingMessage = '処理中...',
  successMessage = '成功しました',
  errorMessage = 'エラーが発生しました',
  keepHeightOnIdle = true,
}) => {
  if (status === ComponentStatus.Idle) {
    return keepHeightOnIdle ? <View style={styles.container} /> : null;
  }

  const renderContent = () => {
    switch (status) {
      case ComponentStatus.Loading:
        return (
          <>
            {/* ★ BaseIconでローディングアイコンを表示 */}
            <BaseIcon icon={LoaderCircle} style={styles.icon} />
            <BaseText style={styles.text}>{loadingMessage}</BaseText>
          </>
        );
      case ComponentStatus.Success:
        return (
          <>
            {/* ★ BaseIconで成功アイコンを表示 */}
            <BaseIcon icon={CheckCircle2} style={styles.icon} styleKit={{ color: { colorKey: CoreColorKey.Success } }} />
            <BaseText style={styles.successText} styleKit={{ color: { colorKey: CoreColorKey.Success } }}>
              {successMessage}
            </BaseText>
          </>
        );
      case ComponentStatus.Error:
        return (
          <>
            {/* ★ BaseIconでエラーアイコンを表示 */}
            <BaseIcon icon={AlertCircle} style={styles.icon} styleKit={{ color: { colorKey: CoreColorKey.Danger } }} />
            <BaseText styleKit={{ color: { colorKey: CoreColorKey.Danger } }}>
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
    height: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8, // 上の要素との間に余白を追加
  },
  icon: {
    marginRight: 6,
  },
  text: {
    fontSize: 14,
  },
  successText: {
    fontSize: 14,
  },
});