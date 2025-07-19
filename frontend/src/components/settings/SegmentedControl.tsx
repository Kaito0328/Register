import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { BaseText } from '../../base/BaseText';
import { BasePressable } from '@/base/BasePressable';
import { ColorViewProperty, CoreColorKey, RoundKey, ShadowKey } from '@/styles/tokens';
import { BaseView } from '@/base/BaseView';

// 単一の選択肢の型を定義
type Option = {
  label: string;
  value: string;
};

// SegmentedControlが受け取るpropsの型を定義
type Props = {
  options: Option[];
  selectedValue: string;
  onValueChange: (value: string) => void;
};

/**
 * 複数の選択肢から一つを選ぶためのUIコンポーネント
 */
export const SegmentedControl: React.FC<Props> = ({ options, selectedValue, onValueChange }) => {
  return (
    <BaseView style={styles.container} styleKit={{ color: { colorKey: CoreColorKey.Secondary, apply: { default: [ColorViewProperty.Bg] } }, roundKey: RoundKey.Sm }}>
      {/* ★ 1. ScrollViewでラップして、横方向にはみ出さないようにする */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {options.map((option) => {
          const isSelected = option.value === selectedValue;
          return (
            <BasePressable
              key={option.value}
              style={styles.button}
              // ★ 2. styleKitを使って、選択状態のスタイルを適用
              styleKit={{
                color: { colorKey: isSelected ? CoreColorKey.Base : CoreColorKey.Secondary },
                shadowKey: isSelected ? ShadowKey.SM : ShadowKey.None,
                roundKey: RoundKey.Sm,
              }}
              onPress={() => onValueChange(option.value)}
            >
              <BaseText 
                style={styles.text}
                // ★ 3. 選択状態に応じてテキストの色も変更
                styleKit={{ color: { colorKey: CoreColorKey.Base } }}
              >
                {option.label}
              </BaseText>
            </BasePressable>
          );
        })}
      </ScrollView>
    </BaseView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2, // 内側に少し余白を持たせる
  },
  scrollContent: {
    flexDirection: 'row',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 16, // 少し広めのパディング
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2, // ボタン間に少し余白
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
  },
});