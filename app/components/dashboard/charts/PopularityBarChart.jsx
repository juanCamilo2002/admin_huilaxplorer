"use client";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registro de componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['Playa', 'Montaña', 'Museo', 'Parque', 'Cascada'], // Etiquetas del eje X
  datasets: [
    {
      label: 'Visitas',
      data: [120, 98, 85, 72, 60], // Datos de visitas
      backgroundColor: '#0b9800', // Color primario 500
      borderColor: '#0A7C00', // Color primario 600
      borderWidth: 1, // Ancho del borde
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
      text: 'Popularidad de Lugares Turísticos', // Título del gráfico
    },
  },
};

const PopularityBarChart = () => (
  <div className="bg-white shadow-lg rounded-lg p-4 flex justify-center"> {/* Contenedor con estilo y centrado */}
    <div style={{ position: 'relative', width: '100%', height: '300px' }}> {/* Se establece un ancho máximo */}
      <Bar data={data} options={options} />
    </div>
  </div>
);

export default PopularityBarChart;
