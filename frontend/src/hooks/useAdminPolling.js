import { useState, useEffect, useRef } from 'react';
import { countNaoLidas } from '../services/contatoService';

export function useAdminPolling(intervalMs = 60000) {
  const [unreadCount, setUnreadCount] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    async function poll() {
      try {
        const count = await countNaoLidas();
        setUnreadCount(count);
      } catch {
        // silenciar erros de polling
      }
    }

    poll();
    intervalRef.current = setInterval(poll, intervalMs);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [intervalMs]);

  return { unreadCount, setUnreadCount };
}
