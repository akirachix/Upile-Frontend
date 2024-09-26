'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaHome, FaUpload, FaUsers, FaBell} from 'react-icons/fa';
import Image from 'next/image';

const SidebarNav = () => {
  const router = useRouter();

  const SidebarItem = ({ Icon, label, path, isActive }: { Icon: React.ElementType, label: string, path: string, isActive: boolean }) => (
    <li
      onClick={() => router.push(path)}
      className={`flex items-center p-2 rounded-lg cursor-pointer ${isActive ? 'text-[#D4B337] ' : 'text-white  transition-colors duration-200'}`}
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
      <nav className='nesthub:mt-10 nesthubmax:mt-20 2xl:mt-24'>
        <ul className='space-y-11 text-[24px] nesthub:text-[18px] xl:text-[20px] 2xl:text-[24px] 2xl:mt-10'>
          <SidebarItem Icon={FaHome} label="Home" path="/" isActive={false} />
          <SidebarItem Icon={FaUpload} label="Update Data" path="police/missing-persons/personal-details" isActive={false} />
          <SidebarItem Icon={FaUsers} label="Missing persons" path="police/missingInterface" isActive={false} />
          <SidebarItem Icon={FaBell} label="Notifications" path="police/notifications" isActive={false} />
        </ul>
      </nav>
    </div>
  );
};

export default SidebarNav;
