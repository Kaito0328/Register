import { BaseView } from "@/base/BaseView";
import { LifecycleUnit, Note, NoteLifecycle, SpecialLifeCycleUnit, TimeUnit } from "@/types/Note";
import { forwardRef, useImperativeHandle, useEffect, useRef, useState } from "react";
import { LayoutAnimation, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { LifecycleDisplay } from "./LifecycleDisplay";
import { LifecycleEditor } from "./LifeCycleEditor";
import { ChevronDown } from 'lucide-react-native';
import { BaseIcon } from "@/base/BaseIcon";
import { CoreColorKey, SizeKey } from "@/styles/tokens";
import { ComponentStatus } from "@/types/ComponentStatus";
import { StatusMessage } from "../StatusMessage/StatusMessage";
import { calculateExpiresAt, getErrorMessage, isTimeUnit, isValidLifecycle } from "@/utils/LifeCycleUtils";
import { useNotes } from "@/hooks/useNotes";

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
  const [lifecycle, setLifecycle] = useState<NoteLifecycle>(noteLifecycle);
    const [error, setError] = useState<string>('');
    const [saveStatus, setSaveStatus] = useState<ComponentStatus>(ComponentStatus.Idle);
    const debounceTimer = useRef<number | null>(null);
    const { updateNote } = useNotes();
  
  const handleToggleExpand = () => {
    if (isExpanded) {
      
    }
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onToggleExpand();
  };

  const handleSelectSpecialUnit = (unit: SpecialLifeCycleUnit) => {
    setLifecycle({ unit, value: null });
    handleSaveLifecycle({ unit, value: null });
  };

  
  const handleSaveLifecycle = (lifecycleToSave: NoteLifecycle) => {
      if (isValidLifecycle(lifecycle)) {
        setSaveStatus(ComponentStatus.Loading);
        setTimeout(() => {
        const expiresAt = calculateExpiresAt(lifecycleToSave, createdAt);
        updateNote(noteId, { lifecycle: lifecycleToSave, expiresAt });
          setSaveStatus(ComponentStatus.Success);
          setTimeout(() => setSaveStatus(ComponentStatus.Idle), 2000);
        }, 500);
      } else {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setError(getErrorMessage(lifecycle.unit));
        setSaveStatus(ComponentStatus.Error);
        if (!isExpanded) {
          setTimeout(() => setSaveStatus(ComponentStatus.Idle), 5000);
        }
      }
    };

    useImperativeHandle(ref, () => ({
    save: () => {
      // isTimeUnitの時だけ保存するなど、条件に応じた保存を実行
      if (isTimeUnit(lifecycle.unit)) {
        if (debounceTimer.current) clearTimeout(debounceTimer.current);
        handleSaveLifecycle(lifecycle);
      }
    },
  }));

  useEffect(() => {
    
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    setError('');
    setSaveStatus(ComponentStatus.Idle);
    if (!isTimeUnit(lifecycle.unit)) return;

    debounceTimer.current = setTimeout(() => {
      handleSaveLifecycle(lifecycle);
    }, 1500);

    return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current); };
  }, [lifecycle]);

    useEffect(() => {
      console.log('LifecycleSetting: isExpanded changed', isExpanded);
      if (!isExpanded && isTimeUnit(lifecycle.unit)) {
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
        }
        console.log('LifecycleSetting: Saving lifecycle on collapse', lifecycle);
        handleSaveLifecycle(lifecycle);
      }
    }, [isExpanded]);

  return (
    <View>
      
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
            <BaseIcon
              icon={ChevronDown}
              styleKit={{
                color: { colorKey: CoreColorKey.Base },
                size: { sizeKey: SizeKey.MD } // 16pxに相当するサイズキーを指定
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
    </View>
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
    marginLeft: 16, // displayContainerとの間に余白
  },
    chevronIconExpanded: {
    transform: [{ rotate: '180deg' }],
  },
});
