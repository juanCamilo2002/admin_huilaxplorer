import LoginDesktop from "../components/login/loginDesktop";
import LoginMobile from "../components/login/loginMobile";

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
      <LoginDesktop />
      <LoginMobile />
    </div>
  );
};

export default Login;
