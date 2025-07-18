// components/MemoItem.tsx

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { BaseText } from '../../base/BaseText';
import { ColorViewProperty, CoreColorKey } from '@/styles/tokens';
import { Trash2 } from 'lucide-react-native';
import { BaseIcon } from '@/base/BaseIcon';

// Gesture Handler と Reanimated をインポート
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { BaseView } from '@/base/BaseView';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.25; // 画面幅の25%スワイプしたら削除

type Props = {
  onPress: () => void;
  onDelete: () => void;
  title: string;
};

export const MemoItem: React.FC<Props> = ({ onPress, onDelete, title }) => {
  // X方向の移動量を保持するアニメーション用の値
  const translateX = useSharedValue(0);

  // スワイプジェスチャーを定義
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // 左方向のスワイプのみを許可
      if (event.translationX < 0) {
        translateX.value = event.translationX;
      }
    })
    .onEnd(() => {
      // 指を離した時の処理
      if (translateX.value < SWIPE_THRESHOLD) {
        // しきい値を超えてスワイプされたら、画面外へアニメーションさせてから削除
        translateX.value = withTiming(-SCREEN_WIDTH, undefined, (isFinished) => {
          if (isFinished) {
            // アニメーション完了後、onDeleteをJSスレッドで実行
            runOnJS(onDelete)();
          }
        });
      } else {
        // しきい値に達していなければ、元の位置にスプリングバック
        translateX.value = withTiming(0);
      }
    });

  // translateXの値とコンポーネントのスタイルを紐付ける
  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <BaseView style={styles.container} styleKit={{ color: { colorKey: CoreColorKey.Danger, apply: { default: [ColorViewProperty.Bg] } } }}>
      {/* 背景の削除エリア */}
      <View style={styles.deleteBackground}>
        <BaseIcon icon={Trash2} styleKit={{ color: { colorKey: CoreColorKey.Base } }} />
        <BaseText styleKit={{ color: { colorKey: CoreColorKey.Base } }}>削除</BaseText>
      </View>

      {/* スワイプする前景エリア */}
      <GestureDetector gesture={panGesture}>
        <Animated.View style={rStyle}>
          <BaseView 
            style={styles.pressableArea} 
            styleKit={{ color: { colorKey: CoreColorKey.Secondary, apply: { default: [ColorViewProperty.Bg] } } }}
          >
            <BaseText
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
    // 背景色はstyleKitで設定
  },
  deleteBackground: {
    position: 'absolute',
    right: 0,
    height: '100%',
    width: 100, // 固定幅にする
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  pressableArea: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    // 背景色はstyleKitで設定
  },
});