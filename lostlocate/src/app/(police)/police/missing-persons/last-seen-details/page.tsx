"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCreateMissingPerson } from '@/app/hooks/useCreateMissingPerson';
import Layout from '../../components/Layout';
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

  const locations = [
    'Embakasi North', 'Embakasi South', 'Embakasi Central', 'Embakasi East', 'Embakasi West',
    'Makadara', 'Kamukunji', 'Starehe', 'Mathare', 'Westlands',
    'Dagoretti North', 'Dagoretti South', 'Langata', 'Kibra', 'Ruaraka', 'Roysambu', 'Kasarani'
  ];

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

        setTimeout(() => {
          router.push('/police/missingInterface'); 
        }, 2000);

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

  const today = new Date().toISOString().split('T')[0]; 


  return (
    <Layout>
      <ProgressBar currentPage={3} />
      <div className="flex justify-center items-center bg-gray-100 p-4">
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="bg-white p-8 ml-[320px] mt-6 sm:p-10 md:p-12 lg:p-16 rounded-lg shadow-md w-full max-w-[90%] md:max-w-[80%] lg:max-w-[990px] border-2 border-red-800"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-center font-bold mb-6 lg:mb-10 text-[#662113]">Last Seen Details</h2>
          
          <div className="mb-4 md:mb-6 flex flex-col md:flex-row items-center">
            <label htmlFor="missing_date" className="w-full md:w-40 text-lg sm:text-xl font-extrabold text-black-700">Missing Date:</label>
            <input
              {...register('missing_date')}
              type='date'
              placeholder='Enter missing date'
              max={today} 
              className={`block w-full md:w-[615px] ml-14 h-[50px] sm:h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.missing_date ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          
          <div className="mb-4 md:mb-6 flex flex-col md:flex-row items-center">
            <label htmlFor="location" className="w-full md:w-40 text-lg sm:text-xl font-extrabold text-black-700">Location:</label>
            <select
              {...register('location')}
              className={`block w-full md:w-[615px] ml-14 h-[50px] sm:h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
          
          <div className="mb-4 md:mb-6 flex flex-col md:flex-row items-center">
            <label htmlFor="clothes_worn" className="w-full md:w-40 text-lg sm:text-xl font-extrabold text-black-700">Clothes Worn:</label>
            <input
              {...register('clothes_worn')}
              placeholder='Enter clothes worn'
              className={`block w-full md:w-[615px] ml-14 h-[50px] sm:h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.clothes_worn ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>

          {submitError && <p className="text-red-600">{submitError}</p>}
          {successMessage && <p className="text-green-600">{successMessage}</p>}

          <div className="flex justify-between mt-8">
            <button 
              type="button" 
              onClick={() => router.push('/police/missing-persons/physical-description')} 
              className="bg-[#D4B337] text-white px-4 sm:px-6 py-3 rounded-md text-lg font-semibold hover:bg-yellow-600"
            >
              Previous
            </button>
            
            <button
              type="submit"
              className="bg-[#662113] mr-[30px] text-white px-4 sm:px-6 py-3 rounded-md text-lg font-semibold hover:bg-red-900"
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
