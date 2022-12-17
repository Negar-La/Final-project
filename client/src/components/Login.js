import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./Loader";
import styled from "styled-components"

const Login = ({theme}) => {

  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

    if (isLoading) {
    return <Center><Loader/></Center> ;
  }

  return (
    <div>

      {!isAuthenticated &&
      <LoginBtn onClick={() => loginWithRedirect()}>Log In</LoginBtn>
      }

    </div>
    
  )
}

const LoginBtn = styled.button`
  padding: 6px 10px;
  font-weight: 600;
  font-size: 17px;
  border-radius: 14px;
  border: none;
  color: ${props => props.theme.text};
  background-color: inherit;
  /* background-color: var(--background); */
  margin-left: 15px;
  margin-right: 15px;
  cursor: pointer;
  transition: background-color 0.4s,
              opacity 0.5s;
  &:hover {
    background-color: var(--yellow);
  }
  &:active {
    opacity: 0.3;
  }
`

const Center = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
export default Login