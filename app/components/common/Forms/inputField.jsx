const InputField = ({ label, register, error, type, id }) => (
    <div className="mb-4">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label>
        {type === "textarea" ? (
            <textarea 
                id={id} 
                {...register} 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2"
            />
        ) : (
            <input 
                id={id} 
                {...register} 
                type={type} 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm p-2"
            />
        )}
        {error && <p className="text-red-500 text-xs">{error.message}</p>}
    </div>
);

export default InputField;
