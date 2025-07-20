import { BaseText } from "@/base/BaseText";
import { CoreColorKey } from "@/styles/tokens";
import { StyleSheet, TouchableOpacity } from "react-native";

// メニューの各項目ボタン
export const ActionButton: React.FC<{ label: string; onPress: () => void; isDestructive?: boolean }> = ({ label, onPress, isDestructive }) => (
  <TouchableOpacity style={styles.actionButton} onPress={onPress}>
    {/* ★★★ styleKitを使ってテキストカラーを定義 */}
    <BaseText 
      style={styles.actionButtonText}
      styleKit={{ color: { colorKey: isDestructive ? CoreColorKey.Danger : CoreColorKey.Primary } }}
    >
      {label}
    </BaseText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  menuContainer: {
    marginHorizontal: 10,
    // ★★★ borderRadius, overflowを削除
  },
  actionButton: {
    padding: 20,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 18,
  },
});