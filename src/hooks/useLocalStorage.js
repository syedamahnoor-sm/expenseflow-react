import { useEffect, useState } from 'react';

// Custom hook: lazily initialize state and persist changes to browser storage.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved === null ? initialValue : JSON.parse(saved);
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Unable to save local data:', error);
    }
  }, [key, value]);

  return [value, setValue];
}
