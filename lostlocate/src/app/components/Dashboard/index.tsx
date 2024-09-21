'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import UpdateCard from '../UpdateCard';
import PersonCard from '../PersonCard'; 
import { useMissingPersons } from '../hooks/useMissingPerson';

const Dashboard: React.FC = () => {
  const { data, isLoading, error } = useMissingPersons();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPersons = data.filter((person: { first_name: string; last_name: string; }) =>
    person.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];
  
  const updateCategories = [
    { title: 'All', count: data?.length || 0 },
    { title: 'Missing', count:data?.length || 0 },
    { title: 'Found', count: 0 },
    { title: 'Departed', count: 0 },
  ];
  
  return (
    <div className="bg-white min-h-screen">
      <header className="bg-[#662113] text-white p-4">
        <div className="container mx-auto gap-4 flex sm:flex-row sm:items-center">
          <Image 
            src='/media/lostlocatelogo.png' 
            alt='LostLocate Logo' 
            className='w-24 sm:w-32 mt-2 sm:mt-0'
            width={500}
            height={300}
          />
          <div className="sm:ml-8 sm:mt-0 mt-4 text-[#D4B337] text-[24px] sm:text-[40px] text-center sm:text-left">
            <p className='lg:ml-48 lg:text-nowrap'>Connecting loved ones</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <section>
          <h2 className="text-[30px] font-bold text-[#662113] mb-4">Updates</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {updateCategories.map((category) => (
              <UpdateCard key={category.title} title={category.title} count={category.count} />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <h2 className="text-[30px] font-bold text-[#662113] text-nowrap mb-4 sm:mb-0">Recent Cases</h2>
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                placeholder="Search..."
                className="border border-[#662113] rounded-full px-4 py-2 w-full sm:w-96 md:ml-10 md:w-[90%] pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 md:left-14 top-1/2 transform -translate-y-1/2 text-[#662113]" />
            </div>
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p> {error.message}</p>
          ) : filteredPersons.length === 0 ? (
            <p>No missing persons data available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPersons.slice(0, 4).map((person, index) => (
                <PersonCard
                  key={index}
                  created_at={person.created_at}
                  first_name={person.first_name}
                  last_name={person.last_name}
                  age={person.age}
                  image={person.image}
                  gender={person.gender}
                  location={person.location}
                  clothes_worn={person.clothes_worn}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
