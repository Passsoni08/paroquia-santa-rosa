import { useState, useEffect } from 'react';
import { fetchLiturgiaHoje } from '../services/liturgiaService';

export function useLiturgia() {
  const [liturgia, setLiturgia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const data = await fetchLiturgiaHoje(controller.signal);
        setLiturgia(data);
      } catch (err) {
        if (!controller.signal.aborted) setError(err);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  return { liturgia, loading, error };
}
