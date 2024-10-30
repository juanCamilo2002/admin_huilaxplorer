"use client";
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import useCustomAxios from '@/app/services/CustomAxios';
import { useSession } from 'next-auth/react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const UserStats = () => {
  const { request } = useCustomAxios();
  const { data: session, status } = useSession();
  
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated") {
        const response = await request('get', '/stats/user-account-monthly/');
        const labels = Object.keys(response.results);
        const data = Object.values(response.results);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Usuarios Nuevos',
              data: data,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
              tension: 0.3,
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
    <div className="flex flex-col justify-center items-center w-full  h-full bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-center">Usuarios nuevos por mes</h2>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default UserStats;
