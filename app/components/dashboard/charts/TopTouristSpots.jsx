"use client";
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import useCustomAxios from '@/app/services/CustomAxios';
import { useSession } from 'next-auth/react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TopTouristSpots = () => {
  const { request } = useCustomAxios();
  const { data: session, status } = useSession();

  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated") {
        const response = await request('get', '/stats/top-tourist-spots/');
        const labels = response.top_tourist_spots.map(spot => spot.name);
        const data = response.top_tourist_spots.map(spot => spot.route_count);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Rutas Incluidas',
              data: data,
              backgroundColor: 'rgba(75, 192, 192, 0.5)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
            }
          ],
        });
      }
    };

    fetchData();
  }, [status]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { callback: (value) => Number.isInteger(value) ? value : '' },
      },
    },
  };

  return (
    <div className="flex flex-col justify-center items-center w-full  h-full bg-white rounded-lg shadow-lg p-6 mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Top 5 Lugares Turísticos</h2>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default TopTouristSpots;
