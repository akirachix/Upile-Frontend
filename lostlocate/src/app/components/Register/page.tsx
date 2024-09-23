'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRouter } from 'next/navigation';
import { userRegister } from '@/app/utils/userRegister';
import Image from 'next/image';
interface FormData {
  first_name: string;
  last_name: string;
  role: string;
  phone_number: string;
  email: string;
  username: string;
}
interface UserData {
  first_name: string;
  last_name: string;
  role: string;
  phone_number: string;
  email: string;
  username: string;
}
const schema = yup.object().shape({
  first_name: yup.string().required('First Name is required'),
  last_name: yup.string().required('Last Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  phone_number: yup.string().required('Phone number is required'),
  role: yup.string().required('Role is required').notOneOf(['Role'], 'Please select a valid role'),
  username: yup.string().required('Username is required'),
});
const RegisterForm = () => {
  const router = useRouter();
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: FormData) => {
    try {
      const formattedData: UserData = {
        first_name: data.first_name,
        last_name: data.last_name,
        role: data.role,
        phone_number: data.phone_number,
        email: data.email,
        username: data.username,
      };
      const response = await userRegister(formattedData);
      if (response.error) {
        setApiError(response.error);
      } else {
        setSuccessMessage('Registration successful! Redirecting...');
        setTimeout(() => {
          router.push('/admin');
        }, 1500);
        reset();
      }
    } catch (error) {
      if (error instanceof Error) {
        setApiError(error.message);
      } else {
        setApiError('An unexpected error occurred.');
      }
    }
  };
  return (
    <div className="flex flex-col md:flex-row h-screen bg-white">
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">

        <Image src='/media/lostlocate.png' alt="Logo" width={530} height={249} />

      </div>
      <div className="w-full md:w-1/2 bg-[rgba(212,179,55,0.4)] flex items-start justify-center p-8">
        <div className="max-w-md w-full mt-[-50px]">
          <h2 className="text-[48px] font-bold mb-6 text-[#8B4513] text-center mt-10">Register</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="">
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-[30px] font-semibold text-black capitalize mb-2">
                First Name:
              </label>
              <input
                type="text"
                id="firstName"
                {...register('first_name')}
                placeholder="Jimin"
                className={`mt-1 block w-full h-[55px] px-3 py-2 bg-white border ${errors.first_name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-brown-500 focus:border-brown-500`}
              />
              {errors.first_name && <p className="text-red-500 text-xs mt-1">{errors.first_name.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-[30px] font-semibold text-black capitalize mb-2">
                Last Name:
              </label>
              <input
                type="text"
                id="lastName"
                {...register('last_name')}
                placeholder="Mutava"
                className={`mt-1 block w-full h-[55px] px-3 py-2 bg-white border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-brown-500 focus:border-brown-500`}
              />
              {errors.last_name && <p className="text-red-500 text-xs mt-1">{errors.last_name.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="role" className="block text-[30px] font-semibold text-black capitalize mb-2">Role:</label>
              <select
                id="role"
                {...register('role')}
                className={`mt-1 block w-full h-[55px] px-3 py-2 bg-white border ${errors.role ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-brown-500 focus:border-brown-500`}
              >
                <option value="Role">Select a role</option>
                <option value="Police">Police</option>
                <option value="Mortuary Attendants">Mortuary Attendants</option>
              </select>
              {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-[30px] font-semibold text-black capitalize mb-2">
                Phone Number:
              </label>
              <input
                type="tel"
                id="phone"
                {...register('phone_number')}
                placeholder="+254"
                className={`mt-1 block w-full h-[55px] px-3 py-2 bg-white border ${errors.phone_number ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-brown-500 focus:border-brown-500`}
              />
              {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-[30px] font-semibold text-black capitalize mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                placeholder="jmin@gmail.com"
                className={`mt-1 block w-full h-[55px] px-3 py-2 bg-white border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-brown-500 focus:border-brown-500`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="username" className="block text-[30px] font-semibold text-black capitalize mb-2">
                Username:
              </label>
              <input
                type="text"
                id="username"
                {...register('username')}
                placeholder="jimin123"
                className={`mt-1 block w-full h-[55px] px-3 py-2 bg-white border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-brown-500 focus:border-brown-500`}
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
            </div>
            {apiError && <p className="text-red-500 text-xs mt-1">{apiError}</p>}
            {successMessage && <p className="text-green-500 text-xs mt-1">{successMessage}</p>}
            <div className="flex justify-center">
              <button
                type="submit"
                className={`bg-[#8B4513] text-[#D4B337] rounded-md hover:bg-[#A0522D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8B4513] w-[125px] h-[40px] text-[20px]`}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default RegisterForm;