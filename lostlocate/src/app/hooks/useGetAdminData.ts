import { useState, useEffect } from 'react';
import { fetchTotalStations } from '../utils/fecthAdminData';
import { fetchSuccessfulMatches } from '../utils/fecthAdminData';
import { fetchTotalMortuaries } from '../utils/fecthAdminData';


export const useGetAdminData = () => {
  const [metrics, setMetrics] = useState({
    TotalPoliceStations: 0,
    TotalMortuaries: 0,
    SuccessfulMatches: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const result = await fetchTotalStations();
        const output = await fetchTotalMortuaries();
        const results = await fetchSuccessfulMatches();
        
      
        setMetrics({
            TotalPoliceStations: result.total_police_officers ?? 0, 
            TotalMortuaries: output.total_mortuaries ?? 0, 
            SuccessfulMatches: results.matches ?? 0, 
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

