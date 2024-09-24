"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import { PersonDetails } from '@/app/utils/types';
import ProgressBar from '@/app/components/Progressive bar';

const schema = yup.object().shape({
  officer_id: yup.number().required('Officer ID is required'),
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  age: yup.number().required('Age is required'),
  gender: yup.string().required('Location is required'),
  contact: yup.string().required('Contact date is required'),
});
const AddNewBodyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const onSubmit = (data: PersonDetails) => {
    localStorage.setItem('formData', JSON.stringify(data));
    router.push('/police/missing-persons/physical-description');

  };
  return (
    <Layout>
      <ProgressBar currentPage={1}/>
      <div className="flex justify-center items-center bg-gray-100 p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-16 rounded-lg shadow-md w-[950px] h-[935px] border-2 border-red-800 ml-[350px]">
          <h2 className="text-4xl text-center font-bold mb-8 text-[#662113]">Personal Details</h2>
          <div className="mb-10 flex items-center">
            <label htmlFor="officer_id" className="w-40 text-[24px] font-semibold text-black-700">Officer ID:</label>
            <input
              {...register('officer_id', { valueAsNumber: true })}
              type="number"
              placeholder='Enter id'
              className={`block w-[660px] h-[70px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.officer_id ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          <div className="mb-10 flex items-center">
            <label htmlFor="first_name" className="w-40 text-[24px] font-semibold text-black-700">First Name:</label>
            <input
              {...register('first_name')}
              placeholder='Enter first name'
              className={`block w-[660px] h-[70px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.first_name ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          <div className="mb-10 flex items-center">
            <label htmlFor="last_name" className="w-40 text-[24px] font-semibold text-black-700">Last Name:</label>
            <input
              {...register('last_name')}
              placeholder='Enter last name'
              className={`block w-[660px] h-[70px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.last_name ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          <div className="mb-10 flex items-center">
            <label htmlFor="age" className="w-40 text-[24px] font-semibold text-black-700">Age:</label>
            <input
              {...register('age', { valueAsNumber: true })}
              type="number"
              placeholder='Enter your age'
              className={`block w-[660px] h-[70px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          <div className="mb-10 flex items-center">
            <label htmlFor="gender" className="w-40 text-[24px] font-semibold text-black-700">Gender:</label>
            <select
              {...register('gender')}
              className={`block w-[660px] h-[70px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
          </div>
          <div className="mb-4 flex items-center">
            <label htmlFor="contact" className="w-40 text-[24px] font-semibold text-black-700">Contact:</label>
            <input
              {...register('contact')}
              placeholder='Enter contact'
              className={`block w-[660px] h-[70px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.contact ? 'border-red-500' : 'border-gray-300'}`}
            />

          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-[#662113] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-red-900 item-right">Next</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default AddNewBodyForm;