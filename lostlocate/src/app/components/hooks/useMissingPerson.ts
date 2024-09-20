import { useEffect, useState } from 'react';
import { fetchData } from '@/app/utils/fetchData';
import { MissingPerson} from '@/app/utils/types';

export const useMissingPersons = () => {
  const [data, setData] = useState<MissingPerson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMissingPersons = async () => {
      try {
        const result = await fetchData('/api/missingpersons');
        console.log({result});
        
        setData(result?.missing_persons);
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

    fetchMissingPersons();
  }, []);

  return { data, isLoading, error };
};
