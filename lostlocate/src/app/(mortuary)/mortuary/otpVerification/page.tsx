'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(60);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); 
  const router = useRouter();

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.nextElementSibling) {
      (element.nextElementSibling as HTMLInputElement).focus(); 
    }
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    setTimeout(() => {
      const enteredOtp = otp.join('');
      if (enteredOtp.length === 6) {
        setSuccessMessage('OTP verified successfully!'); 
        
          setTimeout(() => router.push('/mortuary'), 500); 
      } else {
        setError('Invalid OTP');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center py-28 bg-white px-16 lg:px-32 xl:px-48">
      <h1 className="text-6xl font-bold mb-10 text-gray-800">Check your phone</h1>
      <p className="text-2xl mb-12 text-gray-600">We’ve sent the code to your phone</p>
      <form onSubmit={handleVerify} className="flex flex-col items-center">
        <div className="flex justify-center gap-10 mb-12">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              name="otp"
              maxLength={1}
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              className="w-24 h-24 text-4xl text-center border-2 border-yellow-500 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          ))}
        </div>
        <p className="text-2xl mb-10 text-gray-600">Code expires in {timeLeft} seconds</p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
        <button
          type="submit"
          className="bg-[#722F37] text-white py-5 px-12 text-2xl rounded-md hover:bg-[#5A1E24] transition duration-300"
          disabled={loading}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>
    </div>
  );
};

export default OTPVerification;
