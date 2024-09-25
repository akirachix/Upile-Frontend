'use client';
import React from 'react';
import Link from 'next/link';

interface MissingPerson {
  id: number;
  first_name: string;
  last_name: string;
  age: string;
  gender: string;
  location: string;
  clothes_worn: string;
  missing_date: string;
}

const PersonCard: React.FC<MissingPerson> = ({
  id,
  first_name,
  last_name,
  age,
  gender,
  image?: string;
  location,
  clothes_worn,
  missing_date,
}) => {

  console.log({id});
  
  return (
    <Link href={`/missing-person/${id}`} passHref>
      <div className="bg-white w-full max-w-2xl p-4 md:p-6 lg:p-8 rounded-lg border border-[#662113] shadow-md flex flex-col cursor-pointer">
      <div className="text-sm md:text-base lg:text-lg mb-2">
          <span className="font-bold text-[#662113]">Id:</span> {id}
        </div>
        <div className="text-sm md:text-base lg:text-lg mb-2">
          <span className="font-bold text-[#662113]">Name:</span> {first_name} {last_name}
        </div>
        <div className="text-sm md:text-base lg:text-lg mb-2">
          <span className="font-bold text-[#662113]">Age:</span> {age}
        </div>
        <div className="text-sm md:text-base lg:text-lg mb-2">
          <span className="font-bold text-[#662113]">Gender:</span> {gender}
        </div>
        <div className="text-sm md:text-base lg:text-lg mb-2">
          <span className="font-bold text-[#662113]">Location:</span> {location}
        </div>
        <div className="text-sm md:text-base lg:text-lg mb-2">
          <span className="font-bold text-[#662113]">Clothes worn:</span> {clothes_worn}
        </div>
        <div className="text-sm md:text-base lg:text-lg mb-2">
          <span className="font-bold text-[#662113]">Missing date:</span> {missing_date}
        </div>
      </div>
    </Link>
  );
};


export default PersonCard;

