import SessionAuthProvider from "./SessionAuthProvider";

const Providers = ({children}) => {
  return (
    <SessionAuthProvider>
        {children}
    </SessionAuthProvider>
  )
}

export default Providers;