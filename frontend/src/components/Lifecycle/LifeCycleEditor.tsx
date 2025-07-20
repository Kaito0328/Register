import { BaseTextInput } from "@/base/BaseTextInput";
import { BaseView } from "@/base/BaseView";
import { CoreColorKey } from "@/styles/tokens";
import { ComponentStatus } from "@/types/ComponentStatus";
import { LifecycleUnit, NoteLifecycle, SpecialLifeCycleUnit, TimeUnit } from "@/types/Note";
import { getErrorMessage, isTimeUnit, isValidLifecycle } from "@/utils/LifeCycleUtils";
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
  setLifecycle: (lifecycle: NoteLifecycle) => void;
  lifecycle: NoteLifecycle;
};

/**
 * 期間を詳細設定するためのコンポーネント。展開時に表示されます。
 */
export const LifecycleEditor: React.FC<EditorProps> = ({ setLifecycle, lifecycle }) => {

  const setValue = (value: number | null) => {
    setLifecycle({ ...lifecycle, value });
  };

  const setTextValue = (text: string) => {
    const numericValue = text ? Number(text) : null;
    setValue(numericValue);
  };

  const handleUnitSelect = (selectedUnit: LifecycleUnit) => {
    setLifecycle({unit: selectedUnit, value: null});
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const isCustomInputEditable = isTimeUnit(lifecycle.unit);

  return (
    <View style={styles.editorContainer}>
      <View style={styles.customContainer}>
        <BaseTextInput
          colorKey={CoreColorKey.Base}
          style={styles.input}
          value={lifecycle.value?.toString() || ''}
          onChangeText={setTextValue}
          keyboardType="number-pad"
          placeholder="期間"
          editable={isCustomInputEditable}
        />
        <View style={styles.unitSelector}>
          {LIFECYCLE_UNITS_ORDER.map((targetUnit) => (
            <LifeCycleUnitButton
              key={targetUnit}
              unit={targetUnit}
              isSelected={lifecycle.unit === targetUnit}
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