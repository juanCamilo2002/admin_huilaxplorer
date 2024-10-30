import { Controller } from "react-hook-form";
import Select from "react-select";

const LocationsSelect = ({ control, locations, error }) => {
  const options = locations.map(location => ({
    value: location.name,
    label: location.name,
  }));

  return (
    <div className="mb-4">
      <label htmlFor="location" className="block text-sm font-medium text-gray-700">Ubicación</label>
      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            placeholder={"Selecciona una ubicación..."} 
            noOptionsMessage={() => "No hay opciones"} 
            options={options}
            isClearable
            className="mt-1"
            classNamePrefix="react-select" // Clase prefijo para aplicar estilos
            styles={{
              control: (provided, state) => ({
                ...provided,
                borderColor: error ? 'red' : state.isFocused ? 'green' : 'gray', // Verde cuando está enfocado, gris cuando no
                boxShadow: 'none', // Agrega el padding igual que en InputField
                borderRadius: '0.375rem', // Igual a rounded-md
                '&:hover': {
                  borderColor: state.isFocused ? 'green' : 'lightgray', // Elimina hover
                },
              }),
              option: (provided) => ({
                ...provided,
                backgroundColor: 'white', // Color de fondo normal
                color: 'black', // Color del texto
              }),
              // Elimina el efecto hover
              optionHover: () => ({
                backgroundColor: 'white', // Color de fondo sin cambio
                color: 'black', // Color del texto sin cambio
              }),
            }}
            onChange={(selectedOption) => {
              field.onChange(selectedOption ? selectedOption.value : ''); // Manejo correcto del valor
            }}
            value={options.find(option => option.value === field.value)} // Asegura que el valor seleccionado se muestre correctamente
          />
        )}
      />
      {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
  );
};

export default LocationsSelect;
