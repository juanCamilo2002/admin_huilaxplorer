import React from 'react'

const Skeleton = () => {
  return (
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
  )
}

export default Skeleton