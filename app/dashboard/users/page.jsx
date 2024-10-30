"use client";

import { useEffect, useState } from "react";
import DataTable from "@/app/components/common/datatable/Datatable";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import UserFormModal from "@/app/components/users/UserFormModal";
import Modal from "@/app/components/common/modal/Modal";
import { useSession } from "next-auth/react";
import useCustomAxios from "@/app/services/CustomAxios";

const UsersPage = () => {
  const { data: session, status } = useSession();
  const { request } = useCustomAxios();
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");


  const fetchData = async (pageIndex, searchTerm) => {
    setLoading(true);
    setErrorMessage(""); 
    try {
      if (status === "authenticated") {
        const res = await request('get', `/users/accounts/?limit=${rowsPerPage}&offset=${pageIndex * rowsPerPage}&search=${searchTerm}`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })
        setData(res.results);
        setTotalCount(res.count);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage("Error al cargar los usuarios. Inténtalo de nuevo."); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(pageIndex, searchTerm);
  }, [pageIndex, rowsPerPage, searchTerm, status]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPageIndex(0);
  };

  const handleCreate = () => {
    setSelectedUser(null); 
    setIsModalOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (selectedId) {
      try {
        await request('delete', `/users/accounts/${selectedId}/`);
        fetchData(pageIndex, searchTerm);
      } catch (error) {
        console.error("Error deleting user:", error);
        setErrorMessage("Error al eliminar el usuario. Inténtalo de nuevo."); // Mensaje de error
      } finally {
        setIsDeleteModalOpen(false);
      }
    }
  };

  const handleSubmit = async (userData) => {
    console.log(userData)
    try {
      if (selectedUser) {
        const {first_name, last_name, phone_number, email, is_staff} = userData;
         await request('put', `/users/accounts/${selectedUser.id}/`, {
          first_name,
          last_name,
          phone_number,
          email,
          is_staff,
         });
      
      } else {
        await request('post', `/users/actions/create-admin/`, userData);
      }
      fetchData(pageIndex, searchTerm);
      setIsModalOpen(false); 
    } catch (error) {
      console.error("Error al guardar usuario:", error);
      setErrorMessage("Error al guardar el usuario. Inténtalo de nuevo."); 
    }
  };

  const columns = [
    { Header: "Nombre", accessor: "first_name" },
    { Header: "Apellido", accessor: "last_name" },
    { Header: "Correo", accessor: "email" },
    { Header: "Teléfono", accessor: "phone_number" },
    {
      Header: "Activo",
      accessor: "is_active",
      Cell: ({ value }) =>
        value ? (
          <CheckIcon className="h-6 w-6 text-green-500" />
        ) : (
          <XMarkIcon className="h-6 w-6 text-red-500" />
        ),
    },
    {
      Header: "Superusuario",
      accessor: "is_staff",
      Cell: ({ value }) =>
        value ? (
          <CheckIcon className="h-6 w-6 text-green-500" />
        ) : (
          <XMarkIcon className="h-6 w-6 text-red-500" />
        ),
    },
    {
      Header: "Acciones",
      accessor: "id",
      Cell: ({ value }) => (
        <div className="flex">
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => {
              setSelectedId(value);
              handleEdit(data.find((user) => user.id === value));
            }}
          >
            Editar
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
            onClick={() => {
              setSelectedId(value);
              setIsDeleteModalOpen(true);
            }}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {errorMessage && (
        <div className="bg-red-500 text-white p-2 rounded mb-4">
          {errorMessage}
        </div>
      )}
      <DataTable
        columns={columns}
        data={data}
        totalCount={totalCount}
        loading={loading}
        pageIndex={pageIndex}
        rowsPerPage={rowsPerPage}
        setPageIndex={setPageIndex}
        setRowsPerPage={setRowsPerPage}
        handleCreate={handleCreate}
        onSearch={handleSearch}
      />

      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedUser}
      />

      <Modal
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        message="¿Estás seguro de que quieres eliminar este usuario?"
        title="Confirmar eliminación"
      />
    </div>
  );
};

export default UsersPage;
