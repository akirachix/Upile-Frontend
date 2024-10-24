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
  missing_person_id: yup.number().required(),
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  address: yup.string().required(),
  relationship: yup.string().required(),
  contact: yup.string().required(),
  alternative_contact: yup.string().required(),
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
      const success = await submitNextOfKin(data); 

      if (success) {
        setSuccessMessage('Next of Kin details submitted successfully!');
        setTimeout(() => {
          router.push('police/missingInterface');
        }, 2000);
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  return (
    <Layout>
      <ProgressBar currentPage={3} />
      <div className="flex justify-center items-center bg-gray-100 p-4">
        <form 
          onSubmit={handleSubmit(onSubmit)} 
          className="bg-white ml-[330px] p-8 rounded-lg shadow-lg w-full max-w-[800px] border-2 border-red-800"
        >
          <h2 className="text-3xl text-center font-bold mb-8 text-[#662113]">Next of Kin Details</h2>

          <div className="mb-6 flex items-center">
            <label htmlFor="missing_person_id" className="w-1/3 text-lg font-semibold">Missing Person ID:</label>
            <input
              {...register('missing_person_id')}
              type="number"
              placeholder="Enter Missing Person ID"
              className={`block w-2/3 h-12 px-4 rounded-md bg-[#EEE0AF] border-2 ${errors.missing_person_id ? 'border-red-500' : 'border-[#D4B337]'}`}
            />
            {errors.missing_person_id && <p className="text-red-600"></p>}
          </div>

          <div className="mb-6 flex items-center">
            <label htmlFor="first_name" className="w-1/3 text-lg font-semibold">First Name:</label>
            <input
              {...register('first_name')}
              type="text"
              placeholder="Enter First Name"
              className={`block w-2/3 h-12 px-4 rounded-md bg-[#EEE0AF] border-2 ${errors.first_name ? 'border-red-500' : 'border-[#D4B337]'}`}
            />
            {errors.first_name && <p className="text-red-600"></p>}
          </div>

          <div className="mb-6 flex items-center">
            <label htmlFor="last_name" className="w-1/3 text-lg font-semibold">Last Name:</label>
            <input
              {...register('last_name')}
              type="text"
              placeholder="Enter Last Name"
              className={`block w-2/3 h-12 px-4 rounded-md bg-[#EEE0AF] border-2 ${errors.last_name ? 'border-red-500' : 'border-[#D4B337]'}`}
            />
            {errors.last_name && <p className="text-red-600"></p>}
          </div>

          <div className="mb-6 flex items-center">
            <label htmlFor="address" className="w-1/3 text-lg font-semibold">Address:</label>
            <input
              {...register('address')}
              type="text"
              placeholder="Enter Address"
              className={`block w-2/3 h-12 px-4 rounded-md bg-[#EEE0AF] border-2 ${errors.address ? 'border-red-500' : 'border-[#D4B337]'}`}
            />
            {errors.address && <p className="text-red-600"></p>}
          </div>

          <div className="mb-6 flex items-center">
            <label htmlFor="relationship" className="w-1/3 text-lg font-semibold">Relationship:</label>
            <input
              {...register('relationship')}
              type="text"
              placeholder="Enter Relationship"
              className={`block w-2/3 h-12 px-4 rounded-md bg-[#EEE0AF] border-2 ${errors.relationship ? 'border-red-500' : 'border-[#D4B337]'}`}
            />
            {errors.relationship && <p className="text-red-600"></p>}
          </div>

          <div className="mb-6 flex items-center">
            <label htmlFor="contact" className="w-1/3 text-lg font-semibold">Contact:</label>
            <input
              {...register('contact')}
              type="text"
              placeholder="Enter Contact Number"
              className={`block w-2/3 h-12 px-4 rounded-md bg-[#EEE0AF] border-2 ${errors.contact ? 'border-red-500' : 'border-[#D4B337]'}`}
            />
            {errors.contact && <p className="text-red-600"></p>}
          </div>

          <div className="mb-6 flex items-center">
            <label htmlFor="alternative_contact" className="w-1/3 text-lg font-semibold">Alternative Contact:</label>
            <input
              {...register('alternative_contact')}
              type="text"
              placeholder="Enter Alternative Contact"
              className={`block w-2/3 h-12 px-4 rounded-md bg-[#EEE0AF] border-2 ${errors.alternative_contact ? 'border-red-500' : 'border-[#D4B337]'}`}
            />
            {errors.alternative_contact && <p className="text-red-600"></p>}
          </div>

          {submitError && <p className="text-red-600">{submitError}</p>}
          {successMessage && <p className="text-green-600">{successMessage}</p>}

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-[#D4B337] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-yellow-600"
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

