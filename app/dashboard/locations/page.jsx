"use client";
import DataTable from "@/app/components/common/datatable/Datatable";
import useCustomAxios from "@/app/services/CustomAxios";
import { useEffect, useState } from "react";

const LocationsPage = () => {
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
        `/location-spots/?limit=${rowsPerPage}&offset=${pageIndex * rowsPerPage}&search=${searchTerm}`
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
    { Header: 'Nombre', accessor: 'name' }
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
  )
}

export default LocationsPage