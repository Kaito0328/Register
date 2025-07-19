// components/MemoItem.tsx

import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { BaseText } from '../../base/BaseText';
import { ColorViewProperty, CoreColorKey, SizeKey } from '@/styles/tokens';
// ★★★ PinアイコンとTrash2アイコンをインポート
import { Pin, Trash2 } from 'lucide-react-native'; 
import { BaseIcon } from '@/base/BaseIcon';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { BaseView } from '@/base/BaseView';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.25;

type Props = {
  onPress: () => void;
  onDelete: () => void;
  title: string;
  isPinned: boolean; // ★ isPinned propを追加
  onTogglePin: () => void; // ★ onTogglePin propを追加
  colorKey?: CoreColorKey; // ★ colorKeyをオプションで受け取る
};

export const MemoItem: React.FC<Props> = ({
  onPress,
  onDelete,
  title,
  isPinned,
  onTogglePin,
  colorKey = CoreColorKey.Secondary, // ★ デフォルト値を設定
}) => {
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      if (event.translationX < 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd(() => {
      if (translateX.value < SWIPE_THRESHOLD) {
        translateX.value = withTiming(-SCREEN_WIDTH, undefined, (isFinished) => {
          if (isFinished) {
            runOnJS(onDelete)();
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <BaseView style={styles.container} styleKit={{ color: { colorKey: CoreColorKey.Danger, apply: { default: [ColorViewProperty.Bg] } } }}>
      <View style={styles.deleteBackground}>
        <BaseIcon icon={Trash2} styleKit={{ color: { colorKey: CoreColorKey.Base } }} />
        <BaseText styleKit={{ color: { colorKey: CoreColorKey.Base } }}>削除</BaseText>
      </View>
      
      <GestureDetector gesture={panGesture}>
        <Animated.View style={rStyle}>
          {/* ★★★ BaseViewのstyleKitに動的なcolorKeyを適用 */}
          <BaseView 
            style={styles.pressableArea} 
            styleKit={{ color: { colorKey: colorKey, apply: { default: [ColorViewProperty.Bg] } } }}
          >
            <TouchableOpacity onPress={onTogglePin} style={styles.pinButton}>
              <BaseIcon
                icon={Pin}
                styleKit={{ color: { colorKey: isPinned ? CoreColorKey.Primary : CoreColorKey.Base }, size: { sizeKey: SizeKey.MD } }}
                style={{ transform: isPinned ? [{ rotate: '45deg' }] : [] }}
              />
            </TouchableOpacity>

            <BaseText
              style={styles.titleText}
              styleKit={{ color: { colorKey: CoreColorKey.Base } }}
              numberOfLines={1}
              onPress={onPress}
            >
              {title}
            </BaseText>
          </BaseView>
        </Animated.View>
      </GestureDetector>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    justifyContent: 'center',
  },
  deleteBackground: {
    position: 'absolute',
    right: 0,
    height: '100%',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  pressableArea: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row', // ★ アイコンとテキストを横並びにする
    alignItems: 'center',
  },
  pinButton: {
    paddingRight: 12, // ★ テキストとの間に余白
  },
  titleText: {
    flex: 1, // ★ 残りのスペースを全て使う
  },
});