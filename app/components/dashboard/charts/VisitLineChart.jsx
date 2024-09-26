"use client";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement, // Importa PointElement
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registro de componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend); // Registra PointElement

const data = {
  labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'], // Etiquetas del eje X
  datasets: [
    {
      label: 'Visitas',
      data: [300, 250, 320, 290, 360],
      fill: false, 
      backgroundColor: '#0cb300', 
      borderColor: '#0b9800', 
      tension: 0.1, 
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
      text: 'Visitas Mensuales', // Título del gráfico
    },
  },
};

const VisitsLineChart = () => (
  <div className="bg-white shadow-lg rounded-lg p-4">
    <div style={{ position: 'relative', width: '100%', height: '300px' }}> {/* Contenedor que ocupa el 100% */}
      <Line data={data} options={options} />
    </div>
  </div>
);

export default VisitsLineChart;
