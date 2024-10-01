"use client";
import DataTable from "@/app/components/common/datatable/Datatable";
import Modal from "@/app/components/common/modal/Modal";
import LocationForm from "@/app/components/locations/LocationsForm";
import useCustomAxios from "@/app/services/CustomAxios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const LocationsPage = () => {
  const { request } = useCustomAxios();
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchData = async (pageIndex, searchTerm) => {
    try {
      const res = await request(
        'get',
        `/location-spots/?limit=${rowsPerPage}&offset=${pageIndex * rowsPerPage}&search=${searchTerm}`
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

  const handleCreateOrUpdate = async (locationData) => {
    try {
      if (selectedLocation) {
        await request('put', `/location-spots/${selectedLocation.id}/`, locationData);
        toast.success('Ubicación actualizada correctamente');
      } else {
        await request('post', `/location-spots/`, locationData);
        toast.success('Ubicación creada correctamente');
      }
      fetchData(pageIndex, searchTerm);
      setIsFormOpen(false);
      setSelectedLocation(null);
    } catch (error) {
      toast.error('Error al guardar la ubicación');
    }
  };

  const handleDelete = async () => {
    try {
      await request('delete', `/location-spots/${selectedId}/`);
      fetchData(pageIndex, searchTerm);
      setIsModalOpen(false);
      toast.success('Ubicación eliminada correctamente');
    } catch (error) {
      toast.error('Error al eliminar la ubicación');
    }
  };

  const handleCreate = () => {
    setIsFormOpen(true);
    setSelectedLocation(null);
  }
  const columns = [
    { Header: 'Nombre', accessor: 'name' },
    {
      Header: 'Acciones',
      accessor: 'id',
      Cell: ({ value }) => (
        <div className='flex'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => {
              setSelectedLocation(data.find(loc => loc.id === value));
              setIsFormOpen(true);
            }}
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
          
        </div>
      )
    }
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
        onSearch={handleSearch}
      />
      <LocationForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleCreateOrUpdate}
        initialData={selectedLocation}
      />
      <Modal
        isOpen={isModalOpen}
        title="Eliminar Ubicación"
        message="¿Estás seguro de que deseas eliminar esta ubicación?"
        onConfirm={handleDelete}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default LocationsPage;
