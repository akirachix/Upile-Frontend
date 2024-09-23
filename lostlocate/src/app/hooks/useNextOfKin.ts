import { NextOfKin } from '../utils/type';
import { useState } from 'react';
import { postNextOfKin } from '../utils/postNextOfKin'

export const useNextOfKin = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const submitNextOfKin = async (details: NextOfKin) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await postNextOfKin(details);
      console.log('Submission successful:', result);
      return true;

    } 
 
    catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('An unknown error occurred'));
      }
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };
  return { submitNextOfKin, isSubmitting, error };
};

