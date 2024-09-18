import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup
        .string()
        .email('Correo electrónico inválido')
        .required('Correo electrónico requerido'),
    password: Yup
        .string()
        .required('Contraseña requerida')
})