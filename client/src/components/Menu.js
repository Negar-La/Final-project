import { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import Login from "./Login";
import { MenuContext } from "./MenuContext";


const Menu = () => {

  const { isAuthenticated } = useAuth0();
  const { openMenu, setOpenMenu } = useContext(MenuContext);

  return (
    <Wrapper open={openMenu}>
        <Link to="/about" onClick={() => setOpenMenu(!openMenu)}>
        About
      </Link>
      {isAuthenticated &&
      <>
        <Link to="/profile" onClick={() => setOpenMenu(!openMenu)}>
            Profile
        </Link>
        <Link to="/logout" onClick={() => setOpenMenu(!openMenu)}>
             Log out
        </Link>
      </>
      }
       {!isAuthenticated && 
       <Link>
       <Login onClick={() => setOpenMenu(!openMenu)} /> 
       </Link>    
       }    
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #ede7e3;
  visibility: hidden;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 70px;
  right: 0px;
  height: 20%;
  width: 40%;
  border-radius: 5px;
  @media (max-width: 500px) {
    visibility: ${(props) => (props.open ? "visible" : "hidden")};
  }
`;

const Link = styled(NavLink)`
   color: var(--darkblue);
  text-decoration: none;
  margin-top: 30px;
  font-size: 1.2rem;
  font-weight: 600;
`;


export default Menu;