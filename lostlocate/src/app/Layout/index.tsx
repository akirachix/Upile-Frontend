"use client";  
import React from 'react';
import SidebarNav from '../components/Sidebar';


export default function Layout({ children }: { children: React.ReactNode }) {
 
  return (
    <div className="flex min-h-screen">
      <div>
        <SidebarNav />
      </div>
      <div className="flex-grow p-4">
        {children}
      </div>
    </div>
  );
}