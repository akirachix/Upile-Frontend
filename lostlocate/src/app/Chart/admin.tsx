'use client';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { fetchSuccessfulMatches } from '../utils/fetchAdminData';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SuccessfulMatch {
  police_station: string;
  count: number;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
  }[];
}

const AdminChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: '',
        borderColor: '',
        borderWidth: 0,
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [, setHasData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchSuccessfulMatches();
        const data = response.matches as SuccessfulMatch[];

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

  const processChartData = (data: SuccessfulMatch[]) => {
    const policeStations = data.map(record => record.police_station);
    const matchesCount = data.map(record => record.count);

    return {
      labels: policeStations,
      datasets: [
        {
          label: 'No. of Successful Matches',
          data: matchesCount,
          backgroundColor: '#662113',  
          borderColor: '#662113',      
          borderWidth: 1,
        },
      ],
    };
  };

  const getDefaultChartData = () => {
    const defaultStations = ['Kasarani', 'Kikuyu', 'Kayole', 'CBD'];
    return {
      labels: defaultStations,
      datasets: [
        {
          label: 'matches',
          data: [], 
          backgroundColor: '#662113',
          borderColor: '#662113',
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
        labels: {
          font: {
            size: 14, 
          },
        },
      },
      title: {
        display: true,
        text: 'No. of Successful Matches vs. Police Stations',
        font: {
          size: 24, 
        },
        color: '#662113', 
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Police Stations',
          font: {
            size: 20,
          },
        },
        ticks: {
          font: {
            size: 14, 
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'No. of Successful Matches',
          font: {
            size: 20, 
          },
        },
        ticks: {
          font: {
            size: 14, 
          },
          stepSize: 1, 
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value; 
            }
            return null;
          },
        },
        suggestedMin: 0, 
      },
    },
  };

  if (isLoading) return <div>Loading chart...</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6 w-[600px] h-[400px] nesthub:w-[680px] nesthub:h-[500px] xl:w-[900px] xl:h-[600px] 2xl:w-[1250px] 2xl:h-[700px]">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default AdminChart;
