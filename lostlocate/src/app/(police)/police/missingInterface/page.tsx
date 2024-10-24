'use client';
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import PersonCard from '../../../components/MissingPersonCard';
import { useMissingPersons } from '../../../hooks/useMissingPersons';
import { useRouter } from 'next/navigation'; 
import Layout from '../components/Layout';
import { MissingPerson } from '@/app/utils/types';

const Dashboard: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false); 
  const router = useRouter(); 

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { data, loading, error } = useMissingPersons();
  const [searchTerm, setSearchTerm] = useState('');
  const [persons, setPersons] = useState<MissingPerson[]>([]);

  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 6; 

  useEffect(() => {
    if (data && data.length > 0) {
      setPersons(data);
    }
  }, [data]);

  const filteredPersons = persons.filter((person: MissingPerson) =>
    person.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPersons = filteredPersons.slice(indexOfFirstItem, indexOfLastItem); 

  const totalPages = Math.ceil(filteredPersons.length / itemsPerPage);

  const handleAddData = () => {
    if (isMounted) {
      router.push('/police/missing-persons/personal-details');
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!isMounted) {
    return null; 
  }

  return (
    <Layout>
      <div className="bg-white min-h-screen ml-[350px]">
        <main className="container mx-auto p-4">
          <section>
            <h1 className="text-[40px] font-bold text-[#662113] mb-4">Missing Persons</h1>
          </section>
          <section className="mt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <div className="relative w-full sm:w-96">
                <input
                  type="text"
                  placeholder="Search by name..."
                  className="border border-[#662113] rounded-full px-4 py-2 w-full pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#662113]" />
              </div>
              <div className="mr-8">
                <button
                  onClick={handleAddData}
                  className="bg-[#D4B337] text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition duration-300"
                >
                  + Add Data
                </button>
              </div>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error.message}</p>
            ) : filteredPersons.length === 0 ? (
              <p>No missing persons data available.</p>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
                  {currentPersons.map((person) => (
                    <PersonCard
                      key={person.id}
                      id={Number(person.id)} 
                      first_name={person.first_name}
                      last_name={person.last_name}
                      age={person.age.toString()}
                      gender={person.gender}
                      location={person.location}
                      clothes_worn={person.clothes_worn}
                      missing_date={person.missing_date}
                    />
                  ))}
                </div>

                <div className="flex justify-center items-center mt-8">
                  <button
                    onClick={handlePreviousPage}
                    className={`px-4 py-2 mx-2 rounded-md ${currentPage === 1 ? 'bg-gray-300' : 'bg-[#D4B337] text-white hover:bg-yellow-600'} transition duration-300`}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="text-lg mx-4">Page {currentPage} of {totalPages}</span>
                  <button
                    onClick={handleNextPage}
                    className={`px-4 py-2 mx-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300' : 'bg-[#D4B337] text-white hover:bg-yellow-600'} transition duration-300`}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </section>
        </main>
      </div>
    </Layout>
  );
};

export default Dashboard;
