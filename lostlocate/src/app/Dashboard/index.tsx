'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import UpdateCard from '../UpdateCard';
import PersonCard from '../PersonCard';
import { useMissingPersons } from '../hooks/useMissingPersons';

const PublicDashboard: React.FC = () => {
  const { data, loading, error } = useMissingPersons();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<string>('Total Missing Persons');
  const [selectedLocation, setSelectedLocation] = useState<string>('All Locations');

  const uniqueLocations = ['All Locations', ...Array.from(new Set(data?.map((person: any) => person.location)))];

  const filteredPersons = data?.filter((person: { first_name: string; last_name: string, location: string, created_at: string }) => {
    const matchesSearchTerm = person.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.last_name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLocation = selectedLocation === 'All Locations' || person.location === selectedLocation;

    return matchesSearchTerm && matchesLocation;
  }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) || [];

  const assignStatus = (person: any) => {
    const currentDate = new Date();
    const missingDate = new Date(person.missing_date);

    if ((currentDate.getTime() - missingDate.getTime()) > 90 * 24 * 60 * 60 * 1000) {
      return 'Departed'; 
    }
    return 'Missing';  
  };

  const updateCategories = [
    { title: 'Total Statistics', count: data?.length || 0 },
    { title: 'Missing', count: filteredPersons.filter((p: any) => assignStatus(p) === 'Missing').length },
    { title: 'Found', count: 0 },
    { title: 'Departed', count: filteredPersons.filter((p: any) => assignStatus(p) === 'Departed').length },
  ];

  const filteredByTab = () => {
    switch (activeTab) {
      case 'Missing':
        return filteredPersons.filter((p: any) => assignStatus(p) === 'Missing');
      case 'Departed':
        return filteredPersons.filter((p: any) => assignStatus(p) === 'Departed');
      case 'Found':
        return [];
      default:
        return filteredPersons;
    }
  };

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
            priority
          />
          <div className="sm:ml-8 sm:mt-0 mt-4 text-[#D4B337] text-[24px] sm:text-[40px] text-center sm:text-left">
            <p className='lg:ml-48 2xl:ml-[100%] lg:text-nowrap'>Locating Lost Ones</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">

        <section className="flex justify-between items-center mt-8 mb-4">
          <h2 className="text-[30px] font-bold text-[#662113]">Missing Persons Updates</h2>
          <select
            className="border border-[#662113] px-4 py-2 rounded-md"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {uniqueLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </section>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {updateCategories.map((category) => (
            <UpdateCard
              key={category.title}
              title={category.title}
              count={category.count}
              isActive={category.title === activeTab}
              onClick={() => setActiveTab(category.title)}
            />
          ))}
        </div>

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

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error.message}</p>
          ) : filteredByTab().length === 0 ? (
            <p>Not Found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredByTab().map((person, index) => (
                <PersonCard
                  key={index}
                  first_name={person.first_name}
                  last_name={person.last_name}
                  age={person.age}
                  gender={person.gender}
                  location={person.location}
                  image={person.image}
                  clothes_worn={person.clothes_worn}
                  missing_date={person.missing_date}
                  status={assignStatus(person)}
                  id={''} contact={''} height={0} weight={0} hair_color={''} eye_color={''} skin_color={''} created_at={person.created_at} officer_id={0}                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default PublicDashboard;

