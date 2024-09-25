'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/app/components/Layout'; 
import { fetchMissingPersonById } from '../../utils/fetchMissingPerson';
import { MissingPerson } from '@/app/utils/types';

const MissingPersonPage = ({ params: { id } }: { params: { id: string } }) => { 
  const router = useRouter();
  const [formData, setFormData] = useState<MissingPerson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMissingPerson = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);  
      try {
        const person = await fetchMissingPersonById(id);
        if (!person) throw new Error('Person not found');

        const formattedCreatedAt = person.created_at
          ? new Date(person.created_at).toISOString().slice(0, 16)
          : '';

        setFormData({
          ...person,
          created_at: formattedCreatedAt,
        });
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getMissingPerson();
  }, [id]);

  if (loading) return <p className="text-center text-lg text-gray-600 mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">Error: {error}</p>;
  if (!formData) return <p className="text-center text-lg text-gray-600 mt-10">Person not found.</p>;

  return (
    <Layout> 
      <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen p-10 flex justify-center items-start">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
          <h1 className="text-4xl font-bold text-[#662113] text-center">{formData.first_name}  {formData.last_name}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <label className="block text-black h-10 font-semibold mb-1">ID</label>
              <p className="text-gray-700">{formData.id}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <label className="block text-black font-semibold mb-1">First Name</label>
              <p className="text-gray-700">{formData.first_name}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <label className="block text-black font-semibold mb-1">Last Name</label>
              <p className="text-gray-700">{formData.last_name}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <label className="block text-black font-semibold mb-1">Age</label>
              <p className="text-gray-700">{formData.age}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <label className="block text-black font-semibold mb-1">Gender</label>
              <p className="text-gray-700">{formData.gender}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <label className="block text-black font-semibold mb-1">Contact</label>
              <p className="text-gray-700">{formData.contact}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <label className="block text-black font-semibold mb-1">Location</label>
              <p className="text-gray-700">{formData.location}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <label className="block text-black font-semibold mb-1">Height (cm)</label>
              <p className="text-gray-700">{formData.height}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <label className="block text-black font-semibold mb-1">Weight (kg)</label>
              <p className="text-gray-700">{formData.weight}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <label className="block text-black font-semibold mb-1">Hair Color</label>
              <p className="text-gray-700">{formData.hair_color}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <label className="block text-black font-semibold mb-1">Eye Color</label>
              <p className="text-gray-700">{formData.eye_color}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <label className="block text-black font-semibold mb-1">Skin Color</label>
              <p className="text-gray-700">{formData.skin_color}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <label className="block text-black font-semibold mb-1">Clothes Worn</label>
              <p className="text-gray-700">{formData.clothes_worn}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <label className="block text-black font-semibold mb-1">Missing Date</label>
              <p className="text-gray-700">{formData.missing_date}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <label className="block text-black font-semibold mb-1">Created At</label>
              <p className="text-gray-700">{formData.created_at}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-md">
              <label className="block text-black font-semibold mb-1">Officer ID</label>
              <p className="text-gray-700">{formData.officer_id}</p>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default MissingPersonPage;
