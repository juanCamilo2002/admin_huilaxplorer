"use client";
import React, { useEffect, useState } from 'react';
import useCustomAxios from '@/app/services/CustomAxios';
import DataTable from '@/app/components/common/datatable/Datatable';
import DescriptionCell from '@/app/components/common/datatable/DescriptionCell';
import Modal from '@/app/components/common/modal/Modal';
import { useRouter } from 'next/navigation';

const TouristSpotsPage = () => {
    const router = useRouter();
    const { request } = useCustomAxios();
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [pageIndex, setPageIndex] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(12);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(null);

    const fetchData = async (pageIndex, searchTerm) => {
        setLoading(true);
        try {
            const res = await request(
                'get',
                `/tourist-spots/?limit=${rowsPerPage}&offset=${pageIndex * rowsPerPage}&search=${searchTerm}`
            );
            setData(res.results);
            setTotalCount(res.count);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(pageIndex, searchTerm);
    }, [pageIndex, rowsPerPage, searchTerm]);

    const handleSearch = (term) => {
        setSearchTerm(term);
        setPageIndex(0);
    };

    const handleDelete = async () => {
        try {
            await request('delete', `/tourist-spots/${selectedId}/`);
            setIsModalOpen(false);
            fetchData(pageIndex, searchTerm);
        } catch (error) {
            console.error('Error deleting tourist spot:', error);
        }
    }

    const columns = React.useMemo(() => [
        {
            Header: 'Nombre',
            accessor: 'name',
        },
        {
            Header: 'Descripción',
            accessor: 'description',
            Cell: ({ value }) => (<DescriptionCell value={value} />),
        },


        {
            Header: 'Latitud',
            accessor: 'latitude',
        },
        {
            Header: 'Longitud',
            accessor: 'longitude',
        },
        {
            Header: 'Ciudad',
            accessor: 'location.name'
        },
        {
            Header: 'Acciones',
            accessor: 'id',
            Cell: ({ value }) => (
                <div className='flex '>
                    <button
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                        onClick={() => router.push(`/dashboard/tourist-spots/update/${value}`)}
                    >
                        Editar
                    </button>
                    <button
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2'
                        onClick={() => {
                            setSelectedId(value);
                            setIsModalOpen(true);

                        }}
                    >
                        Eliminar
                    </button>
                    <button
                        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
                        onClick={() => router.push(`/dashboard/tourist-spots/${value}`)}
                    >
                        Ver
                    </button>
                </div>
            )
        }
    ], []);

    return (
        <div className="container mx-auto p-4">
            <DataTable
                data={data}
                columns={columns}
                loading={loading}
                totalCount={totalCount}
                pageIndex={pageIndex}
                setPageIndex={setPageIndex}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                addRoute={'/dashboard/tourist-spots/create'}
                onSearch={handleSearch}
            />
            <Modal
                isOpen={isModalOpen}
                title="Confirmar eliminación"
                message="¿Estás seguro de que deseas eliminar este lugar turístico?"
                onConfirm={handleDelete}
                onCancel={() => setIsModalOpen(false)}
            />
        </div>
    );
};




export default TouristSpotsPage;
