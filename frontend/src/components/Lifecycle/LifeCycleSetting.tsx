import React, { useCallback } from 'react';
import { NoteLifecycle, SpecialLifeCycleUnit } from '@/types/Note';
import { getErrorMessage, isValidLifecycle } from '@/utils/LifeCycleUtils';
import { RemainingTimeDisplay } from './RemainingTimeDisplay';
import { SpecialLifecycleSelector } from './SpecialLifecycleSelector';
import { LifecyclePanel } from './LifecyclePanel';
import { View, StyleSheet } from 'react-native';

type Props = {
  lifecycle: NoteLifecycle;
  onChangeLifecycle: (lifecycle: NoteLifecycle) => void;
  expiresAt: number | null;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  onValidationFailure: (error: string | null) => void;
};

export const LifecycleSetting = ({
  lifecycle,
  onChangeLifecycle,
  expiresAt,
  isExpanded,
  onToggleExpand,
  onValidationFailure,
}: Props) => {

  // ★★★ ロジックの順番を修正
  const handleLifecycleChange = useCallback((newLifecycle: NoteLifecycle) => {
    // ★ 1. まず親のstateを更新して、UIに即時反映させる
    onChangeLifecycle(newLifecycle);

    // ★ 2. その後で、新しい状態のバリデーションを行う
    if (!isValidLifecycle(newLifecycle)) {
      // 不正な場合は、エラーメッセージを親に通知する
      const errorMessage = getErrorMessage(newLifecycle.unit);
      onValidationFailure(errorMessage);
    } else {
      // 正常な場合は、エラーメッセージをクリアする
      onValidationFailure(null);
    }
  }, [onChangeLifecycle, onValidationFailure]);


  const handleSelectSpecialUnit = (unit: SpecialLifeCycleUnit) => {
    // この関数は handleLifecycleChange を呼ぶので、自動的に新しいロジックが適用される
    handleLifecycleChange({ unit, value: null });
  };

  return (
    <View style={styles.container}>
      {/* ★★★ LifecyclePanelに渡すpropsを修正 */}
      <LifecyclePanel
        lifecycle={lifecycle}
        onChangeLifecycle={handleLifecycleChange}
        isExpanded={isExpanded}
        onToggleExpand={onToggleExpand}
      >
        <View style={styles.displayContent}>
          <RemainingTimeDisplay expiresAt={expiresAt} />
        </View>
        <SpecialLifecycleSelector
          lifecycle={lifecycle}
          onSelectSpecialUnit={handleSelectSpecialUnit}
        />
      </LifecyclePanel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  displayContent: {
    flex: 1,
    marginRight: 8,
  },
});
