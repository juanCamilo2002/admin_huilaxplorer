"use client";
import React, { useState } from 'react';
import { useTable, usePagination } from 'react-table';
import { useRouter } from 'next/navigation';
import Skeleton from 'react-loading-skeleton'; 
import 'react-loading-skeleton/dist/skeleton.css'; 

const DataTable = ({ data, columns, loading, totalCount, pageIndex, setPageIndex, rowsPerPage, setRowsPerPage, addRoute, onSearch }) => {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState(""); 

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageCount,
        previousPage,
        nextPage,
    } = useTable(
        {
            columns,
            data,
            manualPagination: true,
            pageCount: Math.ceil(totalCount / rowsPerPage),
            state: {
                pageIndex,
            },
        },
        usePagination
    );

    const handleSearch = (e) => {
        setSearchTerm(e.target.value); 
        onSearch(e.target.value); 
    };

    return (
        <div className='my-8'>
            <div className='bg-white shadow-lg p-2 rounded-lg my-6'>
                {/* Barra de búsqueda */}
                <div className="flex justify-between items-center mb-4 mt-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                        />
                    </div>
                    <button
                        onClick={() => router.push(addRoute)}
                        className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 transition"
                    >
                        Agregar Nuevo
                    </button>
                </div>

                {/* Tabla */}
                <div className="overflow-x-auto">
                    <table {...getTableProps()} className="min-w-full table-auto">
                        <thead className='bg-gray-100'>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()} className="border-b">
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()} className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            {column.render('Header')}
                                        </th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {loading ? (
                                <tr>
                                    <td colSpan={columns.length} className="border border-gray-300 p-2 text-center">
                                        <Skeleton count={5} height={30} />
                                    </td>
                                </tr>
                            ) : (
                                page.map(row => {
                                    prepareRow(row);
                                    return (
                                        <tr {...row.getRowProps()} className="hover:bg-gray-50 transition-colors border-b">
                                            {row.cells.map(cell => (
                                                <td {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                    {cell.render('Cell')}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Paginación */}
                <div className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-100 border-t">
                    <div className="flex items-center">
                        <button
                            onClick={() => {
                                previousPage();
                                setPageIndex(prev => Math.max(prev - 1, 0));
                            }}
                            disabled={!canPreviousPage}
                            className={`px-4 py-2 text-white ${canPreviousPage ? 'bg-primary-500 hover:bg-primary-600 transition' : 'bg-gray-300 cursor-not-allowed'} rounded`}
                        >
                            Anterior
                        </button>
                        <button
                            onClick={() => {
                                nextPage();
                                setPageIndex(prev => Math.min(prev + 1, pageCount - 1));
                            }}
                            disabled={!canNextPage}
                            className={`px-4 py-2 text-white ${canNextPage ? 'bg-primary-500 hover:bg-primary-600 transition' : 'bg-gray-300 cursor-not-allowed'} rounded ml-2`}
                        >
                            Siguiente
                        </button>
                    </div>
                    <span>
                        Página{' '}
                        <strong>
                            {pageIndex + 1} de {pageCount}
                        </strong>
                    </span>
                    <div className="mt-2 sm:mt-0">
                        <label htmlFor="rows-per-page" className="mr-2">Filas por página:</label>
                        <select
                            id="rows-per-page"
                            value={rowsPerPage}
                            onChange={(e) => {
                                setRowsPerPage(Number(e.target.value));
                                setPageIndex(0);
                            }}
                            className="border border-gray-300 rounded focus:ring-primary-600 focus:border-primary-600"
                        >
                            <option value={12}>12</option>
                            <option value={24}>24</option>
                            <option value={36}>36</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DataTable;
