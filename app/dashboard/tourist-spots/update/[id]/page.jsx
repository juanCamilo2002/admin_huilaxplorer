"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { schema } from "../../create/validationSchema";
import useCustomAxios from "@/app/services/CustomAxios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import InputField from "@/app/components/common/Forms/inputField";
import ActivitiesSelect from "@/app/components/common/Forms/ActivitiesSelect";
import LocationsSelect from "@/app/components/common/Forms/locationSelect";
import ImageUploader from "@/app/components/common/Forms/ImageUploader";
import EventManager from "@/app/components/tourist_spot/EventManager";

const UpdateTouristSpot = ({ params }) => {
  const touristSpotId = params.id;
  const { data: session } = useSession();
  const { request } = useCustomAxios();
  const router = useRouter();
  const [activities, setActivities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [initialData, setInitialData] = useState(null);
  const [deletedImages, setDeletedImages] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); // Estado de carga


  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });



  useEffect(() => {
    const loadActivities = async () => {
      try {
        const res = await request("get", "/activities-spots/?all=true");
        setActivities(res.results);
      } catch (error) {
        toast.error("Error fetching activities");
      }
    };

    const loadLocations = async () => {
      try {
        const res = await request("get", "/location-spots/?all=true");
        setLocations(res.results);
      } catch (error) {
        toast.error("Error fetching locations");
      }
    };

    const loadTouristSpotData = async () => {
      try {
        const res = await request("get", `/tourist-spots/${touristSpotId}/`);
       setInitialData(res);

        setImageFiles(res.images);
        setValue("name", res.name);
        setValue("description", res.description);
        setValue("latitude", res.latitude);
        setValue("longitude", res.longitude);
        setValue("location", res.location.name);
        setValue("activities", res.activities.map(activity => activity.name));
      } catch (error) {
        toast.error("Error fetching tourist spot data");
      }
    };

    loadActivities();
    loadLocations();
    loadTouristSpotData();
  }, [touristSpotId]);

  const uploadImages = async (touristSpotId) => {
    if (imageFiles.length === 0) {
      toast.info("No hay nuevas imágenes para subir.");
      return;
    }
  
    for (const [index, file] of imageFiles.entries()) {
      if (!(file instanceof File)) {
        continue;
      }
  
      const formData = new FormData();
      formData.append("image", file);
      formData.append("tourist_spot", touristSpotId);
      formData.append("caption", `Image ${index + 1}`);
  
      try {
        await request("post", "/tourist-spot-images/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
      } catch (error) {
        console.error("Upload error:", error.response);
        toast.error(`Error uploading image ${index + 1}: ${error.response?.data?.detail || error.message}`);
        // Opción: intentar nuevamente o continuar con el siguiente archivo
      }
    }
  
    toast.success("Images uploaded successfully");
  };
  

  const deleteImages = async () => {
    for (const image of deletedImages) {
      try {
        await request("delete", `/tourist-spot-images/${image.id}/`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });
      } catch (error) {
        toast.error(`Error deleting image ${image.id}`);
      }
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    const payload = {
      name: data.name,
      description: data.description,
      latitude: data.latitude,
      longitude: data.longitude,
      location: { name: data.location },
      activities: data.activities.map((activityName) => ({ name: activityName })),
    };
  
    try {
      // Enviar la solicitud para actualizar el lugar turístico
      await request("put", `/tourist-spots/${touristSpotId}/`, payload);
  
      // Eliminar imágenes si es necesario
      if (deletedImages.length > 0) {
        await deleteImages();
      }
  
      // Subir nuevas imágenes
      if (imageFiles.length > 0 && imageFiles.some(file => file instanceof File)) {
        await uploadImages(touristSpotId);
      } 
  
      toast.success("Tourist spot updated successfully");
      router.push("/dashboard/tourist-spots");
    } catch (error) {
      console.error("Update error:", error.response);
      toast.error(`Error updating tourist spot: ${error.response?.data?.detail || error.message}`);
    }
    finally {
      setIsLoading(false); // Desactiva el estado de carga al finalizar la solicitud
    }
  };
  
  
  
  

  if (!initialData) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-semibold mb-6">Actualizar Lugar Turístico</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <InputField
            label="Nombre"
            register={register("name", { required: "El nombre es obligatorio" })}
            error={errors.name}
            type="text"
          />
          <LocationsSelect control={control} locations={locations} error={errors.location} />
        </div>

        <InputField
          label="Descripción"
          register={register("description", { required: "La descripción es obligatoria" })}
          error={errors.description}
          type="textarea"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <InputField
            label="Latitud"
            register={register("latitude", { required: "La latitud es obligatoria" })}
            error={errors.latitude}
            type="text"
          />
          <InputField
            label="Longitud"
            register={register("longitude", { required: "La longitud es obligatoria" })}
            error={errors.longitude}
            type="text"
          />
        </div>

        <ActivitiesSelect control={control} activities={activities} error={errors.activities} />

        <ImageUploader 
          setImageFiles={setImageFiles} 
          initialImages={initialData.images} 
          setDeletedImages={setDeletedImages} // Se pasa para manejar imágenes eliminadas
        />

        <button
          type="submit"
          disabled={isLoading} // Desactiva el botón si isLoading es true
          className="w-full h-12 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded disabled:bg-gray-400"
        >
          {isLoading ? "Cargando..." : "Actualizar Lugar Turístico"}
        </button>
      </form>

      <EventManager touristSpotId={touristSpotId} />
    </div>
  );
};

export default UpdateTouristSpot;
