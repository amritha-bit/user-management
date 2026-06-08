import { useState, useCallback } from 'react';

const STORAGE_KEY = 'ums_favorites';

const loadFavorites = (): Set<number> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw) as number[]) : new Set();
  } catch {
    return new Set();
  }
};

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Set<number>>(loadFavorites);

  const toggle = useCallback((id: number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  return { favorites, toggle };
};