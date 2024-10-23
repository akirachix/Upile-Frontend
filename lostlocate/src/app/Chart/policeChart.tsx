
'use client';
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import { Chart as ChartJS, LinearScale, CategoryScale, LineElement, PointElement, LineController, Title, Tooltip, Legend } from 'chart.js';
import { fetchMissingPersons } from '@/app/utils/fetchMissingPersonsByPolice';
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
  const [timeRange, setTimeRange] = useState('month'); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchMissingPersons();
        const data = response.missing_persons as MissingPerson[];
        if (data && data.length > 0) {
          let processedData;
          if (timeRange === 'week') {
            processedData = processWeeklyData(data);
          } else if (timeRange === 'month') {
            processedData = processMonthlyData(data);
          } else {
            processedData = processYearlyData(data);
          }
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
  }, [timeRange]);
  const processWeeklyData = (data: MissingPerson[]) => {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const currentDayOfWeek = new Date().getDay(); 
    const missingPersonsPerDay = Array(7).fill(0); 
    data.forEach((person) => {
      const date = new Date(person.missing_date);
      if (!isNaN(date.getTime())) {
        const dayIndex = (date.getDay() + 6) % 7; 
        if (dayIndex <= currentDayOfWeek) { 
          missingPersonsPerDay[dayIndex]++;
        }
      } else {
        console.warn("Invalid date found:", person.missing_date);
      }
    });
    return {
      labels: daysOfWeek, 
      datasets: [
        {
          label: 'Number of Missing Persons',
          data: missingPersonsPerDay,
          borderColor: '#F9D13B',
          backgroundColor: '#000000',
          pointBorderColor: '#000000',
          fill: false,
        },
      ],
    };
  };
  const processMonthlyData = (data: MissingPerson[]) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth(); 
    const missingPersonsPerMonth = Array(12).fill(0);
    data.forEach((person) => {
      const date = new Date(person.missing_date);
      if (!isNaN(date.getTime())) {
        const monthIndex = date.getMonth();
        if (monthIndex <= currentMonth) { 
          missingPersonsPerMonth[monthIndex]++;
        }
      } else {
        console.warn("Invalid date found:", person.missing_date);
      }
    });
    return {
      labels: months.slice(0, currentMonth + 1),
      datasets: [
        {
          label: 'Number of Missing Persons',
          data: missingPersonsPerMonth.slice(0, currentMonth + 1),
          borderColor: '#F9D13B',
          backgroundColor: '#000000',
          pointBorderColor: '#000000',
          fill: false,
        },
      ],
    };
  };
  const processYearlyData = (data: MissingPerson[]) => {
    const years: string[] = [];
    const currentYear = new Date().getFullYear();
    const yearCounts: { [year: number]: number } = {};
    data.forEach((person) => {
      const date = new Date(person.missing_date);
      if (!isNaN(date.getTime())) {
        const year = date.getFullYear();
        if (!yearCounts[year]) yearCounts[year] = 0;
        yearCounts[year]++;
      } else {
        console.warn("Invalid date found:", person.missing_date);
      }
    });
    const sortedYears = Object.keys(yearCounts).map(Number).sort((a, b) => a - b);
    sortedYears.forEach((year) => {
      years.push(year.toString());
    });
    return {
      labels: years,
      datasets: [
        {
          label: 'Number of Missing Persons',
          data: sortedYears.map((year) => yearCounts[year]),
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
  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTimeRange(e.target.value);
  };
  const options: ChartOptions<'line'> = {
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Missing Persons Over Time',
      font: {
        size: 24,
      },
      color: '#662113',  },
    },
    scales: {
      x: { title: { display: true, text: timeRange === 'week' ? 'Days of the Week' : timeRange === 'month' ? 'Months of the Year' : 'Years',
      font: {
        size: 20,
      } } },
      y: { title: { display: true, text: 'Number of Missing Persons',
      font: {
        size: 20,
      }, }, beginAtZero: true, ticks: { stepSize: 1 } }, 
    },
  };
  if (isLoading) return <div>Loading chart...</div>;
  if (!hasData) return <div>No missing persons data available.</div>;
  return (
    <div className="bg-white shadow ml-[20px]  rounded-lg p-6 w-[600px] h-[700px] nesthub:w-[650px] nesthub:h-[1100px] xl:w-[880px] xl:h-[1100px] 2xl:w-[1250px] 2xl:h-[1200px]">
      <div>
        <select onChange={handleTimeRangeChange} value={timeRange} className="border border-[#D4B337] p-2 rounded mb-4">
          <option value="month">This Year (Monthly)</option>
          <option value="week">This Week (Daily)</option>
          <option value="year">Years</option>
        </select>
      </div>
      <Line data={chartData} options={options} />
    </div>
  );
};
export default ChartComponent;