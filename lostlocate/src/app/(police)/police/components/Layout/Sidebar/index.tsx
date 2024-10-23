'use client';
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FaHome, FaUpload, FaUsers, FaBell, FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

const SidebarNav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const SidebarItem = ({ Icon, label, path, isActive }: { Icon: React.ElementType, label: string, path: string, isActive: boolean }) => (
    <li
      onClick={() => {
        router.push(path);
        setIsOpen(false); 
      }}
      className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors duration-200 ${isActive ? 'text-[#D4B337]' : 'text-white'}`}
    >
      <Icon className="mr-2" />
      <span className="font-medium">{label}</span>
    </li>
  );

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
          priority
        />
        <nav className='mt-10'>
          <ul className='space-y-6 text-[22px]'>
            <SidebarItem Icon={FaHome} label="Home" path="/police" isActive={pathname === "/police"} />
            <SidebarItem Icon={FaUpload} label="Add Data" path="/police/missing-persons/personal-details" isActive={pathname === "/police/missing-persons/personal-details"} />
            <SidebarItem Icon={FaUsers} label="Missing persons" path="/police/missingInterface" isActive={pathname === "/police/missingInterface"} />
            <SidebarItem Icon={FaBell} label="Notifications" path="/police/notifications" isActive={pathname === "/police/notifications"} />
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SidebarNav;

