"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import { FirstPageForm } from '@/app/utils/types';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  gender: yup.string().required('Gender is required'),
  location: yup.string().required('Location is required'),
  reporting_date: yup.date().max(new Date()).required('Reporting date is required'), 
});

const AddNewBodyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = (data: FirstPageForm) => {
    localStorage.setItem('formData', JSON.stringify(data));
    router.push('/mortuary/unidentified_bodies/next-page-form'); 
  };

  const today = new Date().toISOString().split('T')[0]; 

  const locations = [
    'Embakasi North', 'Embakasi South', 'Embakasi Central', 'Embakasi East', 'Embakasi West',
    'Makadara', 'Kamukunji', 'Starehe', 'Mathare', 'Westlands',
    'Dagoretti North', 'Dagoretti South', 'Langata', 'Kibra', 'Ruaraka', 'Roysambu', 'Kasarani'
  ];

  return (
    <Layout>
      <div className="flex justify-center items-center mt-12 lg:ml-[300px] 2xl:ml-[300px] 2xl:mt-14 bg-gray-100 p-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-4 md:p-8 lg:p-16 rounded-lg shadow-md w-full max-w-[920px] h-auto border-2 border-red-800"
        >
          <h2 className="text-2xl md:text-4xl text-center font-bold mb-8 md:mb-12 text-[#662113]">Add New Body</h2>

          <div className="mb-8 flex flex-col md:flex-row items-center">
            <label htmlFor="name" className="w-full md:w-40 text-lg md:text-[24px] font-semibold text-black-700">Name:</label>
            <input
              {...register('name')}
              placeholder='Enter name'
              className={`block w-full h-[60px] ml-8 mt-2 md:mt-0 px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>

          <div className="mb-8 flex flex-col md:flex-row items-center">
            <label htmlFor="gender" className="w-full md:w-40 text-lg md:text-[24px] font-semibold text-black-700">Gender:</label>
            <select
              {...register('gender')}
              className={`block w-full h-[60px] ml-8 mt-2 md:mt-0 px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
            </select>
          </div>

          <div className="mb-8 flex flex-col md:flex-row items-center">
            <label htmlFor="location" className="w-full md:w-40 text-lg md:text-[24px] font-semibold text-black-700">Location:</label>
            <select
              {...register('location')}
              className={`block w-full h-[60px] ml-8 mt-2 md:mt-0 px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.location ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div className="mb-8 flex flex-col md:flex-row items-center">
            <label htmlFor="reporting_date" className="w-full md:w-40 text-lg md:text-[24px] font-semibold text-black-700">Reporting Date:</label>
            <input
              {...register('reporting_date')}
              type="date"
              placeholder='Enter reporting date'
              max={today} 
              className={`block w-full h-[60px] ml-8 mt-2 md:mt-0 px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.reporting_date ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>

          <div className="flex justify-end">
            <button type="submit" className="bg-[#662113] text-white px-6  py-3 rounded-md text-lg font-semibold hover:bg-red-900">
              Next
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddNewBodyForm;
