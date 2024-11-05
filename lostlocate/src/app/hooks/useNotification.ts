import { useEffect, useState } from 'react';
import { fetchNotifications } from '@/app/utils/fetchNotification';
import { Matches } from '@/app/utils/types';

export const useNotifications = () => {
  const [data, setData] = useState<Matches[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getNotifications = async () => {
      setLoading(true);
      try {
        const response = await fetchNotifications();  
        console.log({ response });
        setData(response);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    getNotifications();
  }, []);

  return { data, loading, error };
};

