import { PartialViewStyleKit, pressableStyleMaps, StateFlags, resolveStyle, useViewStyles, ViewStyleKit } from "@/styles/component";
import { ColorViewProperty, CoreColorKey, RoundKey, ShadowKey, SizeKey, SizeViewProperty } from "@/styles/tokens";
import { useCallback } from "react";
import { Pressable, PressableProps, PressableStateCallbackType, StyleProp, ViewStyle } from "react-native";

const DEFAULT_PRESSABLE_KIT: ViewStyleKit = {
  color: {
    colorKey: CoreColorKey.Primary,
    apply: {
      default: [ColorViewProperty.Bg],
      pressed: [ColorViewProperty.Bg],
      disabled: [ColorViewProperty.Bg],
    },
  },
  size: {
    sizeKey: SizeKey.MD,
    apply: {
      default: [SizeViewProperty.Padding],
      pressed: [SizeViewProperty.Padding],
    },
  },
  roundKey: RoundKey.Md,
  shadowKey: ShadowKey.MD,
};

export type BasePressableProps = PressableProps & {
  styleKit?: PartialViewStyleKit;
};

export const BasePressable: React.FC<BasePressableProps> = ({
  styleKit,
  style,
  disabled,
  ...props
}) => {
  // 1. 全ての状態のスタイルマップを生成
  const viewStyles = useViewStyles(
    DEFAULT_PRESSABLE_KIT,
    styleKit,
    pressableStyleMaps
  );

  // 2. styleプロパティに渡すコールバック関数をuseCallbackでメモ化
  const pressableStyleCallback = useCallback(
    (state: PressableStateCallbackType): StyleProp<ViewStyle> => {
      // 3. 現在の状態フラグを作成
      const stateFlags: StateFlags = {
        pressed: state.pressed,
        disabled: disabled ?? false,
      };

      // 4. 現在の状態に応じたスタイルを解決
      const resolvedStyle = resolveStyle(viewStyles, stateFlags);

      // 5. 外部から渡されたstyleが関数であれば実行し、そうでなければそのまま使う
      const externalStyle =
        typeof style === 'function' ? style(state) : style;

      // 6. 解決したスタイルと外部のスタイルをマージして返す
      return [resolvedStyle, externalStyle];
    },
    [viewStyles, style, disabled] // 依存配列
  );

  return (
    <Pressable
      style={pressableStyleCallback} // メモ化した関数を渡す
      disabled={disabled}
      {...props}
    />
  );
};