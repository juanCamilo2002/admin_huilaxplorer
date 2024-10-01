import { useState, useEffect } from "react";

const ImageUploader = ({ setImageFiles, initialImages, setDeletedImages }) => {
  const [existingImages, setExistingImages] = useState(initialImages || []);
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    setExistingImages(initialImages || []);
  }, [initialImages]);

  const handleImageChange = (event) => {
  const files = Array.from(event.target.files);
  if (files.length > 0) {
    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setNewImages((prevImages) => [...prevImages, ...imagePreviews]);
    setImageFiles((prevFiles) => [...prevFiles, ...files]); // Asegúrate de que se asignen solo archivos
  }
};

  const handleRemoveExistingImage = (index, event) => {
    event.preventDefault();
    const removedImage = existingImages[index];
    setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setDeletedImages((prev) => [...prev, removedImage]); // Añadir imagen eliminada al estado
  };

  const handleRemoveNewImage = (index, event) => {
    event.preventDefault();
    setNewImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-4">
      <label htmlFor="images" className="block mb-1">Imágenes</label>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div
          className="flex items-center justify-center border border-dashed border-gray-400 h-32 rounded cursor-pointer"
          onClick={() => document.getElementById('image-upload').click()}
        >
          <span className="text-gray-400">Subir Imágenes</span>
        </div>

        {existingImages.map((image, index) => (
          <div key={index} className="relative">
            <img src={image.image} alt={`Existing Image ${index}`} className="object-cover w-full h-32 rounded" />
            <button
              onClick={(e) => handleRemoveExistingImage(index, e)}
              type="button"
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              &times;
            </button>
          </div>
        ))}

        {newImages.map((image, index) => (
          <div key={index} className="relative">
            <img src={image} alt={`New Image ${index}`} className="object-cover w-full h-32 rounded" />
            <button
              onClick={(e) => handleRemoveNewImage(index, e)}
              type="button"
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
