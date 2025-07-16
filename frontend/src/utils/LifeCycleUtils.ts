import { LifecycleUnit, Note, NoteLifecycle, RemainingTime, RemainingTimeDisplayUnit, RemainingTimeSpecialStatus, SpecialLifeCycleUnit as SpecialLifecycleUnit, TimeUnit } from '@/types/Note';

export const LifeCycleNameMap: Record<LifecycleUnit, string> = {
  [SpecialLifecycleUnit.Forever]: '無期限',
  [SpecialLifecycleUnit.Today]: '当日',
  [TimeUnit.Hour]: '時間',
  [TimeUnit.Day]: '日',
  [TimeUnit.Week]: '週',
  [TimeUnit.Month]: '月',
  [TimeUnit.Year]: '年',
};

/**
 * 各ライフサイクル単位が取りうる数値の範囲を定義します。
 */
export const LIFECYCLE_CONSTRAINTS = {
  [TimeUnit.Hour]: { min: 1, max: 23 },
  [TimeUnit.Day]: { min: 1, max: 30 },
  [TimeUnit.Month]: { min: 1, max: 11 },
  [TimeUnit.Year]: { min: 1, max: 10 },
};

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
  if (unit === SpecialLifecycleUnit.Forever || unit === SpecialLifecycleUnit.Today) {
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
    if (unit === SpecialLifecycleUnit.Forever || unit === SpecialLifecycleUnit.Today) {
        return '';
    }
    const constraints = LIFECYCLE_CONSTRAINTS[unit as ConstrainedLifecycleUnit];
    if (!constraints) {
        return '不明な単位です。';
    }
    return `${constraints.min}から${constraints.max}の間の数値を入力してください。`;
}

export function isTimeUnit(unit: LifecycleUnit): boolean {
  return unit !== SpecialLifecycleUnit.Forever && unit !== SpecialLifecycleUnit.Today;
}

export const calculateExpiresAt = (lifecycle: NoteLifecycle, createdAt: number): number | null => {
  const { unit, value } = lifecycle;

  if (unit === SpecialLifecycleUnit.Forever) {
    return null;
  }

  const expirationDate = new Date(createdAt);

  if (unit === SpecialLifecycleUnit.Today) {
    expirationDate.setHours(23, 59, 59, 999); // その日の終わりに設定
    return expirationDate.getTime();
  }

  // isTimeUnitガードのおかげで、このブロックではunitが時間単位であることが保証される
  if (isTimeUnit(unit) && value !== null) {
    switch (unit) {
      case TimeUnit.Hour:
        expirationDate.setHours(expirationDate.getHours() + value);
        break;
      case TimeUnit.Day:
        expirationDate.setDate(expirationDate.getDate() + value);
        break;
      case TimeUnit.Month:
        expirationDate.setMonth(expirationDate.getMonth() + value);
        break;
      case TimeUnit.Year:
        expirationDate.setFullYear(expirationDate.getFullYear() + value);
        break;
    }
    return expirationDate.getTime();
  }

  // 不正な組み合わせの場合は現在時刻を返すなど、エラーハンドリングも可能
  return new Date().getTime();
};


const MILLISECONDS = {
  MINUTE: 1000 * 60,
  HOUR: 1000 * 60 * 60,
  DAY: 1000 * 60 * 60 * 24,
  MONTH: 1000 * 60 * 60 * 24 * 30.44,
  YEAR: 1000 * 60 * 60 * 24 * 365.24,
};

/**
 * ノートの有効期限から、現在時刻との差分を計算して返します。
 * @param note ライフサイクル情報を含むノートオブジェクト
 * @returns 計算された残り時間({ value, unit })
 */
export const getRemainingTime = (expiresAt: number | null): RemainingTime => {
  // expiresAtがnullなら無期限
  if (expiresAt === null) {
    return { value: null, unit: RemainingTimeSpecialStatus.Forever };
  }

  const remainingMs = expiresAt - Date.now();

  // 期限切れか判定
  if (remainingMs <= 0) {
    return { value: 0, unit: RemainingTimeSpecialStatus.Expired };
  }
  
  // 残り時間に応じて最適な単位に変換
  if (remainingMs < MILLISECONDS.HOUR) {
    return { value: Math.ceil(remainingMs / MILLISECONDS.MINUTE), unit: RemainingTimeDisplayUnit.Minute };
  }
  if (remainingMs < MILLISECONDS.DAY) {
    return { value: Math.ceil(remainingMs / MILLISECONDS.HOUR), unit: RemainingTimeDisplayUnit.Hour };
  }
  if (remainingMs < MILLISECONDS.MONTH) {
    return { value: Math.ceil(remainingMs / MILLISECONDS.DAY), unit: RemainingTimeDisplayUnit.Day };
  }
  if (remainingMs < MILLISECONDS.YEAR) {
    return { value: Math.ceil(remainingMs / MILLISECONDS.MONTH), unit: RemainingTimeDisplayUnit.Month };
  }
  return { value: Math.ceil(remainingMs / MILLISECONDS.YEAR), unit: RemainingTimeDisplayUnit.Year };
};