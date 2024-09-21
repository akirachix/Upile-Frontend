import { useState, useEffect } from 'react';
import { fetchMissingPersons } from '../utils/fetchMissingPersons';
import { fetchSuccessfulMatches } from '../utils/fetchMissingPersons';


export const useGetMissingPersons = () => {
  const [metrics, setMetrics] = useState({
    successfulMatches: 0,
    openCases: 0,
    closedCases: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const result = await fetchMissingPersons();
         const results = await fetchSuccessfulMatches();
        
      
        setMetrics({
          successfulMatches: results.matches ?? 0, 
          openCases: result.total_missing_persons ?? 0, 
          closedCases: result.closedCases ?? 0, 
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(new Error('An unknown error occurred'));
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return { metrics, isLoading, error };
};

