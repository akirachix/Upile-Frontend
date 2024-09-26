'use client';
import { useState,useEffect } from "react";
import PoliceDashboard from "./PoliceDashboard";
import MortuaryDashboard from "./MortuaryDashboard";
import {getCookie} from 'cookies-next';
import PublicDasboard from "./Dashboard";



export default function Home() {
  const [dashboard, setDashboard] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const userRole = getCookie('role');

    if (userRole === 'police') {
      setDashboard(<PoliceDashboard />);
    } else if (userRole === 'mortuary') {
      setDashboard(<MortuaryDashboard />);
    } else {
      setDashboard(<PublicDasboard />); 
    }
  }, []);

  return (
    <div>
  {dashboard} 

    </div>
     
  );
}
