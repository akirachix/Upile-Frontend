"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import Layout from '../../../Layout';
import { BodyDetailsData } from '@/app/utils/types';

const schema = yup.object().shape({
  staff_id: yup.number().required('Staff ID is required'), 
  name: yup.string().required('Name is required'),
  gender: yup.string().required('Gender is required'),
  location: yup.string().required('Location is required'),
  reporting_date: yup.date().max(new Date()).required('Reporting date is required'), 
});

const AddNewBodyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<BodyDetailsData>({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = (data: BodyDetailsData) => {
    
    localStorage.setItem('formData', JSON.stringify(data));
    
    router.push('/unidentified_bodies/next-page-form'); 
  };

  const today = new Date().toISOString().split('T')[0]; 

  return (
    <Layout>
      <div className="flex justify-center items-center ml-[350px] mt-8 bg-gray-100 p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-16 rounded-lg shadow-md w-[920px] h-[750px] border-2 border-red-800">
          <h2 className="text-4xl text-center font-bold mb-12 text-[#662113]">Add New Body</h2>

          <div className="mb-10 flex items-center">
            <label htmlFor="staff_id" className="w-40 text-[24px] font-semibold text-black-700">Staff ID:</label>
            <input
              {...register('staff_id', { valueAsNumber: true })} 
              type="number"
              className={`block w-[615px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.staff_id ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>

          <div className="mb-10 flex items-center">
            <label htmlFor="name" className="w-40 text-[24px] font-semibold text-black-700">Name:</label>
            <input
              {...register('name')}
              className={`block w-[615px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>

          <div className="mb-10 flex items-center">
            <label htmlFor="gender" className="w-40 text-[24px] font-semibold text-black-700">Gender:</label>
            <select
              {...register('gender')}
              className={`block w-[615px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>

          <div className="mb-10 flex items-center">
            <label htmlFor="location" className="w-40 text-[24px] font-semibold text-black-700">Location:</label>
            <input
              {...register('location')}
              className={`block w-[615px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>

          <div className="mb-10 flex items-center">
            <label htmlFor="reporting_date" className="w-40 text-[24px] font-semibold text-black-700">Reporting Date:</label>
            <input
              {...register('reporting_date')}
              type="date"
              max={today} 
              className={`block w-[615px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.reporting_date ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          <div className="flex justify-end">
          <button type="submit" className="bg-[#662113] text-white px-6 mr-3 py-3 rounded-md text-lg font-semibold hover:bg-red-900">
          Next
          </button>
        </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddNewBodyForm;
