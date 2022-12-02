import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./Loader";
import styled from "styled-components"

const Login = () => {

  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    if (isLoading) {
    return <Center><Loader/></Center> ;
  }

  return (
    <div>

      {!isAuthenticated &&
      <button onClick={() => loginWithRedirect()}>Log In</button>
      }

    </div>
    
  )
}


const Center = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
export default Login