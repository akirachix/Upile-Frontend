
import { useEffect, useState } from 'react';
import { fetchData } from '../utils/fetchData';
import { MissingPerson } from '@/app/utils/types';

export const useMissingPersons = () => {
  const [data, setData] = useState<MissingPerson[]>([]);
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getMissingPersons = async () => {
      setLoading(true);  
      try {
        const response = await fetchData();  
        console.log({response});
        
        setData(response.missing_persons);
      } catch (err) {
        setError(err as Error);  
      } finally {
        setLoading(false);  
      }
    };

    getMissingPersons();
  }, []);

  return { data, loading, error };  
};