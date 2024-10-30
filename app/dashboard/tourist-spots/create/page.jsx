"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { schema } from "./validationSchema";
import useCustomAxios from "@/app/services/CustomAxios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import ActivitiesSelect from "@/app/components/common/Forms/ActivitiesSelect";
import ImageUploader from "@/app/components/common/Forms/ImageUploader";
import LocationsSelect from "@/app/components/common/Forms/locationSelect";
import InputField from "@/app/components/common/Forms/inputField";


const CreateTouristSpot = () => {
  const { data: session } = useSession();
  const { request } = useCustomAxios();
  const router = useRouter();
  const [activities, setActivities] = useState([]);
  const [locations, setLocations] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      activities: [],
      location: "",
    },
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

    loadActivities();
    loadLocations();
  }, []);

  const uploadImages = async (touristSpotId) => {
    for (const [index, file] of imageFiles.entries()) {
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
        toast.error(`Error subiendo la imagen ${index + 1}`);
        throw error;
      }
    }
    toast.success("Imágenes subidas correctamente");
  };

  const onSubmit = async (data) => {
    const payload = {
      name: data.name,
      description: data.description,
      latitude: data.latitude,
      longitude: data.longitude,
      location: { name: data.location },
      activities: data.activities.map((activityName) => ({ name: activityName })),
    };

    try {
      const response = await request("post", "/tourist-spots/", payload);
      const touristSpotId = response.id;

      if (imageFiles.length > 0) {
        await uploadImages(touristSpotId);
      }

      toast.success("Lugar turístico creado!");
      router.push("/dashboard/tourist-spots");
    } catch (error) {
      toast.error("Error creando lugar turístico");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl font-semibold mb-6">Crear Lugar Turístico</h2>

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

        <ImageUploader setImageFiles={setImageFiles} />

        <button type="submit" className="w-full h-12 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded">
          Crear Lugar Turístico
        </button>
      </form>
    </div>
  );
};



export default CreateTouristSpot;
