import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {

  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>

      {!isAuthenticated &&
      <button onClick={() => loginWithRedirect()}>Log In</button>
      }

    </div>
    
  )
}

export default Login