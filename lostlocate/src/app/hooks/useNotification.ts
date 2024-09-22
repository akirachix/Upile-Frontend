import { useEffect, useState } from 'react';
import { fetchNotifications} from '@/app/utils/fetchNotification';
import { Matches } from '@/app/utils/types';

export const useNotifications = () => {
  const [data, setData] = useState<Matches[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getNotifications = async () => {
      try {
        const result = await fetchNotifications('/api/matches');
        setData(result);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setIsLoading(false);
      }
    };

    getNotifications();
  }, []);

  return { data, isLoading, error };
};

