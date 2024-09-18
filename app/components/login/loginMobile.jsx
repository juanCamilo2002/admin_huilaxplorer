import FormLogin from "./formLogin"

const LoginMobile = () => {
  return (
    <>
      {/* Versión para pantallas móviles */}
      <div className="flex md:hidden w-full flex-col justify-center px-6 py-12">
        <img
          alt="Your Company"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Iniciar Sesion
        </h2>
        <p className="text-center text-sm text-gray-400 ">Ingresa tus datos e inicia sesion</p>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
         <FormLogin />
        </div>
      </div>
    </>
  )
}

export default LoginMobile