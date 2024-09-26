
import { BodyDetailsData } from '../utils/types';
import { useState } from 'react';
import { postUnidentifiedBody } from '../utils/postUnidentifiedBody';


export const useCreateUnidentifiedBody = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const submitUnidentifiedBody = async (details: BodyDetailsData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const result = await postUnidentifiedBody(details);
      console.log('Submission successful:', result);
      return true;
    } catch (err) {
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
  return { submitUnidentifiedBody, isSubmitting, error };
};