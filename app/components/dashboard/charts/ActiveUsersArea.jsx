"use client"; // Asegúrate de que este componente se use en un entorno de cliente

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement, // Para los puntos en la línea
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registro de componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const data = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril'], // Etiquetas del eje X
  datasets: [
    {
      label: 'Usuarios Activos',
      data: [150, 200, 250, 300], // Datos de usuarios activos
      fill: true, // Rellenar el área bajo la línea
      backgroundColor: 'rgba(130, 202, 157, 0.5)', // Color de fondo
      borderColor: '#82ca9d', // Color del borde de la línea
      tension: 0.4, // Suavizado de la línea
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false, // Permite que el gráfico ocupe todo el espacio disponible
  plugins: {
    legend: {
      position: 'top', // Posición de la leyenda
    },
    title: {
      display: true,
      text: 'Usuarios Activos por Mes', // Título del gráfico
    },
  },
};

const ActiveUsersAreaChart = () => (
  <div className="bg-white shadow-lg rounded-lg p-4"> {/* Contenedor con estilo */}
    <div style={{ position: 'relative', width: '100%', height: '300px' }}> {/* Contenedor que ocupa el 100% */}
      <Line data={data} options={options} />
    </div>
  </div>
);

export default ActiveUsersAreaChart;
