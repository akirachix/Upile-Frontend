'use client';
import React, { useEffect, useState } from "react";
import { getCookie } from 'cookies-next';
import Dashboard from "./Dashboard";
import PoliceDashboard from "./PoliceDashboard";
import MortuaryDashboard from "./MortuaryDashboard";

export default function Home() {
  const [dashboard, setDashboard] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const userRole = getCookie('role');

    if (userRole === 'police') {
      setDashboard(<PoliceDashboard />);
    } else if (userRole === 'mortuary') {
      setDashboard(<MortuaryDashboard />);
    } else {
      setDashboard(<Dashboard />); 
    }
  }, []);

  return (
    <div>   

  {dashboard} <Dashboard/>

  </div>

  )

}