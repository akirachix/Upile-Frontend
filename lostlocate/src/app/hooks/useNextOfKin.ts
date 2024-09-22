import { MissingPersonData, nextofkin } from '../utils/types';
import { useState } from 'react';
import { postNextOfKin } from '../utils/postNextOfKin'


export const useCreateMissingPerson = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const submitMissingPerson = async (details: MissingPersonData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await postNextOfKin(details);
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
  return { submitMissingPerson, isSubmitting, error };
};