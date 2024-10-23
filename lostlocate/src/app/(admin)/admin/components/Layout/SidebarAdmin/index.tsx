'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { FaHome,FaUser } from 'react-icons/fa';
import Image from 'next/image';

const SidebarAdmin = () => {
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
    <div className="fixed  w-[300px] h-[100%] bg-[#662113] text-white p-4 nexthub:w-[30px] nexthub:h-[30px] xl:w-68 xl:h-[800px] 2xl:h-[1035px] 2xl:w-72px">
      <Image src='/media/lostlocatelogo.png' alt='LostLocate Logo' className='w-32 h-auto mx-auto sm:mx-0 mb-8 nesthub:mt-4 nesthubmax:mt-4 2xl:mt-6' 
      width={500}
      height={300}/>
      <nav className='nesthub:mt-10 nesthubmax:mt-20 2xl:mt-24'>
        <ul className='space-y-11 text-[24px] nesthub:text-[18px] xl:text-[20px] 2xl:text-[24px] 2xl:mt-10'>
          <SidebarItem Icon={FaHome} label="Home" path="/admin" isActive={false} />
          <SidebarItem Icon={FaUser} label="Add User" path="/admin/register" isActive={false} />
        </ul>
      </nav>
    </div>
  );
};

export default SidebarAdmin;

