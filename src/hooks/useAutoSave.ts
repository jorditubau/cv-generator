import { useEffect, useRef } from 'react';
import { CVData } from '../types/cv.types';

const STORAGE_KEY = 'cvcraft_data';

export function useAutoSave(cvData: CVData) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
      } catch {
        // Storage might be full
      }
    }, 2000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [cvData]);
}

export function loadSavedCV(): CVData | null {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as CVData;
    return null;
  } catch {
    return null;
  }
}
