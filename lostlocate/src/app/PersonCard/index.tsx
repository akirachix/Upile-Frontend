import React, { useState } from 'react';
import { MissingPerson } from '@/app/utils/types';
import { FaPerson } from 'react-icons/fa6';
import Image from 'next/image';

const imageUrl = process.env.NEXT_PUBLIC_MEDIA_URL;

const PersonCard: React.FC<MissingPerson> = ({
  first_name,
  last_name,
  age,
  gender,
  location,
  image,
  clothes_worn,
  missing_date,
  status,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white w-[100%] gap-4 p-2 md:p-8 lg:p-6 rounded-lg border border-[#662113] shadow-md flex flex-col md:flex-row">
      {!imageError && image ? (
        <Image
          src={`${imageUrl}${image}`}
          alt="person"
          width={350}
          height={100}
          className="w-[200px] h-[250px] object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <FaPerson size={200} className="text-gray-500" /> 
      )}

      <div>
        <div className="text-sm md:text-base lg:text-[16px]">
          <span className="font-bold text-[#662113]">Firstname:</span> {first_name}
        </div>
        <div className="text-sm md:text-base lg:text-[16px]">
          <span className="font-bold text-[#662113]">Lastname:</span> {last_name}
        </div>
        <div className="text-sm md:text-base lg:text-[16px]">
          <span className="font-bold text-[#662113]">Age:</span> {age}
        </div>
        <div className="text-sm md:text-base lg:text-[16px]">
          <span className="font-bold text-[#662113]">Gender:</span> {gender}
        </div>
        <div className="text-sm md:text-base lg:text-[16px]">
          <span className="font-bold text-[#662113]">Location:</span> {location}
        </div>
        <div className="text-sm md:text-base lg:text-[16px]">
          <span className="font-bold text-[#662113]">Clothes worn:</span> {clothes_worn}
        </div>
        <div className="text-sm md:text-base lg:text-[16px]">
          <span className="font-bold text-[#662113]">Missing Date:</span> {missing_date}
        </div>
        <div className="text-sm md:text-base lg:text-[16px] mt-2">
          <span className="font-bold text-[#662113]">Status:</span>{status}
          {/* <span
            className={`ml-2 font-bold ${status === 'Missing' ? 'text-red-500' : status === 'Found' ? 'text-green-500' : 'text-gray-500'}`}
          >
            {status}
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
