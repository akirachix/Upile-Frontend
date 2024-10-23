// 'use client';

// import React, { useState } from 'react';
// import { FaSearch } from 'react-icons/fa';
// import Layout from '../components/Layout';
// import { useDisplayUnidentifiedBodies } from '../../../hooks/useDisplayUnidentifiedBodies';
// import { UnidentifiedBodies } from '../../../utils/types'; 
// import { useRouter } from 'next/navigation';

// const UnidentifiedBodiesDashboard: React.FC = () => {
//   const { data, isLoading, error } = useDisplayUnidentifiedBodies();
//   const [searchTerm, setSearchTerm] = useState('');
//   const router = useRouter();

//   const handleAddData = () => {
//     router.push('/mortuary/unidentified_bodies/first-page-form'); 
//   };

//   const filteredBodies: UnidentifiedBodies[] = (data || []).filter((body) =>
//     body.id && body.id.toString().includes(searchTerm)
//   );

//   const bodiesToDisplay = searchTerm ? filteredBodies : data || [];
//   const sortedBodies = [...bodiesToDisplay].sort((a, b) => b.id - a.id);

//   const formatDate = (date: Date | string) => {
//     if (typeof date === 'string') {
//       date = new Date(date); 
//     }
//     return date.toISOString().split('T')[0]; 
//   };

//   const PersonCard: React.FC<{ body: UnidentifiedBodies }> = ({ body }) => (
//     <div className="border-2 border-[#662113] rounded-md p-4 bg-white shadow-sm">
//       <div className="flex items-center justify-center mb-4">
//         <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//           <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//         </svg>
//         <span className="text-4xl ml-2">?</span>
//       </div>
//       <div className="space-y-2">
//         <p><strong>ID:</strong> {body.id}</p>
//         <p><strong>Name:</strong> {body.name || 'Unknown'}</p>
//         <p><strong>Gender:</strong> {body.gender}</p>
//         <p><strong>Reported Date:</strong> {formatDate(body.reporting_date)}</p>        
//         <p><strong>Clothes Worn:</strong> {body.clothes_worn || 'N/A'}</p>
//       </div>
//     </div>
//   );

//   return (
//     <Layout>
//       <div className="bg-white min-h-screen ml-[350px]">
//         <header className="text-[#662113] p-4">
//           <div className="container mx-auto">
//             <h1 className="text-[40px] font-bold">Unidentified Bodies</h1>
//           </div>
//         </header>
//         <main className="container mx-auto p-4">
//           <section className="mt-4">
//             <div className="flex flex-col sm:flex-row gap-96 justify-between items-center mb-4">
//               <div className="relative w-full sm:w-96">
//                 <input
//                   type="text"
//                   placeholder="Search by ID..."
//                   className="border border-[#662113] rounded-full px-4 py-2 w-full pl-10"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#662113]" />
//               </div>
//               <div className="mr-1 ml-72">
//                 <button onClick={handleAddData} className="bg-[#D4B337] text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300">
//                   + Add Data
//                 </button>
//               </div>
//             </div>

//             {isLoading ? (
//               <p>Loading...</p>
//             ) : error ? (
//               <p>{error.message}</p>
//             ) : bodiesToDisplay.length === 0 ? (
//               <p>No unidentified bodies data available.</p>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {sortedBodies.map((body) => (
//                   <PersonCard key={body.id} body={body} />
//                 ))}
//               </div>
//             )}
//           </section>
//         </main>
//       </div>
//     </Layout>
//   );
// };

// export default UnidentifiedBodiesDashboard;


'use client';

import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import Layout from '../components/Layout';
import { useDisplayUnidentifiedBodies } from '../../../hooks/useDisplayUnidentifiedBodies';
import { UnidentifiedBodies } from '../../../utils/types'; 
import { useRouter } from 'next/navigation';

const UnidentifiedBodiesDashboard: React.FC = () => {
  const { data, isLoading, error } = useDisplayUnidentifiedBodies();
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleAddData = () => {
    router.push('/mortuary/unidentified_bodies/first-page-form'); 
  };

  const filteredBodies: UnidentifiedBodies[] = (data || []).filter((body) =>
    body.id && body.id.toString().includes(searchTerm)
  );

  const bodiesToDisplay = searchTerm ? filteredBodies : data || [];
  const sortedBodies = [...bodiesToDisplay].sort((a, b) => b.id - a.id);

  const formatDate = (date: Date | string) => {
    if (typeof date === 'string') {
      date = new Date(date); 
    }
    return date.toISOString().split('T')[0]; 
  };

  const PersonCard: React.FC<{ body: UnidentifiedBodies }> = ({ body }) => (
    <div className="border-2 border-[#662113] rounded-md p-4 bg-white shadow-sm">
      <div className="flex items-center justify-center mb-4">
        <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
        <span className="text-2xl sm:text-4xl ml-2">?</span>
      </div>
      <div className="space-y-2">
        <p><strong>ID:</strong> {body.id}</p>
        <p><strong>Name:</strong> {body.name || 'Unknown'}</p>
        <p><strong>Gender:</strong> {body.gender}</p>
        <p><strong>Reported Date:</strong> {formatDate(body.reporting_date)}</p>        
        <p><strong>Clothes Worn:</strong> {body.clothes_worn || 'N/A'}</p>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="bg-white min-h-screen ml-0 sm:ml-[350px]">
        <header className="text-[#662113] p-4">
          <div className="container mx-auto">
            <h1 className="text-[32px] sm:text-[40px] font-bold">Unidentified Bodies</h1>
          </div>
        </header>
        <main className="container mx-auto p-4">
          <section className="mt-4">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-96 justify-between items-center mb-4">
              <div className="relative w-full sm:w-96">
                <input
                  type="text"
                  placeholder="Search by ID..."
                  className="border border-[#662113] rounded-full px-4 py-2 w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#662113]" />
              </div>
              <div className="mt-4 sm:mt-0 sm:mr-1 sm:ml-72">
                <button onClick={handleAddData} className="bg-[#D4B337] text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300">
                  + Add Data
                </button>
              </div>
            </div>

            {isLoading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error.message}</p>
            ) : bodiesToDisplay.length === 0 ? (
              <p>No unidentified bodies data available.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedBodies.map((body) => (
                  <PersonCard key={body.id} body={body} />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default UnidentifiedBodiesDashboard;
