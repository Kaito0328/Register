import { ExtensionLifecycle, LifecycleUnit, Note, NoteLifecycle, RemainingTime, RemainingTimeDisplayUnit, RemainingTimeSpecialStatus, SpecialLifeCycleUnit as SpecialLifecycleUnit, TimeUnit } from '@/types/Note';
import dayjs from 'dayjs';

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

export const getRemainingTime = (expiresAt: number | null): RemainingTime => {
  if (expiresAt === null) {
    return { value: null, unit: RemainingTimeSpecialStatus.Forever };
  }

  const now = dayjs();
  const target = dayjs(expiresAt);

  if (now.isAfter(target)) {
    return { value: 0, unit: RemainingTimeSpecialStatus.Expired };
  }

  // diffは単位ごとに切り替え
  const minutes = target.diff(now, 'minute');
  if (minutes < 60) {
    return { value: minutes, unit: RemainingTimeDisplayUnit.Minute };
  }

  const hours = target.diff(now, 'hour');
  if (hours < 24) {
    return { value: hours, unit: RemainingTimeDisplayUnit.Hour };
  }

  const days = target.diff(now, 'day');
  if (days < 30) {
    return { value: days, unit: RemainingTimeDisplayUnit.Day };
  }

  const months = target.diff(now, 'month');
  if (months < 12) {
    return { value: months, unit: RemainingTimeDisplayUnit.Month };
  }

  const years = target.diff(now, 'year');
  return { value: years, unit: RemainingTimeDisplayUnit.Year };
};

export const calculateExpiresAt = (lifecycle: NoteLifecycle, createdAt: number): number | null => {
  const { unit, value } = lifecycle;

  if (unit === SpecialLifecycleUnit.Forever) {
    return null;
  }

  const created = dayjs(createdAt);

  if (unit === SpecialLifecycleUnit.Today) {
    return created.endOf('day').valueOf();
  }

  if (isTimeUnit(unit) && value !== null) {
    switch (unit) {
      case TimeUnit.Hour:
        return created.add(value, 'hour').valueOf();
      case TimeUnit.Day:
        return created.add(value, 'day').valueOf();
      case TimeUnit.Week:
        return created.add(value, 'week').valueOf();
      case TimeUnit.Month:
        return created.add(value, 'month').valueOf();
      case TimeUnit.Year:
        return created.add(value, 'year').valueOf();
    }
  }

  // 不正なケースは現在時刻
  return dayjs().valueOf();
};

export const convertDay = (unit: TimeUnit): dayjs.ManipulateType => {
  let dayjsUnit: dayjs.ManipulateType
  switch (unit) {
    case TimeUnit.Hour:
      dayjsUnit = 'hour';
      break;
    case TimeUnit.Day:
      dayjsUnit = 'day';
      break;
    case TimeUnit.Week:
      dayjsUnit = 'week';
      break;
    case TimeUnit.Month:
      dayjsUnit = 'month';
      break;
    case TimeUnit.Year:
      dayjsUnit = 'year';
      break;
    default:
      throw new Error('不明な単位です。');
  }

  return dayjsUnit;
};

export const extendExpiresAt = (extend: ExtensionLifecycle, expiresAt: number): number => {
  const { unit, value } = extend;
  const dayjsUnit = convertDay(unit);
  const newExpiresAt = dayjs(expiresAt).add(value, dayjsUnit).valueOf();

  return newExpiresAt;
};  