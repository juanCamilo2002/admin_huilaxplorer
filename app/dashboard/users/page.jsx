"use client";

import { useEffect, useState } from "react";
import DataTable from "@/app/components/common/datatable/Datatable";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import useCustomAxios from "@/app/services/CustomAxios";

const UsersPage = () => {
  const { request } = useCustomAxios();
  const [data, setData] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);

  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async (pageIndex, searchTerm) => {
    try {
      const res = await request(
        'get',
        `/users/accounts/?limit=${rowsPerPage}&offset=${pageIndex * rowsPerPage}&search=${searchTerm}`
      );
      setData(res.results);
      setTotalCount(res.count);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData(pageIndex, searchTerm);
  }, [pageIndex, rowsPerPage, searchTerm])


  const handleSearch = (term) => {
    setSearchTerm(term);
    setPageIndex(0);
  }

  const columns = [
    { Header: "Nombre", accessor: "first_name" },
    { Header: "Apellido", accessor: "last_name" },
    { Header: "Email", accessor: "email" },
    { Header: "Teléfono", accessor: "phone_number" },
    {
      Header: "Estado",
      accessor: "is_active",
      Cell: ({ value }) => (
        <span className="flex items-center">
          {value ? (
            <CheckIcon className="h-5 w-5 text-green-500" />
          ) : (
            <XMarkIcon className="h-5 w-5 text-red-500" />
          )}
          <span className="ml-2">{value ? "Activo" : "Inactivo"}</span>
        </span>
      ),
    },
    {
      Header: "Super Usuario",
      accessor: "is_superuser",
      Cell: ({ value }) => (
        <span className="flex items-center">
          {value ? (
            <CheckIcon className="h-5 w-5 text-blue-500" />
          ) : (
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          )}
          <span className="ml-2">{value ? "Sí" : "No"}</span>
        </span>
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
        addRoute={'/dashboard/tourist-spots/create'}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default UsersPage;
