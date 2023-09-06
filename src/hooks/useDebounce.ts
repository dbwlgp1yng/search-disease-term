import { useState, useEffect } from 'react';

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedValue(value); // 값이 변경될 때마다 타이머 재설정
    }, delay);

    return () => {
      clearTimeout(timerId); // 이전 타이머를 제거합니다.
    };
  }, [value, delay]);

  return debouncedValue;
}
