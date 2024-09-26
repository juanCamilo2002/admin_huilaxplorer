"use client";
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Registro de componentes de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Playas', 'Montañas', 'Museos', 'Parques'], // Etiquetas
  datasets: [
    {
      label: 'Preferencias',
      data: [400, 300, 200, 100], // Datos
      backgroundColor: ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'], // Colores
      borderColor: '#fff', // Color del borde
      borderWidth: 2, // Ancho del borde
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top', // Posición de la leyenda
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          return `${tooltipItem.label}: ${tooltipItem.raw}`; // Formato de la etiqueta del tooltip
        },
      },
    },
  },
};

const PreferencesPieChart = () => (
  <div className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center justify-center"> {/* Contenedor con estilo y centrado */}
    <div style={{ position: 'relative', width: '100%', height: '300px',}}> {/* Contenedor que ocupa el 100% */}
      <Doughnut data={data} options={options} />
    </div>
  </div>
);

export default PreferencesPieChart;
