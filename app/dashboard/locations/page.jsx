import DataTable from "@/app/components/common/datatable/Datatable";

const LocationsPage = async () => {
  const res = await fetch(`${process.env.API_URL}/location-spots/`, {
    cache: 'no-store',  
  });

  const locationsSpots = await res.json();

  const columns = [
    { Header: 'Nombre', accessor: 'name' }
  ];

  return (
    <div className="container mx-auto p-4">
      <DataTable columns={columns} data={locationsSpots.results} addButtonLink={"/create"}/>
    </div>
  )
}

export default LocationsPage