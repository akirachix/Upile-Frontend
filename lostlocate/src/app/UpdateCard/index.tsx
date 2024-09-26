import React from 'react';

interface UpdateCardProps {
  title: string;
  count: number;
}

const UpdateCard: React.FC<UpdateCardProps> = ({ title, count }) => (
  <div className="bg-[#662113] text-[#D4B337] p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg shadow-md">
    <div className="text-[30px] md:text-4xl lg:text-[30] font-bold">{count}</div>
    <div className="text-[20px] md:text-[28px] lg:text-[24px] font-semibold text-white">{title}</div>
  </div>
);

export default UpdateCard;

