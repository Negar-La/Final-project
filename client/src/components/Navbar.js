import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import {CgProfile} from "react-icons/cg";
import { NavLink } from "react-router-dom";


const Navbar = () => {

  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <Container>
        <NavigationLink to='/' end>
           <span>Title - Logo</span>
        </NavigationLink>
      
        <RightSide>
           {isAuthenticated && (
            <>
              <Hello>Hello, {user.name}</Hello>
              <NavigationLink to='/profile'>
              <CgProfile style={{color: "yellow",  verticalAlign: 'middle'}}/>
              </NavigationLink>
              <LogoutBtn onClick={() => navigate("/logout")}>Log out</LogoutBtn>
            </>
            )}
        </RightSide>
          {!isAuthenticated && <Login/> }
        

    </Container>
    
  )
}

const Container = styled.div`
  background-color: gray;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const RightSide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NavigationLink = styled(NavLink)`
  /* default styles here */
  text-decoration: none;
  text-align: center;
  color: pink;

  &.active {
    color: white;
    text-decoration: none;
    /* background-color: hsl(0deg, 0%, 80%); */
    border-radius: 15px;
  }
`;

const Hello = styled.span`
  color: orange;
  margin-right: 10px;
`

const LogoutBtn = styled.button`
  padding: 6px 10px;
  border-radius: 14px;
  border: none;
  background-color: white;
  margin-left: 15px;
  cursor: pointer;
  transition: background-color 0.5s,
              opacity 0.5s;
  &:hover {
    background-color: yellow;
  }
  &:active {
    opacity: 0.3;
  }
`

export default Navbar