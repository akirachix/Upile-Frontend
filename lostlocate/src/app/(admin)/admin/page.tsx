'use client';
import React from 'react';
import { useGetAdminData } from '../../hooks/useGetAdminData';
import AdminChart from '../../Chart/admin';
import Layout from './components/Layout';



const AdminDashboard = () => {
  const { metrics, isLoading, error } = useGetAdminData(); 

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const totalPoliceStations = metrics?.TotalPoliceStations ?? 0;
  const totalMortuaries = metrics?.TotalMortuaries ?? 0;
  const successfulMatches = metrics?.SuccessfulMatches ?? 0;  

  return (
   <Layout>
    <div className="min-h-screen w-screen flex flex-col bg-gray-100 fixed">
      
      <div className="flex flex-wrap gap-16 mt-10 nesthub:mt-[8px] nesthub:ml-[18px] nesthubmax:mt-[12px] nesthub:gap-[24px] nesthubmax:ml-8 nesthubmax:gap-20 2xl:ml-14">
        
         <div className="bg-[#D4B337] text-[#662113] text-center text-[24px] font-bold p-6 rounded-lg shadow-md w-[400px] h-[200px]
           nesthub:w-[190px] nesthub:h-[100px] nesthub:text-[16px]
           nesthubmax:w-[230px] nesthubmax:h-[130px] nesthubmax:text-[20px] 2xl:w-[400px] 2xl:h-[200px] 2xl:text-[28px]">
           Total Police Stations: {totalPoliceStations}
         </div>

         <div className="bg-[#D4B337] p- text-[#662113] text-center text-[24px] font-bold p-6 rounded-lg shadow-md w-[400px] h-[200px]
           nesthub:w-[190px] nesthub:h-[100px] nesthub:text-[16px]
           nesthubmax:w-[230px] nesthubmax:h-[130px] nesthubmax:text-[20px] 2xl:w-[400px] 2xl:h-[200px] 2xl:text-[28px]">
           Total Mortuaries: {totalMortuaries}
         </div>
          <div className="bg-[#D4B337] text-[#662113] text-center text-[24px] font-bold p-6 rounded-lg shadow-md w-[400px] h-[200px]
           nesthub:w-[190px] nesthub:h-[100px] nesthub:text-[16px]
           nesthubmax:w-[230px] nesthubmax:h-[130px] nesthubmax:text-[20px] 2xl:w-[400px] 2xl:h-[200px] 2xl:text-[28px]">
           Successful Matches: {successfulMatches}
         </div>
      </div>
      <div className="ml-10 mt-8 nesthubmax:ml-4 nesthub:ml-2 2xl:ml-16">
        <div className="w-[100%]">
          <AdminChart/>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default AdminDashboard;
