import { Controller } from "react-hook-form";

const LocationsSelect = ({ control, locations, error }) => (
  <div className="mb-4">
    <label htmlFor="location" className="block text-sm font-medium text-gray-700">Ubicación</label>
    <Controller
      name="location"
      control={control}
      render={({ field }) => (
        <select
          {...field}
          id="location"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-2"
        >
          <option value="">Seleccionar una ubicación</option>
          {locations.map((location) => (
            <option key={location.id} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>
      )}
    />
    {error && <p className="text-red-500 text-xs">{error.message}</p>}
  </div>
);

export default LocationsSelect;
