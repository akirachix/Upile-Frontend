"use client"; 

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Layout from '@/app/Layout';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  address: yup.string().required('Address is required'),
  relationship: yup.string().required('Relationship is required'),
  contact: yup.string()
    .required('Contact number is required')
    .matches(/^[+0-9]*$/, "Contact must be a valid phone number"),
  alternativeContact: yup.string()
    .matches(/^[+0-9]*$/, "Alternative contact must be a valid phone number"),
});

const NextOfKinForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    console.log('Form submitted:');
  };
  

  return (
    <Layout>
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="bg-white p-8 rounded-lg shadow-md w-[1200px] h-auto border-2 border-red-800" // Increased width
      >
        <h2 className="text-4xl text-center font-bold mb-8 text-[#662113]">Next of Kin Information</h2>

        <div className="mb-6 flex items-center"> 
          <label htmlFor="firstName" className="w-40 text-[24px] font-extrabold text-black-700">First Name:</label>
          <input
            type="text"
            id="firstName"
            {...register('firstName')}
            className={`block w-[900px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg focus:outline-none mt-4`} // Adjusted margin-top for more space
            placeholder="Joe"
            required
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
        </div>

        <div className="mb-6 flex items-center"> 
          <label htmlFor="lastName" className="w-40 text-[24px] font-extrabold text-black-700">Last Name:</label>
          <input
            type="text"
            id="lastName"
            {...register('lastName')}
            className={`block w-[900px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg focus:outline-none mt-4`} 
            placeholder="Doe"
            required
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
        </div>

        <div className="mb-6 flex items-center"> 
          <label htmlFor="address" className="w-40 text-[24px] font-extrabold text-black-700">Address:</label>
          <input
            type="text"
            id="address"
            {...register('address')}
            className={`block w-[900px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg focus:outline-none mt-4`} 
            placeholder="123 Main St, City"
            required
          />
          {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
        </div>

        <div className="mb-6 flex items-center"> 
          <label htmlFor="relationship" className="w-40 text-[24px] font-extrabold text-black-700">Relationship:</label>
          <input
            type="text"
            id="relationship"
            {...register('relationship')}
            className={`block w-[900px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg focus:outline-none mt-4`} // Adjusted margin-top for more space
            placeholder="Brother/Sister/Friend"
            required
          />
          {errors.relationship && <p className="mt-1 text-sm text-red-600">{errors.relationship.message}</p>}
        </div>

        <div className="mb-6 flex items-center">
          <label htmlFor="contact" className="w-40 text-[24px] font-extrabold text-black-700">Contact:</label>
          <input
            type="tel"
            id="contact"
            {...register('contact')}
            className={`block w-[900px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg focus:outline-none mt-4`} 
            placeholder="+254712345678" 
            required
          />
          {errors.contact && <p className="mt-1 text-sm text-red-600">{errors.contact.message}</p>}
        </div>

        <div className="mb-6 flex items-center"> 
          <label htmlFor="alternativeContact" className="w-40 text-[24px] font-extrabold text-black-700">Alternative Contact:</label>
          <input
            type="tel"
            id="alternativeContact"
            {...register('alternativeContact')}
            className={`block w-[900px] h-[60px] px-4 py-3 rounded-md bg-[#EEE0AF] border-[#D4B337] shadow-sm text-lg focus:outline-none mt-4`} 
            placeholder="+254712345679" 
          />
          {errors.alternativeContact && <p className="mt-1 text-sm text-red-600">{errors.alternativeContact.message}</p>}
        </div>

        <div className="flex justify-end">
          <button 
            type="submit" 
            className="bg-[#662113] text-[#D4B337] px-6 py-3 rounded-md text-lg font-semibold hover:bg-red-900"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    </Layout>
  );
};

export default NextOfKinForm;
