'use client'; 

import React from 'react';

interface ProgressBarProps {
  currentPage: number; 
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentPage }) => {
  const totalPages = 4;

  return (
    <div className="flex items-center justify-center w-full max-w-md  mb-1 ml-auto mr-[490px]  ">
      {[...Array(totalPages)].map((_, index) => (
        <React.Fragment key={index}>
          <div className={`w-4 h-4 rounded-full 
            ${index <= currentPage 
              ? 'bg-[#D4B337]' 
              : 'bg-gray-300'}`} 
          />
          {index < totalPages - 1 && (
            <div className={`flex-1 h-1 
              ${index < currentPage ? 'bg-[#D4B337]' : 'bg-gray-300'}`} 
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressBar;
