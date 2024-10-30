"use client";
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import useCustomAxios from '@/app/services/CustomAxios';
import { useSession } from 'next-auth/react';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const UserPreferences = () => {
  const { request } = useCustomAxios();
  const { data: session, status } = useSession();
  
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated") {
        const response = await request('get', '/stats/top-activities/');
        const labels = response.results.map(activity => activity.name);
        const data = response.results.map(activity => activity.user_count);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Usuarios por Actividad',
              data: data,
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
              ],
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
  };

  return (
    <div className="flex flex-col justify-center items-center w-full p-3 bg-white rounded-lg shadow-lg h-full mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Actividades Preferidas por Usuarios</h2>
      <Doughnut data={chartData} options={options} />
    </div>
  );
};

export default UserPreferences;
