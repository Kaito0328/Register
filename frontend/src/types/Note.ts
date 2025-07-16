export type Note = {
  id: string;
  text: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  /**
   * ノートがピン留めされているか
   */
  isPinned: boolean;
  /**
   * ノートのライフサイクル設定
   */
  lifecycle: NoteLifecycle;
  expiresAt: number | null;
};

export enum TimeUnit {
  Hour = '時間',
  Day = '日',
  Week = '週',
  Month = '月',
  Year = '年',
}

export enum SpecialLifeCycleUnit {
  Forever = '無期限',
  Today = '当日',
}

export type LifecycleUnit  = SpecialLifeCycleUnit | TimeUnit;

/**
 * ライフサイクルの設定情報を保持する型
 */
export type NoteLifecycle = {
  unit: LifecycleUnit;
  /**
   * unitが 'forever' または 'today' の場合は null になります
   */
  value: number | null;
};


export enum RemainingTimeDisplayUnit {
  Year = '年',
  Month = '月',
  Day = '日',
  Hour = '時間',
  Minute = '分',
}

/**
 * 残り時間の特殊な状態（日本語）
 */
export enum RemainingTimeSpecialStatus {
  Forever = '無期限',
  Today = '当日中',
  Expired = '期限切れ',
}

/**
 * 残り時間の計算結果を表す型。
 * valueとunitを分離することで、UIでの柔軟な表示分けに対応します。
 */
export type RemainingTime =
  // 通常の残り時間 (例: { value: 5, unit: '時間' })
  | { value: number; unit: RemainingTimeDisplayUnit; }
  // 特殊な状態 (例: { value: null, unit: '無期限' })
  | { value: null | 0; unit: RemainingTimeSpecialStatus; };

