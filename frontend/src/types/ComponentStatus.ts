// 汎用的なコンポーネントの状態を示すenum
export enum ComponentStatus {
  Idle = 'idle',       // 何もしていない状態
  Loading = 'loading',   // 処理中
  Success = 'success',   // 成功
  Error = 'error',     // エラー
}