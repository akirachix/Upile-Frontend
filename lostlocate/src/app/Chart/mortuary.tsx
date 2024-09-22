'use client';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchUnidentifiedBodies } from '@/app/utils/fetchbodies';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface UnidentifiedBody {
  reporting_date: string;
}
interface ChartData {
  
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
        borderColor: string;
        borderWidth: number;
    }[]
}
const BarChartComponent = () => {
  const [chartData, setChartData] = useState<ChartData>(   {labels: [],
    datasets:[ {
      label: '',
    data: [],
    backgroundColor: '',
    borderColor: '',
    borderWidth: 0
    }],
  } );
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUnidentifiedBodies();
        const data = response.unidentified_bodies as UnidentifiedBody[];

        if (data && data.length > 0) {
          const processedData = processChartData(data);
          setChartData(processedData);
          setHasData(true);
        } else {
          setChartData(getDefaultChartData());
          setHasData(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setChartData(getDefaultChartData());
        setHasData(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const processChartData = (data: UnidentifiedBody[]) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const unidentifiedBodiesPerMonth = Array(12).fill(0); 

    data.forEach((record) => {
      const date = new Date(record.reporting_date);  
      if (!isNaN(date.getTime())) {  
        const monthIndex = date.getMonth(); 
        unidentifiedBodiesPerMonth[monthIndex]++; 
      } else {
        console.warn("Invalid date found:", record.reporting_date);  
      }
    });

    return {
      labels: months,
      datasets: [
        {
          label: 'No. of Unidentified Bodies',
          data: unidentifiedBodiesPerMonth, 
          backgroundColor: '#D2AA3E',
          borderColor: '#8B0000',
          borderWidth: 1,
        },
      ],
    };
  };

  const getDefaultChartData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return {
      labels: months,
      datasets: [
        {
          label: 'No. of Unidentified Bodies',
          data: Array(12).fill(0), 
          backgroundColor: '#D2AA3E',
          borderColor: '#8B0000',
          borderWidth: 1,
        },
      ],
    };
  };

  const options: ChartOptions<'bar'> = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Unidentified Bodies Per Month',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months of the Year',
        },
      },
      y: {
        title: {
          display: true,
          text: 'No. of Unidentified Bodies',
        },
        beginAtZero: true,
      },
    },
  };

  if (isLoading) return <div>Loading chart...</div>;
  if (!hasData) return <div>No unidentified bodies data available.</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6 w-[600px] h-[800px] nesthub:w-[680px] nesthub:h-[900px] xl:w-[900px] xl:h-[660px] 2xl:w-[1250px] 2xl:h-[1300px]">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarChartComponent;
