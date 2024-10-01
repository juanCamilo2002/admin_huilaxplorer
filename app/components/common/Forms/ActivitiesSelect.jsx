import { Controller } from "react-hook-form";

const ActivitiesSelect = ({ control, activities, error }) => (
  <div className="mb-4">
    <label htmlFor="activities" className="block mb-1">Actividades</label>
    <Controller
      name="activities"
      control={control}
      render={({ field }) => (
        <select
          {...field}
          multiple
          className="w-full border p-2 rounded focus:ring-primary-600 focus:border-primary-600"
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
    {error && <p className="text-red-500 text-[11px]">{error.message}</p>}
  </div>
);

export default ActivitiesSelect;
