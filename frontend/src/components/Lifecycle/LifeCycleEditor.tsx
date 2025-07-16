import { BaseTextInput } from "@/base/BaseTextInput";
import { BaseView } from "@/base/BaseView";
import { CoreColorKey } from "@/styles/tokens";
import { ComponentStatus } from "@/types/ComponentStatus";
import { LifecycleUnit, NoteLifecycle, SpecialLifeCycleUnit, TimeUnit } from "@/types/Note";
import { getErrorMessage, isValidLifecycle } from "@/utils/LifeCycleUtils";
import { useEffect, useRef, useState } from "react";
import { LayoutAnimation, StyleSheet, View } from "react-native";
import { LifeCycleUnitButton } from "./LifeCycleUnitButton";
import { BaseText } from "@/base/BaseText";
import { StatusMessage } from "../StatusMessage/StatusMessage";

const LIFECYCLE_UNITS_ORDER: TimeUnit[] = [
  TimeUnit.Hour,
  TimeUnit.Day,
  TimeUnit.Month,
  TimeUnit.Year,
];

type EditorProps = {
  handleSaveTimeUnit: (value: string, unit: TimeUnit) => void;
  handleSelectTimeUnit: (unit: LifecycleUnit) => void;
  currentLifecycle: NoteLifecycle;
};

/**
 * 期間を詳細設定するためのコンポーネント。展開時に表示されます。
 */
export const LifecycleEditor: React.FC<EditorProps> = ({ handleSaveTimeUnit, handleSelectTimeUnit, currentLifecycle }) => {
  const [unit, setUnit] = useState<LifecycleUnit>(currentLifecycle.unit);
  const [value, setValue] = useState<string>(currentLifecycle.value?.toString() || '');
  const [error, setError] = useState<string>('');
  const [saveStatus, setSaveStatus] = useState<ComponentStatus>(ComponentStatus.Idle);
  const debounceTimer = useRef<number | null>(null);

  useEffect(() => {
    // ライフサイクルが特殊単位に変わったら、内部状態をリセット
    if (currentLifecycle.unit === SpecialLifeCycleUnit.Forever || currentLifecycle.unit === SpecialLifeCycleUnit.Today) {
      setUnit(currentLifecycle.unit);
      setValue('');
    }
  }, [currentLifecycle]);

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    setError('');
    setSaveStatus(ComponentStatus.Idle);
    if(unit === SpecialLifeCycleUnit.Forever || unit === SpecialLifeCycleUnit.Today) return;

    debounceTimer.current = setTimeout(() => {
      handleSaveTimeUnit(value, unit);
    }, 1500);

    return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current); };
  }, [unit, value]);

  const handleUnitSelect = (selectedUnit: LifecycleUnit) => {
    setValue('');
    handleSelectTimeUnit(selectedUnit);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setUnit(selectedUnit);

  };

  const isCustomInputEditable = unit !== SpecialLifeCycleUnit.Forever && unit !== SpecialLifeCycleUnit.Today;

  return (
    <View style={styles.editorContainer}>
      <View style={styles.customContainer}>
        <BaseTextInput
          colorKey={CoreColorKey.Base}
          style={styles.input}
          value={value}
          onChangeText={setValue}
          keyboardType="number-pad"
          placeholder="期間"
          editable={isCustomInputEditable}
        />
        <View style={styles.unitSelector}>
          {LIFECYCLE_UNITS_ORDER.map((targetUnit) => (
            <LifeCycleUnitButton
              key={targetUnit}
              unit={targetUnit}
              isSelected={unit === targetUnit}
              onPress={() => handleUnitSelect(targetUnit)}
            />
          ))}
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  editorContainer: {
    width: '100%',
    paddingTop: 16,
  },
  customContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    width: 80,
    textAlign: 'center',
    marginRight: 16,
  },
  unitSelector: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
});