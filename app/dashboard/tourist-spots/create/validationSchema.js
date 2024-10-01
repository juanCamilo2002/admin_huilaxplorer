import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().required("El nombre es un campo obligatorio"),
  description: yup.string().required("La descripción es un campo obligatorio"),
  latitude: yup
    .number("La latitud debe ser un número")
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .required("La latitud es un campo obligatorio")
    .min(-90, "La latitud debe estar entre -90 y 90")
    .max(90, "La latitud debe estar entre -90 y 90"),
  longitude: yup
    .number("La longitud debe ser un número")
    .transform((value, originalValue) => (originalValue === "" ? undefined : value))
    .required("La longitud es un campo obligatorio")
    .min(-180, "La longitud debe estar entre -180 y 180")
    .max(180, "La longitud debe estar entre -180 y 180"),
  location: yup.string().required("La ubicación es un campo obligatorio"),
  activities: yup.array()
    .of(yup.string())
    .required("Las actividades son un campo obligatorio")
    .min(1, "Se requiere al menos una actividad"), // Ensure at least one activity is selected
});