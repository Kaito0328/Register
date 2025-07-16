import { RoundKey, RoundMap } from './types';

export const defaultRoundMap: RoundMap = {
  [RoundKey.None]: 0, // 角丸なし
  // 小さな角丸
  [RoundKey.Sm]: 6,
  // 標準的な角丸
  [RoundKey.Md]: 12,
  // 大きな角丸
  [RoundKey.Lg]: 24,
  // 完全な円形（ピル形状）にするための大きな値
  [RoundKey.Full]: 9999,
};

/**
 * BaseIconコンポーネントに特化した角丸の定義マップ
 */
export const baseIconRoundMap: RoundMap = {
  ...defaultRoundMap, // まずデフォルトの定義をすべて継承
  
  // アイコンの場合、MDサイズはもう少し丸みを強くすることが多い
  [RoundKey.Md]: 10,

  // LGサイズは完全な円形にすることが多い
  [RoundKey.Lg]: 9999,
};