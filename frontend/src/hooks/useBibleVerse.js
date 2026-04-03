import { useState, useEffect, useCallback } from 'react';
import { fetchBibleVerse } from '../services/bibleService';

export function useBibleVerse() {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadVerse = useCallback(async (ignoreCache = false) => {
    setLoading(true);
    const v = await fetchBibleVerse(ignoreCache);
    setVerse(v);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadVerse(false);
  }, [loadVerse]);

  const refresh = () => loadVerse(true);

  return { verse, loading, refresh };
}
