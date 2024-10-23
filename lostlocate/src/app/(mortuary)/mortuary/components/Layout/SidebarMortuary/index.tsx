'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FaHome, FaUpload, FaQuestionCircle, FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname(); 
  const [isOpen, setIsOpen] = useState(false);

  const SidebarItem = ({ Icon, label, path }: { Icon: React.ElementType, label: string, path: string }) => {
    const isActive = pathname === path; 
    return (
      <li
        onClick={() => {
          router.push(path);
          setIsOpen(false); 
        }}
        className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
          isActive ? 'text-[#D4B337]' : 'text-white' 
        }`}
      >
        <Icon className="mr-2" />
        <span className="font-medium">{label}</span>
      </li>
    );
  };

  return (
    <div>
      <div className="fixed top-0 left-0 z-50 mb-8 p-4 bg-[#662113] text-white w-full flex justify-between items-center md:hidden">
        <h1 className="text-lg">Menu</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      
      <div className={`fixed top-0 left-0 w-[300px] h-full bg-[#662113] text-white p-4 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block`}>
        <Image
          src='/media/lostlocatelogo.png'
          alt='LostLocate Logo'
          className='w-32 h-auto mx-auto mt-8 sm:mx-0 mb-8'
          width={500}
          height={300}
        />
        <nav>
          <ul className='space-y-6 text-[22px]'>
            <SidebarItem Icon={FaHome} label="Home" path="/mortuary" />
            <SidebarItem Icon={FaUpload} label="Add Data" path="/mortuary/unidentified_bodies/first-page-form" />
            <SidebarItem Icon={FaQuestionCircle} label="Unidentified bodies" path="/mortuary/unidentified-bodies-data" />
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;


