
import { useEffect, useState } from 'react';
import { displayUnidentifiedBodies} from '../utils/displayUnidentifiedBodies';
import { UnidentifiedBodies} from '../utils/types';

export const useDisplayUnidentifiedBodies = () => {
  const [data, setData] = useState<UnidentifiedBodies[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchUnidentifiedBodies = async () => {
      try {
        const result = await displayUnidentifiedBodies('/api/unidentified_bodies');

        setData(result?.unidentified_bodies);
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

    fetchUnidentifiedBodies();
}, []);

return {data, isLoading, error};
};