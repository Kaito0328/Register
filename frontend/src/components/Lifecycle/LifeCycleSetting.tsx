import { BaseView } from "@/base/BaseView";
import { NoteLifecycle, SpecialLifeCycleUnit, TimeUnit } from "@/types/Note";
import { forwardRef, useImperativeHandle, useEffect, useRef, useState, useCallback } from "react";
import { LayoutAnimation, StyleSheet, TouchableOpacity, View } from "react-native";
import { LifecycleDisplay } from "./LifecycleDisplay";
import { LifecycleEditor } from "./LifeCycleEditor";
import { ChevronDown } from 'lucide-react-native';
import { BaseIcon } from "@/base/BaseIcon";
import { CoreColorKey, SizeKey } from "@/styles/tokens";
import { ComponentStatus } from "@/types/ComponentStatus";
import { StatusMessage } from "../StatusMessage/StatusMessage";
import { calculateExpiresAt, getErrorMessage, isTimeUnit, isValidLifecycle } from "@/utils/LifeCycleUtils";
import { useNotes } from "@/contexts/NotesContext";

type SettingProps = {
  noteId: string;
  createdAt: number;
  noteLifecycle: NoteLifecycle;
  expiresAt: number | null;
  isExpanded: boolean;
  onToggleExpand?: () => void;
};

export type LifecycleSettingHandle = {
  save: () => void;
};

export const LifecycleSetting = forwardRef<LifecycleSettingHandle, SettingProps>(({
  noteId,
  createdAt,
  noteLifecycle,
  expiresAt,
  isExpanded,
  onToggleExpand = () => {},
}, ref) => {
  const { updateNote } = useNotes();
  const [lifecycle, setLifecycle] = useState<NoteLifecycle>(noteLifecycle);
  const [error, setError] = useState<string>('');
  const [saveStatus, setSaveStatus] = useState<ComponentStatus>(ComponentStatus.Idle);
  const debounceTimer = useRef<number | null>(null);

  const latestData = useRef({ noteId, createdAt, lifecycle, updateNote, noteLifecycle });
  useEffect(() => {
    latestData.current = { noteId, createdAt, lifecycle, updateNote, noteLifecycle };
  });
const handleSaveLifecycle = useCallback((lifecycleOverride?: NoteLifecycle) => {
  // ★★★ 引数で渡された値を最優先で使い、なければrefの値を使う
  const { noteId, createdAt, updateNote, noteLifecycle } = latestData.current;
  const lifecycle = lifecycleOverride ?? latestData.current.lifecycle;

  if (!isValidLifecycle(lifecycle)) {
    setError(getErrorMessage(lifecycle.unit));
    setSaveStatus(ComponentStatus.Error);
    return;
  }
  if (lifecycle.unit === noteLifecycle.unit && lifecycle.value === noteLifecycle.value) {
    return;
  }

  setSaveStatus(ComponentStatus.Loading);
  setError('');
  setTimeout(() => {
    const newExpiresAt = calculateExpiresAt(lifecycle, createdAt);
    updateNote(noteId, { lifecycle, expiresAt: newExpiresAt });
    setSaveStatus(ComponentStatus.Success);
    setTimeout(() => setSaveStatus(ComponentStatus.Idle), 2000);
  }, 500);
}, []);

  useImperativeHandle(ref, () => ({
    save: () => {
      if (isTimeUnit(latestData.current.lifecycle.unit)) {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        handleSaveLifecycle();
      }
    },
  }));

  
  const handleToggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onToggleExpand();
  };


  const handleSelectSpecialUnit = (unit: SpecialLifeCycleUnit) => {
    const newLifecycle = { unit, value: null };
    setLifecycle(newLifecycle);

    // ★★★ ここから修正 ★★★
    // 進行中のタイマーがあればキャンセル
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    // 即時保存を実行
    handleSaveLifecycle(newLifecycle);
    // ★★★ ここまで修正 ★★★
  };
  
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    if (!isTimeUnit(lifecycle.unit)) {
      setSaveStatus(ComponentStatus.Idle);
      setError('');
      return;
    }
    debounceTimer.current = setTimeout(handleSaveLifecycle, 1500);
    return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current); };
  }, [lifecycle, handleSaveLifecycle]);

  useEffect(() => {
    if (!isExpanded && isTimeUnit(lifecycle.unit)) {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      handleSaveLifecycle();
    }
  }, [isExpanded, handleSaveLifecycle]);
  
  useEffect(() => {
    setLifecycle(noteLifecycle);
  }, [noteLifecycle, expiresAt]);

  return (
    <BaseView style={styles.container} onStartShouldSetResponder={() => true}>
      <View style={styles.headerTouchable}>
        <View style={{ flex: 1 }}>
          <LifecycleDisplay
            lifecycle={lifecycle}
            expiresAt={expiresAt}
            onSelectSpecialUnit={handleSelectSpecialUnit}
          />
        </View>
        <TouchableOpacity onPress={handleToggleExpand} >
          <BaseIcon icon={ChevronDown} 
            styleKit={{
              color: { colorKey: CoreColorKey.Base },
              size: { sizeKey: SizeKey.MD } 
            }} 
            style={[styles.chevronIcon, isExpanded && styles.chevronIconExpanded]}
          />
        </TouchableOpacity>
      </View>
      {isExpanded && (
        <LifecycleEditor
          lifecycle={lifecycle}
          setLifecycle={setLifecycle}
        />
      )}
      <StatusMessage
        status={saveStatus}
        loadingMessage="保存中..."
        successMessage="✓ 保存済み"
        errorMessage={error}
      />
    </BaseView>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
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
});