"use client";
import React from 'react';
import UserStats from "../components/dashboard/charts/UserStats";
import TopTouristSpots from "../components/dashboard/charts/TopTouristSpots";
import UserPreferences from "../components/dashboard/charts/UserPreferences";  // Gráfico circular
import TopRatedPlaces from "../components/dashboard/charts/TopRatedPlaces";

const Page = () => {
  return (
    <div className="flex flex-col items-center  justify-between  bg-gray-100 min-h-screen">

    <div className="grid grid-cols-1 md:grid-cols-6 gap-6 w-full max-w-7xl h-[80vh] pb-2">
      {/* Gráfico "Usuarios Nuevos" más ancho y más alto */}
      <div className="col-span-1 md:col-span-4 h-full">
        <UserStats className="w-full h-full" />
      </div>

      {/* Gráfico circular al lado de "Usuarios Nuevos" */}
      <div className="col-span-1 md:col-span-2 h-full flex items-center justify-center">
        <UserPreferences className="w-full h-full" /> {/* Gráfico circular */}
      </div>

      {/* Gráfico circular "Lugares Mejor Calificados" */}
      <div className="col-span-1 md:col-span-2 h-full flex items-center justify-center pb-4">
        <TopRatedPlaces className="w-full h-full" /> {/* Gráfico circular */}
      </div>

      {/* Gráfico "Top 10 Lugares Turísticos" más ancho y más alto */}
      <div className="col-span-1 md:col-span-4 h-full pb-4">
        <TopTouristSpots className="w-full h-full" />
      </div>
    </div>
  </div>
  );
};

export default Page;
