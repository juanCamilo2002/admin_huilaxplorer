const InputField = ({ label, register, error, type }) => (
    <div className="mb-4">
        <label className="block mb-1">{label}</label>
        {type === "textarea" ? (
            <textarea {...register} className="w-full border p-2 rounded focus:ring-primary-600 focus:border-primary-600 " />
        ) : (
            <input {...register} type={type} className="w-full border p-2 rounded focus:ring-primary-600 focus:border-primary-600" />
        )}
        {error && <p className="text-red-500 text-[11px]">{error.message}</p>}
    </div>
);

export default InputField;