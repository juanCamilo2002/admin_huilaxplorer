"use client";
import { useState, useEffect } from 'react';
import DataTable from '@/app/components/common/datatable/Datatable';
import useCustomAxios from '@/app/services/CustomAxios';
import ActivityFormModal from '@/app/components/activities/ActivityModal';
import Modal from '@/app/components/common/modal/Modal';
import DescriptionCell from '@/app/components/common/datatable/DescriptionCell';
import { toast } from 'react-toastify';

const ActivitiesPage = () => {
  const { request } = useCustomAxios();
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState('');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchData = async (pageIndex, searchTerm) => {
    setLoading(true);
    try {
      const res = await request(
        'get',
        `/activities-spots/?limit=${rowsPerPage}&offset=${pageIndex * rowsPerPage}&search=${searchTerm}`
      );
      setData(res.results);
      setTotalCount(res.count);
    } catch (error) {
      toast.error('Error obteniendo datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pageIndex, searchTerm);
  }, [pageIndex, rowsPerPage, searchTerm]);

  const handleEdit = (activity) => {
    setSelectedActivity(activity);
    setIsEditModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedActivity(null);
    setIsCreateModalOpen(true);
  };

  const handleDelete = (id) => {
    setSelectedId(id);
    setIsDeleteModalOpen(true);
  };

  const handleSubmit = async (data) => {
    try {
      if (selectedActivity) {
        await request('put', `/activities-spots/${selectedActivity.id}/`, data);
        toast.success('Actividad actualizada correctamente');
      } else {
        await request('post', '/activities-spots/', data);
        toast.success('Actividad creada correctamente');
      }
      await fetchData(pageIndex, searchTerm); 
      closeModals(); 
    } catch (error) {
      toast.error('Error enviando datos');
    }
  };

  const closeModals = () => {
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setIsDeleteModalOpen(false);
  };

  const onDelete = async () => {
    try {
      await request('delete', `/activities-spots/${selectedId}/`);
      toast.success('Actividad eliminada correctamente');
      fetchData(pageIndex, searchTerm);
      closeModals();
    } catch (error) {
      toast.error('Error eliminando actividad');
    }
  }

  const columns = [
    { Header: 'Nombre', accessor: 'name' },
    {
      Header: 'Descripción',
      accessor: 'description',
      Cell: ({ value }) => <DescriptionCell value={value} />,
    },
    {
      Header: 'Acciones',
      accessor: 'id',
      Cell: ({ value }) => (
        <div className="flex">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => handleEdit(data.find((activity) => activity.id === value))}
          >
            Editar
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => handleDelete(value)}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

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
        handleCreate={handleCreate}
        onSearch={setSearchTerm}
      />

      <ActivityFormModal
        isOpen={isCreateModalOpen || isEditModalOpen}
        closeModal={closeModals}
        onSubmit={handleSubmit}
        initialData={selectedActivity}
      />

      <Modal
        isOpen={isDeleteModalOpen}
        title="Confirmar eliminación"
        message="¿Estás seguro de que deseas eliminar esta actividad?"
        onCancel={closeModals}
        onConfirm={onDelete}
      />
    </div>
  );
};

export default ActivitiesPage;

