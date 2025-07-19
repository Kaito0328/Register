// components/Lifecycle/LifecyclePanel.tsx

import React, { forwardRef, useImperativeHandle, useEffect, useRef, useState, useCallback } from "react";
import { LayoutAnimation, StyleSheet, TouchableOpacity, View } from "react-native";
import { BaseIcon } from "@/base/BaseIcon";
import { ChevronDown } from "lucide-react-native";
import { isTimeUnit, isValidLifecycle, getErrorMessage } from "@/utils/LifeCycleUtils";
import { SizeKey } from "@/styles/tokens";
import { LifecycleEditor } from "./LifeCycleEditor";
import { NoteLifecycle } from "@/types/Note";

type PanelProps = {
  initialLifecycle: NoteLifecycle;
  onSave: (lifecycle: NoteLifecycle) => void;
  children: React.ReactNode;
  isExpanded?: boolean; // ★ 1. isExpanded をオプションのpropとして追加
  onToggleExpand?: () => void; // ★ 1. onToggleExpand をオプションのpropとして追加
};

export type LifecyclePanelHandle = {
  save: () => void;
};

export const LifecyclePanel = forwardRef<LifecyclePanelHandle, PanelProps>(({
  initialLifecycle,
  onSave,
  children,
  isExpanded: controlledIsExpanded, // ★ propを別名で受け取る
  onToggleExpand,
}, ref) => {
  // ★ 2. 内部で展開状態を管理するstate
  const [internalIsExpanded, setInternalIsExpanded] = useState(false);

  // ★ 3. propsでisExpandedが渡されたらそれを使い、なければ内部のstateを使う
  const isExpanded = controlledIsExpanded ?? internalIsExpanded;

  const [lifecycle, setLifecycle] = useState<NoteLifecycle>(initialLifecycle);
  const debounceTimer = useRef<number | null>(null);

  const latestData = useRef({ lifecycle, onSave });
  useEffect(() => {
    latestData.current = { lifecycle, onSave };
  });

  const handleSave = useCallback((lifecycleOverride?: NoteLifecycle) => {
    const { onSave } = latestData.current;
    const lifecycleToSave = lifecycleOverride ?? latestData.current.lifecycle;
      onSave(lifecycleToSave);
  }, []);

  useImperativeHandle(ref, () => ({
    save: () => {
      if (isTimeUnit(latestData.current.lifecycle.unit)) {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        handleSave();
      }
    },
  }));
  const handleToggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (onToggleExpand) {
      onToggleExpand();
    } else {
      setInternalIsExpanded(prev => !prev);
    }
  };

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    if (!isTimeUnit(lifecycle.unit)) return;
    debounceTimer.current = setTimeout(() => handleSave(), 1500);
    return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current); };
  }, [lifecycle, handleSave]);

  useEffect(() => {
    if (!isExpanded && isTimeUnit(lifecycle.unit)) {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      handleSave();
    }
  }, [isExpanded, handleSave]);

  useEffect(() => {
    setLifecycle(initialLifecycle);
  }, [initialLifecycle]);

 return (
    <View style={styles.container}>
      <View style={styles.headerTouchable}>
        {/* ★★★ displayContainerはchildrenを横に並べるだけ */}
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
          setLifecycle={setLifecycle}
        />
      )}
    </View>
  );
});

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
    // ★★★ justifyContentを削除
  },
});