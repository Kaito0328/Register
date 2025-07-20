import React from "react";
import { LayoutAnimation, StyleSheet, TouchableOpacity, View } from "react-native";
import { BaseIcon } from "@/base/BaseIcon";
import { ChevronDown } from "lucide-react-native";
import { SizeKey } from "@/styles/tokens";
import { LifecycleEditor } from "./LifeCycleEditor";
import { NoteLifecycle } from "@/types/Note";

// ★★★ 1. Propsの型をシンプルに変更
type PanelProps = {
  // 親が管理している現在のライフサイクルを受け取る
  lifecycle: NoteLifecycle;
  // 変更があったことを親に通知するための関数
  onChangeLifecycle: (lifecycle: NoteLifecycle) => void;
  children: React.ReactNode;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
};

// ★★★ 2. forwardRef, useImperativeHandleを削除し、通常のコンポーネントに変更
export const LifecyclePanel = ({
  lifecycle,
  onChangeLifecycle,
  children,
  isExpanded, // isExpandedは親から制御されるので、内部stateは不要
  onToggleExpand,
}: PanelProps) => {

  // ★★★ 3. 内部のstate, ref, useEffectはすべて削除

  const handleToggleExpand = () => {
    // LayoutAnimationはUIの見た目のためだけなので、そのままでOK
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (onToggleExpand) {
      onToggleExpand();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerTouchable}>
        <View style={styles.displayContainer}>
          {children}
        </View>
        {onToggleExpand && (
          <TouchableOpacity onPress={handleToggleExpand}>
            <BaseIcon icon={ChevronDown} styleKit={{ size: { sizeKey: SizeKey.MD } }} style={[styles.chevronIcon, isExpanded && styles.chevronIconExpanded]} />
          </TouchableOpacity>
        )}
      </View>
      {isExpanded && (
        <LifecycleEditor
          lifecycle={lifecycle}
          // ★★★ 4. 親から渡されたonChangeLifecycle関数を直接渡す
          setLifecycle={onChangeLifecycle}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  headerTouchable: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chevronIcon: {
    marginLeft: 16,
  },
  chevronIconExpanded: {
    transform: [{ rotate: '180deg' }],
  },
  displayContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
