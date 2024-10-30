import { Controller } from "react-hook-form";
import Select from "react-select";

const ActivitiesSelect = ({ control, activities, error }) => {
  const options = activities.map(activity => ({
    value: activity.name,
    label: activity.name,
  }));

  return (
    <div className="mb-4">
      <label htmlFor="activities" className="block text-sm font-medium text-gray-700">Actividades</label>
      <Controller
        name="activities"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            placeholder={"Selecciona las actividades..."} 
            noOptionsMessage={() => "No hay opciones"} 
            options={options}
            isMulti 
            className="mt-1"
            classNamePrefix="react-select" 
            styles={{
              control: (provided, state) => ({
                ...provided,
                borderColor: error ? 'red' : state.isFocused ? 'green' : 'gray', 
                boxShadow: 'none', 
                borderRadius: '0.375rem',
                '&:hover': {
                  borderColor: state.isFocused ? 'green' : 'lightgray', 
                },
              }),
              multiValue: (provided) => ({
                ...provided,
                backgroundColor: 'lightgray', 
              }),
              multiValueLabel: (provided) => ({
                ...provided,
                color: 'black',
              }),
              multiValueRemove: (provided) => ({
                ...provided,
                color: 'black',
                ':hover': {
                  backgroundColor: 'red', // Color de fondo al eliminar
                  color: 'white',
                },
              }),
              option: (provided) => ({
                ...provided,
                backgroundColor: 'white', // Color de fondo normal
                color: 'black', // Color del texto
              }),
            }}
            onChange={(selectedOptions) => {
              const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
              field.onChange(values); // Manejo correcto del valor
            }}
            value={options.filter(option => field.value.includes(option.value))} // Asegura que los valores seleccionados se muestren correctamente
          />
        )}
      />
      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  );
};

export default ActivitiesSelect;
