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
};

export enum LifecycleUnit {
  Forever = 'forever',
  Today = 'today',
  Hour = 'hour',
  Day = 'day',
  Month = 'month',
  Year = 'year',
}

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
