"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DataTable from "@/app/components/common/datatable/Datatable";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

const UsersPage = () => {
  const { data: session, status } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      setError("No estás autenticado.");
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/accounts/`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Error al obtener los usuarios.");
        }

        const data = await res.json();
        setUsers(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [session, status]);

  console.log(users)

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

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {users.length > 0 ? (
        <DataTable columns={columns} data={users} addButtonLink={"/create"}/>
      ) : (
        <p>No se encontraron usuarios.</p>
      )}
    </div>
  );
};

export default UsersPage;
