import DataTable from "@/app/components/common/datatable/Datatable";


const ActivitiesPage = async () => {
  const res = await fetch(`${process.env.API_URL}/activities-spots/`, {
    cache: 'no-store',
  });
  const activitiesSpots = await res.json();

  const columns = [
    { Header: 'Nombre', accessor: 'name' },
    { Header: 'Description', accessor: 'description' },
  ];
  return (
    <div className="container mx-auto p-4">
      <DataTable columns={columns} data={activitiesSpots.results} addButtonLink={"/create"}/>
    </div>
  )
}

export default ActivitiesPage