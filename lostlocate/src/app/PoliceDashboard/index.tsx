'use client';
import React from 'react';
import { useGetMissingPersons } from '../hooks/useGetMissingPersons';
import ChartComponent from '../components/Chart/policeChart';

const PoliceDashboard = () => {
  const { metrics, isLoading, error } = useGetMissingPersons();

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  
  const successfulMatches = metrics?.successfulMatches ?? 0;
  const openCases = metrics?.openCases ?? 0;
  const closedCases = metrics?.closedCases ?? 0;

  return (
    <div className="mt-12 ml-2">
      <div className="flex flex-wrap gap-16 mt-10 nesthub:mt-[8px] nesthub:ml-[18px] nesthubmax:mt-[12px] nesthub:gap-[24px] nesthubmax:ml-8 nesthubmax:gap-20 2xl:ml-14">
        <div className="bg-[#D4B337] text-white text-center text-[24px] font-bold p-6 rounded-lg shadow-md w-[400px] h-[200px]
          nesthub:w-[190px] nesthub:h-[100px] nesthub:text-[16px]
          nesthubmax:w-[230px] nesthubmax:h-[130px] nesthubmax:text-[20px] 2xl:w-[400px] 2xl:h-[200px] 2xl:text-[28px]">
          Successful Matches: {successfulMatches}
        </div>
        <div className="bg-[#662113] text-white text-center text-[24px] font-bold p-6 rounded-lg shadow-md w-[400px]
          nesthub:w-[190px] nesthub:h-[100px] nesthub:text-[16px]
          nesthubmax:w-[230px] nesthubmax:h-[130px] nesthubmax:text-[20px] 2xl:w-[400px] 2xl:h-[200px] 2xl:text-[28px]">
          Open Cases: {openCases}
        </div>
        <div className="bg-[#D4B337] text-white text-center text-[24px] font-bold p-6 rounded-lg shadow-md w-[400px]
          nesthub:w-[190px] nesthub:h-[100px] nesthub:text-[16px]
          nesthubmax:w-[230px] nesthubmax:h-[130px] nesthubmax:text-[20px] 2xl:w-[400px] 2xl:h-[200px] 2xl:text-[28px]">
          Closed Cases: {closedCases}
        </div>
      </div>

      <div className="ml-32 mt-8 nesthubmax:ml-4 nesthub:ml-2">
      <div className="w-[100%] nesthub:w-[100%] nesthubmax:w-[100%]">
        <ChartComponent />
        </div>
      </div>
    </div>
  );
};

export default PoliceDashboard;