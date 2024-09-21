import React from 'react';
import { MissingPerson } from '@/app/utils/types';

const imageUrl = process.env.NEXT_PUBLIC_MEDIA_URL;
const PersonCard: React.FC<MissingPerson> = ({ first_name, last_name, age,gender,location,image,clothes_worn }) => (
  <div className="bg-white w-[130%] p-4 md:p-6 lg:p-8 rounded-lg border border-[#662113] shadow-md flex flex-col md:flex-row">
  <img
    src={`${imageUrl}${image}`}
    alt="image"
    width={100}
    height={100}
    className="rounded-full"
    />
    <div>
      <div className="text-sm md:text-base lg:text-lg">
        <span className="font-bold text-[#662113]">Firstname:</span> {first_name}
      </div>
      <div className="text-sm md:text-base lg:text-lg">
        <span className="font-bold text-[#662113]">Lastname:</span> {last_name}
      </div>
      <div className="text-sm md:text-base lg:text-lg">
        <span className="font-bold text-[#662113]">Age:</span> {age}
      </div>
      <div className="text-sm md:text-base lg:text-lg">
        <span className="font-bold text-[#662113]">Gender:</span> {gender}
      </div>
      <div className="text-sm md:text-base lg:text-lg">
        <span className="font-bold text-[#662113]">Location:</span> {location}
      </div>
      <div className="text-sm md:text-base lg:text-lg">
        <span className="font-bold text-[#662113]">Clothes worn:</span> {clothes_worn}
      </div>
    </div>
  </div>
);

export default PersonCard;
