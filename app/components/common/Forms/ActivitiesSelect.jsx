import { Controller } from "react-hook-form";

const ActivitiesSelect = ({ control, activities, error }) => (
  <div className="mb-4">
    <label htmlFor="activities" className="block text-sm font-medium text-gray-700">Actividades</label>
    <Controller
      name="activities"
      control={control}
      render={({ field }) => (
        <select
          {...field}
          multiple
          id="activities"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 p-2"
          onChange={(e) => {
            const selectedOptions = Array.from(e.target.selectedOptions).map(
              (option) => option.value
            );
            field.onChange(selectedOptions);
          }}
        >
          {activities.map((activity) => (
            <option key={activity.id} value={activity.name}>
              {activity.name}
            </option>
          ))}
        </select>
      )}
    />
    {error && <p className="text-red-500 text-xs">{error.message}</p>}
  </div>
);

export default ActivitiesSelect;
