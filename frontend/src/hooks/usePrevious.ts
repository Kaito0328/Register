import { useEffect, useRef } from 'react';

// valueの「一つ前」の値を返すカスタムフック
export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T|undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}