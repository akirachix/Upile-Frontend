'use client';
import React from 'react';
import { useGetUnidentifiedBodies } from '../../../hooks/useGetUnidentifiedBody'; 
import BarChartComponent from '../../../Chart/mortuary';

const MortuaryDashboard = () => {
  const { metrics, isLoading, error } = useGetUnidentifiedBodies(); 

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const unidentifiedBodies = metrics?.unidentifiedBodies ?? 0;
  const successfulMatches = metrics?.successfulMatches ?? 0;

  return (
    <div className="h-screen w-screen fixed flex flex-col bg-gray-100">
    
      <div className="flex gap-64 mt-10 ml-64
                      nesthub:mt-[8px] nesthub:ml-[35px] nesthub:gap-20 
                      nesthubmax:mt-[12px] nesthubmax:ml-28 nesthubmax:gap-28 2xl:ml-48 2xl:gap-28 2xl:h-[200px]">
        <div className="bg-[#D4B337] text-white text-center text-[36px] font-bold p-8 rounded-lg shadow-lg w-[400px] h-[250px] 
                        nesthub:w-[250px] nesthub:h-[130px] nesthub:text-[20px] 
                        nesthubmax:w-[300px] nesthubmax:h-[180px] nesthubmax:text-[24px] 2xl:w-[400px] 2xl:h-[200px]">
          Unidentified Bodies: {unidentifiedBodies}
        </div>
        <div className="bg-[#662113] text-white text-center text-[36px] font-bold p-8 rounded-lg shadow-lg w-[400px] h-[250px] 
                        nesthub:w-[250px] nesthub:h-[130px] nesthub:text-[20px] 
                        nesthubmax:w-[300px] nesthubmax:h-[180px] nesthubmax:text-[24px] 2xl:w-[400px] 2xl:h-[200px]">
          Successful Matches: {successfulMatches}
        </div>
      </div>

  
      <div className="mt-8 w-full flex ">
        <div className="w-[80%] nesthub:w-[96%] nesthubmax:w-[95%]">
          <BarChartComponent />
        </div>
      </div>
    </div>
  );
};

export default MortuaryDashboard;
