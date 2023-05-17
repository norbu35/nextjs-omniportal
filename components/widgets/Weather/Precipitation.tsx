import { WeatherData } from './types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import styles from './Tab.module.scss';

interface Props {
  weatherData: WeatherData;
}

function Precipitation({ weatherData }: Props) {
  const { daily } = weatherData;

  ChartJS.register(CategoryScale, LinearScale, BarElement, Legend);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
      },
      precipProb: {
        display: true,
        position: 'left' as const,
        ticks: {
          color: 'white',
        },
      },
      precipSum: {
        display: true,
        position: 'right' as const,
        ticks: {
          color: 'white',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
    },
  };

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const days = daily.time.map((time) => new Date(time));
  const labels = days.map((day) => {
    if (day.getDay() === new Date().getDay()) return 'Today';
    return weekdays[day.getDay()];
  });

  const data = {
    labels,
    datasets: [
      {
        label: 'Probability',
        data: daily.time.map(
          (_, index) => daily.precipitation_probability_mean[index],
        ),
        backgroundColor: '#e3ded5',
        yAxisID: 'precipProb',
      },
      {
        label: 'Amount (mm)',
        data: daily.time.map((_, index) => daily.precipitation_sum[index]),
        backgroundColor: '#1252b8',
        yAxisID: 'precipSum',
      },
    ],
  };

  return (
    <>
      <div className={styles.barGraph}>
        <Bar options={options} data={data} />
      </div>
    </>
  );
}

export { Precipitation };
