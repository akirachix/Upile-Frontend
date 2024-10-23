'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import useLogin from '@/app/hooks/useLogin';
import Image from 'next/image';
import { setCookie } from 'cookies-next';

const Login: React.FC = () => {
  const [generated_code, setCode] = useState<string>('');
  const [phone_number, setPhone] = useState<string>('');
  const { userLogin, isSubmitting, errorMessage, successMessage } = useLogin();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await userLogin({ generated_code, phone_number });

      if (response) {
        setCookie('generated_code', response.generated_code, { maxAge: 60 * 60 * 24 });
        setCookie('phone_number', response.phone_number, { maxAge: 60 * 60 * 24 });

        if (generated_code.startsWith('Po')) {
          router.push('/police/otpVerification');
        } else {
          router.push('/mortuary/otpVerification');
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-200">
      {/* Image Section */}
      <div className="flex-1 flex justify-center items-center bg-white">
        <Image
          src="/media/lostlocate.png"
          alt="Lost Locate Logo"
          className="w-full max-w-xs sm:max-w-md lg:max-w-2xl h-auto"
          width={500}
          height={300}
        />
      </div>

      {/* Login Form Section */}
      <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 lg:p-10 bg-yellow-100">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl text-red-800 mb-6 sm:mb-8 text-center">LOGIN</h2>

        <form onSubmit={handleSubmit} className="flex flex-col max-w-xs sm:max-w-md mx-auto w-full">
          <div className="mb-4 sm:mb-5">
            <label htmlFor="generated_code" className="block mb-2 font-bold text-gray-800 text-lg sm:text-xl lg:text-2xl">
              Enter code:
            </label>
            <input
              type="text"
              id="generated_code"
              value={generated_code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="1234"
              required
              className="w-full p-3 sm:p-4 border-2 border-yellow-700 rounded-md text-base sm:text-lg"
            />
          </div>

          <div className="mb-4 sm:mb-5">
            <label htmlFor="phone_number" className="block mb-2 font-bold text-gray-800 text-lg sm:text-xl lg:text-2xl">
              Enter Phone Number:
            </label>
            <input
              type="text"
              id="phone_number"
              value={phone_number}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0743264217"
              required
              className="w-full p-3 sm:p-4 border-2 border-yellow-700 rounded-md text-base sm:text-lg"
            />
          </div>

          {errorMessage && <p className="text-red-600 text-sm sm:text-base mt-2">{errorMessage}</p>}
          {successMessage && <p className="text-green-600 text-sm sm:text-base mt-2">{successMessage}</p>}

          <button
            type="submit"
            className={`w-full sm:w-1/2 lg:w-1/3 py-2 sm:py-3 px-4 mt-4 text-lg sm:text-xl lg:text-3xl font-bold text-yellow-700 bg-red-900 rounded-md hover:bg-red-800 transition-colors duration-300 mx-auto ${
              isSubmitting ? 'opacity-50' : ''
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
