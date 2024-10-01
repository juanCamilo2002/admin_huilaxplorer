'use client';
import React from 'react';
import Skeleton from 'react-loading-skeleton'; 
import 'react-loading-skeleton/dist/skeleton.css'; 
import { usePathname } from 'next/navigation';

const Loading = () => {
  const pathname = usePathname();
  const isAdminPage = pathname === '/dashboard'; 

  return (
    <div className="overflow-x-auto">
      {isAdminPage ? (
        <div className="flex flex-col space-y-4">
          {/* Diseño para la página de administrador */}
          <Skeleton height={50} width="100%" />
          <div className="grid grid-cols-3 gap-4">
            <Skeleton height={200} />
            <Skeleton height={200} />
            <Skeleton height={200} />
          </div>
        </div>
      ) : (
        <table className="min-w-full table-auto">
          <thead className='bg-gray-100'>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <Skeleton width={100} />
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <Skeleton width={100} />
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                <Skeleton width={100} />
              </th>
              {/* Agrega más columnas según sea necesario */}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => ( // Cambia el número 5 por la cantidad de filas que necesites
              <tr key={index} className="hover:bg-gray-50 transition-colors border-b">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <Skeleton height={30} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <Skeleton height={30} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <Skeleton height={30} />
                </td>
                {/* Agrega más celdas según sea necesario */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Loading;
