import React from 'react';
import { BaseText } from '@/base/BaseText';
import { CoreColorKey } from '@/styles/tokens';
import { getRemainingTime } from '@/utils/LifeCycleUtils';
import { NoteLifecycle, RemainingTime, RemainingTimeSpecialStatus } from '@/types/Note';

type Props = {
  expiresAt: number | null;
};

export const RemainingTimeDisplay: React.FC<Props> = ({  expiresAt }) => {
  const remaining = getRemainingTime(expiresAt);

  const renderRemainingText = (time: RemainingTime) => {
    if (time.unit === RemainingTimeSpecialStatus.Forever) {
      return '🗑️ 無期限';
    }
    if (time.unit === RemainingTimeSpecialStatus.Expired) {
      return '🗑️ 期限切れ';
    }
    if (time.value === null) {
      // 単位だけが設定されている状態（例：'日'）
      return `🗓️ ${time.unit} 後に消去`;
    }
    return `⏳ ${time.value}${time.unit} 後に消去`;
  };

  return (
    <BaseText styleKit={{ color: { colorKey: CoreColorKey.Base } }}>
      {renderRemainingText(remaining)}
    </BaseText>
  );
};