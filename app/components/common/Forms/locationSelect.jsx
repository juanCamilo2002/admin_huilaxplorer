import { Controller } from "react-hook-form";

const LocationsSelect = ({ control, locations, error }) => (
  <div>
    <label htmlFor="location" className="block mb-1">Ubicación</label>
    <Controller
      name="location"
      control={control}
      render={({ field }) => (
        <select {...field} className="w-full border p-2 rounded focus:ring-primary-600 focus:border-primary-600">
          <option value="">Seleccionar una ubicación</option>
          {locations.map((location) => (
            <option key={location.id} value={location.name}>
              {location.name}
            </option>
          ))}
        </select>
      )}
    />
    {error && <p className="text-red-500 text-[11px]">{error.message}</p>}
  </div>
);

export default LocationsSelect;
