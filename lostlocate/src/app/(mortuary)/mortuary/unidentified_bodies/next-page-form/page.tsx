"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import * as yup from 'yup';
import { useCreateUnidentifiedBody } from '@/app/hooks/useCreateUnidentifiedBody';
import Layout from '../../components/Layout';
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
          setSuccessMessage(null);
          router.push('/mortuary/unidentified-bodies-data'); 
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
      <div className="flex justify-center items-center bg-gray-100 p-4 mt-10">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white ml-0 sm:ml-[330px] p-8 sm:p-16 rounded-lg shadow-md w-full sm:w-[930px] h-auto sm:h-[820px] border-2 border-red-800">
          <h2 className="text-2xl sm:text-4xl text-center font-bold mb-6 sm:mb-10 text-[#662113]">Add New Body Details</h2>

          {/* Form fields here */}
          <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center">
            <label htmlFor="hair_color" className="w-full sm:w-40 text-[16px] sm:text-[20px] font-extrabold text-black-700 mb-2 sm:mb-0">Hair Color:</label>
            <input 
              {...register('hair_color')} 
              placeholder='Enter hair color'
              className={`block w-full sm:w-[615px] ml-8 h-[50px] sm:h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-sm sm:text-lg ${errors.hair_color ? 'border-red-500' : 'border-gray-300'}`} 
            />
          </div>

          <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center">
            <label htmlFor="skin_color" className="w-full sm:w-40 text-[16px] sm:text-[20px] font-extrabold text-black-700 mb-2 sm:mb-0">Skin Color:</label>
            <select 
              {...register('skin_color')} 
              className={`block w-full sm:w-[615px] ml-8 h-[50px] sm:h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-sm sm:text-lg ${errors.skin_color ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select skin color</option>
              <option value="light_skinned">light_skinned</option>
              <option value="dark_skinned">dark_skinned</option>
            </select>
          </div>

          <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center">
            <label htmlFor="height" className="w-full sm:w-40 text-[16px] sm:text-[20px] font-extrabold text-black-700 mb-2 sm:mb-0">Height (m):</label>
            <input 
              {...register('height')} 
              type="number" 
              placeholder='Enter height'
              className={`block w-full sm:w-[615px] ml-8 h-[50px] sm:h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-sm sm:text-lg ${errors.height ? 'border-red-500' : 'border-gray-300'}`} 
            />
          </div>

          <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center">
            <label htmlFor="weight" className="w-full sm:w-40 text-[16px] sm:text-[20px] font-extrabold text-black-700 mb-2 sm:mb-0">Weight (kg):</label>
            <input 
              {...register('weight')} 
              type="number" 
              placeholder='Enter weight'
              className={`block w-full sm:w-[615px] ml-8 h-[50px] sm:h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-sm sm:text-lg ${errors.weight ? 'border-red-500' : 'border-gray-300'}`} 
            />
          </div>

          <div className="mb-6 sm:mb-10 flex flex-col sm:flex-row items-start sm:items-center">
            <label htmlFor="body_marks" className="w-full sm:w-40 text-[16px] sm:text-[20px] font-extrabold text-black-700 mb-2 sm:mb-0">Body Marks:</label>
            <input 
              {...register('body_marks')} 
              placeholder='Enter body marks'
              className="block w-full sm:w-[615px] ml-8 h-[50px] sm:h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-sm sm:text-lg" 
            />
          </div>

          <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center">
            <label htmlFor="clothes_worn" className="w-full sm:w-40 text-[16px] sm:text-[20px] font-extrabold text-black-700 mb-2 sm:mb-0">Clothes Worn:</label>
            <input 
              {...register('clothes_worn')} 
              placeholder='Enter clothes worn'
              className="block w-full sm:w-[615px] ml-8 h-[50px] sm:h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-sm sm:text-lg" 
            />
          </div>

          {submitError && <p className="text-red-600">{submitError}</p>}
          
          <div className="flex justify-between mt-6 sm:mt-8">
            <button type="button" onClick={() => router.push('/mortuary/unidentified_bodies/first-page-form')} className="bg-[#D4B337] text-white px-4 sm:px-6 py-3 rounded-md text-sm sm:text-lg font-semibold hover:bg-yellow-600">Previous</button>
            <button 
              type="submit" 
              className="bg-[#662113] text-white px-4 sm:px-6 py-3 rounded-md text-sm sm:text-lg font-semibold hover:bg-red-900" 
              disabled={isSubmitting} 
            >
              {isSubmitting ? 'Submitting...' : 'Submit'} 
            </button>
          </div>
        </form>
      </div>

      {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center">
            <h3 className="text-green-600 font-bold mb-4">{successMessage}</h3>
            <button
              onClick={() => setSuccessMessage(null)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AddNewBodyDetailsForm;
