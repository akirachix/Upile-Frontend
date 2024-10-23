'use client';
import { useState, useEffect, useCallback } from 'react';
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
  }[];
}

const BarChartComponent = () => {
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
  const [hasData, setHasData] = useState(false);
  const [timeRange, setTimeRange] = useState('month'); 

  const processChartData = useCallback((data: UnidentifiedBody[], range: string) => {
    let labels: string[] = [];
    let dataPoints: number[] = [];
    if (range === 'week') {
      labels = getDaysOfCurrentWeek(); 
      dataPoints = Array(7).fill(0); 
      data.forEach((record) => {
        const date = new Date(record.reporting_date);
        if (!isNaN(date.getTime())) {
          const dayIndex = date.getDay(); 
          dataPoints[dayIndex]++;
        }
      });
    } else if (range === 'month') {
      const currentMonth = new Date().getMonth(); 
      labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].slice(0, currentMonth + 1);
      dataPoints = Array(currentMonth + 1).fill(0); 
      data.forEach((record) => {
        const date = new Date(record.reporting_date);
        if (!isNaN(date.getTime())) {
          const monthIndex = date.getMonth(); 
          if (monthIndex <= currentMonth) dataPoints[monthIndex]++;
        }
      });
    } else if (range === 'year') {
      const currentYear = new Date().getFullYear();
      labels = Array.from({ length: 10 }, (_, i) => (currentYear - i).toString()); 
      dataPoints = Array(10).fill(0);
      data.forEach((record) => {
        const date = new Date(record.reporting_date);
        if (!isNaN(date.getTime())) {
          const year = date.getFullYear();
          const yearIndex = labels.indexOf(year.toString());
          if (yearIndex !== -1) dataPoints[yearIndex]++;
        }
      });
    }
    return {
      labels,
      datasets: [
        {
          label: `No. of Unidentified Bodies (${range})`,
          data: dataPoints,
          backgroundColor: '#D2AA3E',
          borderColor: '#8B0000',
          borderWidth: 1,
        },
      ],
    };
  }, []);

  const getDaysOfCurrentWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); 
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek + 1); 
    return daysOfWeek.slice(1).concat('Sunday'); 
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
        text: 'Unidentified Bodies Per Time Range',
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
          text: 'Time Range',
          font: {
            size: 20,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: 'No. of Unidentified Bodies',
          font: {
            size: 20,
          },
        },
        beginAtZero: true,
      },
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchUnidentifiedBodies();
        const data = response.unidentified_bodies as UnidentifiedBody[];
        if (data && data.length > 0) {
          const processedData = processChartData(data, timeRange);
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
  }, [timeRange, processChartData]); 

  if (isLoading) return <div>Loading chart...</div>;
  if (!hasData) return <div>Not found.</div>;

  return (
    <div>
      <div className="filter ml-[20px]">
        <label htmlFor="timeRange">Filter by:</label>
        <select
          id="timeRange"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
      </div>
      <div className="bg-white shadow rounded-lg p-6 w-[600px] h-[800px] nesthub:w-[680px] nesthub:h-[900px] xl:w-[900px] xl:h-[660px] 2xl:w-[1250px] 2xl:h-[1300px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarChartComponent;
