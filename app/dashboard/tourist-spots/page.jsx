import DataTable from '@/app/components/common/datatable/Datatable';


const TouristSpotsPage = async () => {
  const res = await fetch(`${process.env.API_URL}/tourist-spots/`, {
    cache: 'no-store',
  });
  const touristisSpots = await res.json();
  
  const columns = [
    { Header: 'Nombre', accessor: 'name' },
    { Header: 'Latitud', accessor: 'latitude' },
    { Header: 'Longitud', accessor: 'longitude' },
    { Header: 'Ciudad', accessor: 'location.name' },
  ];

  return (
    <div className="container mx-auto p-4">
      <DataTable columns={columns} data={touristisSpots.results} addButtonLink={"/create"}/>
    </div>
  );
}

export default TouristSpotsPage