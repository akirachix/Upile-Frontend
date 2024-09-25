import { useEffect, useState } from 'react';
<<<<<<< HEAD
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





=======
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
>>>>>>> dev
