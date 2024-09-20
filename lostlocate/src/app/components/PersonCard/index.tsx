import React from 'react';
import { MissingPerson } from '@/app/utils/types';

const PersonCard: React.FC<MissingPerson> = ({ first_name, last_name, age }) => (
  <div className="bg-white p-4 md:p-6 lg:p-8 rounded-lg border border-[#662113] shadow-md flex flex-col md:flex-row">
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
    </div>
  </div>
);

export default PersonCard;
