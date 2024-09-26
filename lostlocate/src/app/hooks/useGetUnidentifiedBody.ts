import { useState, useEffect } from 'react';
import { fetchUnidentifiedBodies } from '../utils/fetchbodies';
import { fetchSuccessfulMatches } from '../utils/fetchbodies';

export const useGetUnidentifiedBodies = () => {
  const [metrics, setMetrics] = useState({
    unidentifiedBodies: 0,
    successfulMatches: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const unidentifiedBodiesData = await fetchUnidentifiedBodies();
        const successfulMatchesData = await fetchSuccessfulMatches();

        setMetrics({
          unidentifiedBodies: unidentifiedBodiesData.total_unidentified_bodies ?? 0,
          successfulMatches: successfulMatchesData.matches ?? 0, 
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
