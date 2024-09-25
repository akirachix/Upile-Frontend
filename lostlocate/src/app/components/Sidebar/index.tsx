'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaHome, FaUpload, FaUsers, FaQuestionCircle, FaUser } from 'react-icons/fa';
import Image from 'next/image';

const SidebarNav = () => {
  const router = useRouter();

  const SidebarItem = ({ Icon, label, path, isActive }: { Icon: React.ElementType, label: string, path: string, isActive: boolean }) => (
    <li
      onClick={() => router.push(path)}
      className={`flex items-center p-2 rounded-lg cursor-pointer ${isActive ? 'text-[#D4B337] text-[#662113]' : 'text-white hover:text-[#D4B337] hover:text-[#662113] transition-colors duration-200'}`}
    >
      <Icon className="mr-2" />
      <span className="font-medium">{label}</span>
    </li>
  );

  return (
    <div className=" fixed top-0 w-[350px] h-[100%] bg-[#662113] text-white p-4">
      <Image src='/media/lostlocatelogo.png' alt='LostLocate Logo' className='w-32 h-auto mx-auto sm:mx-0 mb-8' 
      width={500}
      height={300}/>
      <nav>
        <ul className='space-y-11 text-[24px]'>
          <SidebarItem Icon={FaHome} label="Home" path="/" isActive={true} />
          <SidebarItem Icon={FaUpload} label="Update Data" path="/update-data" isActive={false} />
          <SidebarItem Icon={FaUsers} label="Missing persons" path="/missing-persons" isActive={false} />
          <SidebarItem Icon={FaQuestionCircle} label="Unidentified bodies" path="/unidentified-bodies" isActive={false} />
          <SidebarItem Icon={FaUser} label="Admin" path="/admin" isActive={false} />
        </ul>
      </nav>
    </div>
  );
};

export default SidebarNav;
