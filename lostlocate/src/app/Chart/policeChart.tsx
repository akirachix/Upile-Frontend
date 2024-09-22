'use client';

import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { Chart as ChartJS, LinearScale, CategoryScale, LineElement, PointElement, LineController, Title, Tooltip, Legend } from 'chart.js';
import { fetchMissingPersons } from '@/app/utils/fetchMissingPersons';

ChartJS.register(
  LinearScale,
  CategoryScale,
  LineElement,
  PointElement,
  LineController,
  Title,
  Tooltip,
  Legend
);

interface MissingPerson {
  missing_date: string;
}

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    pointBorderColor: string;
    fill: boolean;
  }[];
}

const ChartComponent = () => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        borderColor: '',
        backgroundColor: '',
        pointBorderColor: '',
        fill: false,
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMissingPersons();
        const data = response.missing_persons as MissingPerson[]; 

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

  const processChartData = (data: MissingPerson[]) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const missingPersonsPerMonth = Array(12).fill(0);

    data.forEach((person) => {
      const date = new Date(person.missing_date);
      if (!isNaN(date.getTime())) {
        const monthIndex = date.getMonth();
        missingPersonsPerMonth[monthIndex]++;
      } else {
        console.warn("Invalid date found:", person.missing_date);
      }
    });

    return {
      labels: months,
      datasets: [
        {
          label: 'Number of Missing Persons',
          data: missingPersonsPerMonth,
          borderColor: '#F9D13B',
          backgroundColor: '#000000',
          pointBorderColor: '#000000',
          fill: false,
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
          label: 'Number of Missing Persons',
          data: Array(12).fill(0),
          borderColor: '#F9D13B',
          backgroundColor: '#000000',
          pointBorderColor: '#000000',
          fill: false,
        },
      ],
    };
  };

  const options: ChartOptions<'line'> = {
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Missing Persons Over Time' },
    },
    scales: {
      x: { title: { display: true, text: 'Months of the Year' } },
      y: { title: { display: true, text: 'Number of Missing Persons' }, beginAtZero: true },
    },
  };

  if (isLoading) return <div>Loading chart...</div>;
  if (!hasData) return <div>No missing persons data available.</div>;

  return (
    <div className="bg-white shadow rounded-lg p-6 w-[600px] h-[800px] nesthub:w-[650px] nesthub:h-[1100px] xl:w-[880px] xl:h-[1100px] 2xl:w-[1250px] 2xl:h-[1200px]">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default ChartComponent;
