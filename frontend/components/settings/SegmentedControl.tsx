import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { BaseText } from '../base/BaseText';

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
    <View style={styles.container}>
      {options.map((option, index) => {
        const isSelected = option.value === selectedValue;
        return (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.button,
              // 選択されているボタンに特別なスタイルを適用
              isSelected && styles.selectedButton,
            ]}
            onPress={() => onValueChange(option.value)}
            activeOpacity={0.8}
          >
            <BaseText style={[
              styles.text,
              // 選択されているテキストに特別なスタイルを適用
              isSelected && styles.selectedText
            ]}>
              {option.label}
            </BaseText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // 背景色を少し暗くして、ボタンが浮き出るように見せる
    backgroundColor: '#E5E5EA', 
    borderRadius: 8,
    overflow: 'hidden',
    padding: 2, // 内側に少し余白を持たせる
  },
  button: {
    flex: 1, // 各ボタンが均等に幅を持つようにする
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6, // 角を少し丸める
  },
  selectedButton: {
    // 選択されているボタンは白くして、影をつける
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  selectedText: {
    // 選択されているテキストの色は同じでも良い
    color: '#000',
  },
});
