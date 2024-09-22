"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup.js';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import Layout from '@/app/Layout';
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
    router.push('/missing-persons/last-seen-details');
  };
  return (
    <Layout>
      <ProgressBar currentPage={2}/>

      <div className="flex justify-center items-center bg-gray-100 p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-16 rounded-lg shadow-md w-[950px] h-[870px] border-2 border-red-800">
          <h2 className="text-4xl text-center font-bold mb-8 text-[#662113]">Physical Details</h2>
          <div className="mb-10 flex items-center">
            <label htmlFor="height" className="w-40 text-[24px] font-semibold text-black-700">Height:</label>
            <input
              {...register('height', { valueAsNumber: true })}
              type="number"
              placeholder='Enter height'
              className={`block w-[660px] h-[70px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.height ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          <div className="mb-10 flex items-center">
            <label htmlFor="weight" className="w-40 text-[24px] font-semibold text-black-700">Weight:</label>
            <input
              {...register('weight', {valueAsNumber: true})}
              type="number"
              placeholder='Enter weight'
              className={`block w-[660px] h-[70px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.weight ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          <div className="mb-10 flex items-center">
            <label htmlFor="hair_color" className="w-40 text-[24px] font-semibold text-black-700">Hair Color:</label>
            <input
              {...register('hair_color')}
              placeholder='Enter hair color'
              className={`block w-[660px] h-[70px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.hair_color ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          <div className="mb-10 flex items-center">
            <label htmlFor="eye_color" className="w-40 text-[24px] font-semibold text-black-700">Eye Color:</label>
            <select
              {...register('eye_color')}
              className={`block w-[660px] h-[70px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.eye_color ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select eye color</option>
              <option value="black">Black</option>
              <option value="brown">Brown</option>
            </select>
          </div>
          <div className="mb-10 flex items-center">
            <label htmlFor="skin_color" className="w-40 text-[24px] font-semibold text-black-700">Skin Color:</label>
            <select
              {...register('skin_color')}
          
              className={`block w-[660px] h-[70px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.skin_color ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select skin color</option>
              <option value="light_skinned">light_skinned</option>
              <option value="dark_skinned">dark_skinned</option>
            </select>
          </div>
          <div className="mb-10 flex items-center">
  <label htmlFor="image" className="w-40 text-[24px] font-semibold text-black-700">Image:</label>
  <input
    type="file" 
    accept="image/*" 
    {...register('image')}
    className={`block w-[660px] h-[70px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg ${errors.image ? 'border-red-500' : 'border-gray-300'}`}
  />
</div>

          <div className="flex justify-between">
            <button type="button" onClick={() => router.push('/missing-persons/personal-details')} className="bg-[#D4B337] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-yellow-600">Previous</button>
            <button type="submit" className="bg-[#662113] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-red-900">Next</button>
          </div>
        </form>
      </div>
    </Layout>
  );
};
export default AddNewBodyForm;