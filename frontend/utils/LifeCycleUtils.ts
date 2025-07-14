import { LifecycleUnit, NoteLifecycle } from '@/types/Note';

export const LifeCycleNameMap: Record<LifecycleUnit, string> = {
  [LifecycleUnit.Forever]: '無期限',
  [LifecycleUnit.Today]: '当日',
  [LifecycleUnit.Hour]: '時間',
  [LifecycleUnit.Day]: '日',
  [LifecycleUnit.Month]: '月',
  [LifecycleUnit.Year]: '年',
};

/**
 * 各ライフサイクル単位が取りうる数値の範囲を定義します。
 */
export const LIFECYCLE_CONSTRAINTS = {
  [LifecycleUnit.Hour]: { min: 1, max: 23 },
  [LifecycleUnit.Day]: { min: 1, max: 30 },
  [LifecycleUnit.Month]: { min: 1, max: 11 },
  [LifecycleUnit.Year]: { min: 1, max: 10 },
} as const;

// 制約を持つ単位だけの型を定義
type ConstrainedLifecycleUnit = keyof typeof LIFECYCLE_CONSTRAINTS;

/**
 * NoteLifecycle オブジェクトが有効な値を持っているか検証します。
 * @param lifecycle 検証するライフサイクルオブジェクト
 * @returns 有効な場合は true、無効な場合は false
 */
export const isValidLifecycle = (lifecycle: NoteLifecycle): boolean => {
  const { unit, value } = lifecycle;

  // 'forever' または 'today' の場合、value は null である必要があります
  if (unit === LifecycleUnit.Forever || unit === LifecycleUnit.Today) {
    return value === null;
  }

  // それ以外の単位の場合、value は数値で、かつ定義された範囲内にある必要があります
  if (typeof value !== 'number' || !Number.isInteger(value)) {
    return false;
  }
  
  const constraints = LIFECYCLE_CONSTRAINTS[unit as ConstrainedLifecycleUnit];
  if (!constraints) {
    return false; // 'forever' 'today' 以外の未知のunitが来た場合
  }

  // 最小値と最大値の範囲内にあるかチェック
  return value >= constraints.min && value <= constraints.max;
};

/**
 * エラーメッセージを生成します。
 * @param unit 単位
 * @returns 対応するエラーメッセージ文字列
 */
export const getErrorMessage = (unit: LifecycleUnit): string => {
    if (unit === LifecycleUnit.Forever || unit === LifecycleUnit.Today) {
        return '';
    }
    const constraints = LIFECYCLE_CONSTRAINTS[unit as ConstrainedLifecycleUnit];
    if (!constraints) {
        return '不明な単位です。';
    }
    return `${constraints.min}から${constraints.max}の間の数値を入力してください。`;
}
