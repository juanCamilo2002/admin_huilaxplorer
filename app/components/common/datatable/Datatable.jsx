"use client";

import React from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from '@heroicons/react/20/solid';
import Link from 'next/link'; // Importa Link

const GlobalFilter = ({ globalFilter, setGlobalFilter, addButtonLink }) => {
  return (
    <div className="my-4 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-between items-center">
      {/* Input de búsqueda */}
      <input
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value || undefined)}
        placeholder="Buscar..."
        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-600 w-full sm:w-1/2 lg:w-1/3"
      />
      
      {/* Botón de agregar */}
      <Link href={addButtonLink} className="w-full sm:w-auto bg-gradient-to-tr  from-primary-600 to-primary-400 text-white rounded-md flex items-center justify-center space-x-2 px-4 py-2">
          <PlusIcon className="h-5 w-5" />
          <span>Agregar</span>
      </Link>
    </div>
  );
};

const DataTable = ({ columns, data, addButtonLink }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );

  return (
    <div className="my-8">
      <div className="bg-white shadow-lg p-2 rounded-lg my-6">
        <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} addButtonLink={addButtonLink} />

        <div className="overflow-x-auto">
          <table {...getTableProps()} className="min-w-full table-auto">
            <thead className="bg-gray-100">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} className="border-b">
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="hover:bg-gray-50 transition-colors border-b"
                  >
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-100 border-t">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <span className="text-sm text-gray-700">Mostrar</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="bg-white border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            >
              {[5, 10, 20, 50].map((pageSizeOption) => (
                <option key={pageSizeOption} value={pageSizeOption}>
                  {pageSizeOption}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-700">registros por página</span>
          </div>

          <div className="flex space-x-2 items-center justify-end">
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className={`${canPreviousPage
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-200 cursor-not-allowed text-gray-500'
                } px-4 py-2 rounded-md flex items-center`}
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <span className="text-sm text-gray-700">
              Página <strong>{pageIndex + 1}</strong> de {pageOptions.length}
            </span>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className={`${canNextPage
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-200 cursor-not-allowed text-gray-500'
                } px-4 py-2 rounded-md flex items-center`}
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
