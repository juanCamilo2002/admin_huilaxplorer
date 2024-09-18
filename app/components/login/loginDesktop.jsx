import FormLogin from "./formLogin";

const LoginDesktop = () => {
  return (
    <>
      {/* Tarjeta visible solo en pantallas de escritorio */}
      <div className="hidden md:flex md:min-h-full md:w-full md:max-w-md md:flex-col md:justify-center md:border md:rounded-lg md:shadow-lg md:bg-white md:p-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           Bienvenido
          </h2>
          <p className="text-center text-sm text-gray-400">Ingresa tus datos e inicia sesion</p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <FormLogin />
        </div>
      </div>
    </>
  )
}

export default LoginDesktop;