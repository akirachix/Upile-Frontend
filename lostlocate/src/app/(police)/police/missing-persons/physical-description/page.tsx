"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import { PhysicalDescription } from '@/app/utils/types';
import ProgressBar from '@/app/components/Progressive bar';

const schema = yup.object().shape({
  height: yup.number().required().positive().integer(),
  weight: yup.number().required().positive().integer(),
  hair_color: yup.string().required(),
  eye_color: yup.string().required(),
  skin_color: yup.string().required(),
  image: yup.string().required(),
});

const AddNewBodyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = (data: PhysicalDescription) => {
    localStorage.setItem('physical-description', JSON.stringify(data));
    router.push('/police/missing-persons/last-seen-details');
  };

  return (
    <Layout>
      <ProgressBar currentPage={2} />
      <div className="flex justify-center items-center bg-gray-100 p-4">
        <form onSubmit={handleSubmit(onSubmit)} 
          className="bg-white p-16 rounded-lg ml-[480px] shadow-md w-[95%] max-w-[950px] h-[auto] border-2 border-red-800 mx-auto"
        >
          <h2 className="text-4xl text-center font-bold mb-6 text-[#662113]">Physical Details</h2>

          <div className="mb-8 flex flex-col md:flex-row items-center">
            <label htmlFor="height" className="w-full md:w-40 text-[24px] font-semibold text-black-700 mb-2 md:mb-0">Height(m):</label>
            <input
              {...register('height', { valueAsNumber: true })}
              type="number"
              placeholder="Enter height"
              className={`block w-full md:w-[660px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.height ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>

          <div className="mb-8 flex flex-col md:flex-row items-center">
            <label htmlFor="weight" className="w-full md:w-40 text-[24px] font-semibold text-black-700 mb-2 md:mb-0">Weight(kg):</label>
            <input
              {...register('weight', { valueAsNumber: true })}
              type="number"
              placeholder="Enter weight"
              className={`block w-full md:w-[660px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.weight ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>

          <div className="mb-8 flex flex-col md:flex-row items-center">
            <label htmlFor="hair_color" className="w-full md:w-40 text-[24px] font-semibold text-black-700 mb-2 md:mb-0">Hair Color:</label>
            <input
              {...register('hair_color')}
              placeholder="Enter hair color"
              className={`block w-full md:w-[660px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.hair_color ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>

          <div className="mb-8 flex flex-col md:flex-row items-center">
            <label htmlFor="eye_color" className="w-full md:w-40 text-[24px] font-semibold text-black-700 mb-2 md:mb-0">Eye Color:</label>
            <select
              {...register('eye_color')}
              className={`block w-full md:w-[660px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.eye_color ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select eye color</option>
              <option value="black">Black</option>
              <option value="brown">Brown</option>
            </select>
          </div>

          <div className="mb-8 flex flex-col md:flex-row items-center">
            <label htmlFor="skin_color" className="w-full md:w-40 text-[24px] font-semibold text-black-700 mb-2 md:mb-0">Skin Color:</label>
            <select
              {...register('skin_color')}
              className={`block w-full md:w-[660px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.skin_color ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select skin color</option>
              <option value="light_skinned">Light Skinned</option>
              <option value="dark_skinned">Dark Skinned</option>
            </select>
          </div>

          <div className="mb-6 flex flex-col md:flex-row items-center">
            <label htmlFor="image" className="w-full md:w-40 text-[24px] font-semibold text-black-700 mb-2 md:mb-0">Image:</label>
            <input
              type="file"
              accept="image/*"
              {...register('image')}
              className={`block w-full md:w-[660px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>

          <div className="flex justify-between">
            <button type="button" onClick={() => router.push('/police/missing-persons/personal-details')} className="bg-[#D4B337] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-yellow-600">Previous</button>
            <button type="submit" className="bg-[#662113] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-red-900">Next</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddNewBodyForm;
