"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCreateMissingPerson } from '@/app/hooks/useCreateMissingPerson';
import Layout from '../../Layout';
import { LastSeenDetails } from '@/app/utils/types';
import ProgressBar from '@/app/components/Progressive bar';

const schema = yup.object().shape({
  missing_date: yup.string().required(),
  location: yup.string().required(),
  clothes_worn: yup.string().required(),
});

const AddLastSeenDetailsForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { submitMissingPerson, isSubmitting } = useCreateMissingPerson();

  const onSubmit = async (data: LastSeenDetails) => {
    setSubmitError(null);
    setSuccessMessage(null);

    const firstData = JSON.parse(localStorage.getItem('formData') || '{}');
    const secondFormData = JSON.parse(localStorage.getItem('secondFormData') || '{}');
    const combinedData = { ...firstData, ...secondFormData, ...data };

    try {
      const success = await submitMissingPerson(combinedData);
      if (success) {
        setSuccessMessage('Missing person details submitted successfully!');
              }
    } catch (error: unknown) {
      console.error('Submission error:', error);
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError("An unknown error occurred");
      }
    }
  };

  return (
    <Layout>
      <ProgressBar currentPage={3} />
      <div className="flex justify-center items-center bg-gray-100 p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-16 rounded-lg shadow-md w-[990px] h-[550px] border-2 border-red-800">
          <h2 className="text-4xl text-center font-bold mb-10 text-[#662113]">Last Seen Details</h2>
          <div className="mb-10 flex items-center">
            <label htmlFor="missing_date" className="w-40 text-[20px] font-extrabold text-black-700">Missing Date:</label>
            <input
              {...register('missing_date')}
              type='date'
              placeholder='Enter missing date'
              className={`block w-[615px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.missing_date ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          <div className="mb-10 flex items-center">
            <label htmlFor="location" className="w-40 text-[20px] font-extrabold text-black-700">Location:</label>
            <input
              {...register('location')}
              placeholder='Enter location'
              className={`block w-[615px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          <div className="mb-10 flex items-center">
            <label htmlFor="clothes_worn" className="w-40 text-[20px] font-extrabold text-black-700">Clothes Worn:</label>
            <input
              {...register('clothes_worn')}
              placeholder='Enter clothes worn'
              className={`block w-[615px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.clothes_worn ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          {submitError && <p className="text-red-600">{submitError}</p>}
          {successMessage && <p className="text-green-600">{successMessage}</p>}
          <div className="flex justify-between">
            <button type="button" onClick={() => router.push('/missing-persons/physical-description')} className="bg-[#D4B337] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-yellow-600">Previous</button>
            
            <button
              type="submit"
              className="bg-[#662113] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-red-900"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddLastSeenDetailsForm;
