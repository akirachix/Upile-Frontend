import { useEffect, useState } from 'react';
import { fetchMissingPersonById } from '@/app/utils/fetchMissingPerson';  
import { MissingPerson } from '@/app/utils/types';  

export const useSingleMissingPerson = (id: string) => {
  const [data, setData] = useState<MissingPerson | null>(null);  
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState<Error | null>(null);  

  useEffect(() => {
    const getMissingPerson = async () => {
      setLoading(true);  
      try {
        const person = await fetchMissingPersonById(id);  
        setData(person); 
      } catch (err) {
        setError(err as Error);  
      } finally {
        setLoading(false);  
      }
    };

    if (id) {
      getMissingPerson();  
    }
  }, [id]); 

  return { data, loading, error };  
};





