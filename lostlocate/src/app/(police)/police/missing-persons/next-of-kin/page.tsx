"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNextOfKin } from '@/app/hooks/useNextOfKin';
import Layout from '../../components/Layout';
import ProgressBar from '@/app/components/Progressive bar';
import { NextOfKin } from '@/app/utils/types';

const schema = yup.object().shape({
  missing_person_id: yup.number().required('Missing Person ID is required'),
  first_name: yup.string().required('First Name is required'),
  last_name: yup.string().required('Last Name is required'),
  address: yup.string().required('Address is required'),
  relationship: yup.string().required('Relationship is required'),
  contact: yup.string().required('Contact number is required'),
  alternative_contact: yup.string().required('Alternative contact is required'),
});

const NextOfKinForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  const { submitNextOfKin, isSubmitting } = useNextOfKin();

  const onSubmit = async (data: NextOfKin) => {
    setSubmitError(null);
    setSuccessMessage(null);

    try {
      console.log('Form submitted:', data); 
      const success = await submitNextOfKin(data); 

      if (success) {
        setSuccessMessage('Next of Kin details submitted successfully!');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  return (
    <Layout>
      <ProgressBar currentPage={3} />
      <div className="flex justify-center items-center bg-gray-100 p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-16 ml-[350px] rounded-lg shadow-md w-[970px] h-[985px] border-2 border-red-800">
          <h2 className="text-4xl text-center font-bold mb-10 text-[#662113]">Next of Kin Details</h2>

          <div className="mb-10 flex items-center">
            <label htmlFor="missing_person_id" className="w-40 text-[20px] font-extrabold text-black-700">Missing Person ID:</label>
            <input
              {...register('missing_person_id')}
              type='number'
              placeholder='Enter Missing Person ID'
              className={`block ml-6 w-[615px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.missing_person_id ? 'border-red-500' : 'border-gray-300'}`}
            />
            
            {errors.missing_person_id && <p className="text-red-600">{errors.missing_person_id.message}</p>}
          </div>

          <div className="mb-10 flex items-center">
            <label htmlFor="first_name" className="w-40 text-[20px] font-extrabold text-black-700">First Name:</label>
            <input
              {...register('first_name')}
              type='text'
              placeholder='Enter First Name'
              className={`block ml-6 w-[615px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.first_name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.first_name && <p className="text-red-600">{errors.first_name.message}</p>}
          </div>

          <div className="mb-10 flex items-center">
            <label htmlFor="last_name" className="w-40 text-[20px] font-extrabold text-black-700">Last Name:</label>
            <input
              {...register('last_name')}
              type='text'
              placeholder='Enter Last Name'
              className={`block ml-6 w-[615px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.last_name ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.last_name && <p className="text-red-600">{errors.last_name.message}</p>}
          </div>

          <div className="mb-10 flex items-center">
            <label htmlFor="address" className="w-40 text-[20px] font-extrabold text-black-700">Address:</label>
            <input
              {...register('address')}
              type='text'
              placeholder='Enter Address'
              className={`block ml-6 w-[615px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.address && <p className="text-red-600">{errors.address.message}</p>}
          </div>

          <div className="mb-10 flex items-center">
            <label htmlFor="relationship" className="w-40 text-[20px] font-extrabold text-black-700">Relationship:</label>
            <input
              {...register('relationship')}
              type='text'
              placeholder='Enter Relationship'
              className={`block ml-6 w-[615px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.relationship ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.relationship && <p className="text-red-600">{errors.relationship.message}</p>}
          </div>

          <div className="mb-10 flex items-center">
            <label htmlFor="contact" className="w-40 text-[20px] font-extrabold text-black-700">Contact:</label>
            <input
              {...register('contact')}
              type='text'
              placeholder='Enter Contact Number'
              className={`block ml-6 mr- w-[615px] h-[60px] px-4 py3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.contact ? 'border-red500' : 'border-gray300'}`}
            />
            {errors.contact && <p className="text-red600">{errors.contact.message}</p>}
          </div>

          <div className="mb10 flex items-center">
            <label htmlFor="alternative_contact" className="w-40 text-[20px] font-extrabold text-black700 ">Alternative Contact:</label>
            <input
              {...register('alternative_contact')}
              type='text'
              placeholder='Enter Alternative Contact'
              className={`block ml-6 w-[615px] h-[60px] px-4 py3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.alternative_contact ? 'border-red500' : 'border-gray300'}`}
            />
            {errors.alternative_contact && <p className="text-red600">{errors.alternative_contact.message}</p>}
          </div>

          {submitError && <p className="text-red600">{submitError}</p>}
          {successMessage && <p className="text-green-600">{successMessage}</p>}

          <div className="flex justify-end">
            
            <button
                type="submit"
                onClick={() => router.push('/police')}
                className="bg-[#D4B337] mt-2 mr-1 text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-yellow-600"
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

export default NextOfKinForm;
