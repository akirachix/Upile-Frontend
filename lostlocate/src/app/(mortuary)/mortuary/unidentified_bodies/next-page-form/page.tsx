"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import * as yup from 'yup';
import { useCreateUnidentifiedBody } from '@/app/hooks/useCreateUnidentifiedBody';
import Layout from '@/app/Layout';
import { NextPageForm } from '@/app/utils/types';

const schema = yup.object().shape({
  hair_color: yup.string().required('Hair Color is required'),
  skin_color: yup.string().required('Skin Color is required'),
  height: yup.number().required('Height is required').positive().integer(),
  weight: yup.number().required('Weight is required').positive().integer(),
  body_marks: yup.string().optional(),
  clothes_worn: yup.string().optional(),
});

const AddNewBodyDetailsForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });
  
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { submitUnidentifiedBody, isSubmitting } = useCreateUnidentifiedBody();

  
  const onSubmit = async (data: NextPageForm) => {
    setSubmitError(null); 
    setSuccessMessage(null); 

    const previousData = JSON.parse(localStorage.getItem('formData') || '{}');
    const combinedData = { ...previousData, ...data };

    try {
      const success = await submitUnidentifiedBody(combinedData); 
      if (success) {
        setSuccessMessage('Body details submitted successfully!'); 

        setTimeout(() => {
          router.push('mortuary/unidentified-bodies-data'); 
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

  return (
    <Layout>
      <div className="flex justify-center items-center ml-[355px] bg-gray-100 p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-16 rounded-lg shadow-md w-[930px] h-[820px] border-2 border-red-800">
          <h2 className="text-4xl text-center font-bold mb-10 text-[#662113]">Add New Body Details</h2>

          <div className="mb-10 flex items-center">
            <label htmlFor="hair_color" className="w-40 text-[20px] font-extrabold text-black-700">Hair Color:</label>
            <input 
              {...register('hair_color')} 
              className={`block w-[615px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.hair_color ? 'border-red-500' : 'border-gray-300'}`} 
            />
          </div>

          <div className="mb-10 flex items-center">
            <label htmlFor="skin_color" className="w-40 text-[20px] font-extrabold text-black-700">Skin Color:</label>
            <select 
              {...register('skin_color')} 
              className={`block w-[615px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.skin_color ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select skin color</option>
              <option value="light_skinned">light_skinned</option>
              <option value="dark_skinned">dark_skinned</option>
            </select>
          </div>

          <div className="mb-10 flex items-center">
            <label htmlFor="height" className="w-40 text-[20px] font-extrabold text-black-700">Height (cm):</label>
            <input 
              {...register('height')} 
              type="number" 
              className={`block w-[615px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.height ? 'border-red-500' : 'border-gray-300'}`} 
            />
          </div>

          <div className="mb-10 flex items-center">
            <label htmlFor="weight" className="w-40 text-[20px] font-extrabold text-black-700">Weight (kg):</label>
            <input 
              {...register('weight')} 
              type="number" 
              className={`block w-[615px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.weight ? 'border-red-500' : 'border-gray-300'}`} 
            />
          </div>

          <div className="mb-10 flex items-center">
            <label htmlFor="body_marks" className="w-40 text-[20px] font-extrabold text-black-700">Body Marks:</label>
            <input 
              {...register('body_marks')} 
              className="block w-[615px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg" 
            />
          </div>

          <div className="mb-4 flex items-center">
            <label htmlFor="clothes_worn" className="w-40 text-[20px] font-extrabold text-black-700">Clothes Worn:</label>
            <input 
              {...register('clothes_worn')} 
              className="block w-[615px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg" 
            />
          </div>

          {submitError && <p className="text-red-600">{submitError}</p>}         
          {successMessage && <p className="text-green-600">{successMessage}</p>}
          
          <div className="flex justify-between">
            <button type="button" onClick={() => router.push('/unidentified_bodies/first-page-form')} className="bg-[#D4B337] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-yellow-600">Previous</button>
            <button 
              type="submit" 
              className="bg-[#662113] text-white px-6 py-3 rounded-md mr-5 text-lg font-semibold hover:bg-red-900" 
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

export default AddNewBodyDetailsForm;
