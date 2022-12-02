import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import {CgProfile} from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import Loader from "./Loader";


const Navbar = () => {

  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0();
  // console.log(user)

  useEffect(() => {
    if (isAuthenticated) {
      // console.log("try to fetch in Navbar")
      fetch("/api/person", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          user,
        })
      })
        .then(res=>res.json())
        .then((data)=>{
        // console.log(data)
        })
    }
  }, [isAuthenticated]);


  if (isLoading) {
    return      <Center><Loader/></Center>  ;
  }

  return (
    <Container>
      <LeftSide>
        <NavigationLink to='/' end>
           <Logo src={process.env.PUBLIC_URL + '/images/logo.png'}/>
        </NavigationLink>
        <NavigationLink to='/' end>
           <Name>Name</Name>
        </NavigationLink>
      </LeftSide>
        
      
        <RightSide>
           {isAuthenticated && (
            <>
              <NavigationLink to='/profile'>
                  <Hello>Hello, {user.name}</Hello>
              </NavigationLink>
     
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
  background-color: lightgray;
  width: 100vw;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid red;
`
const RightSide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const LeftSide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
`

const NavigationLink = styled(NavLink)`
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

const Logo = styled.img`
    width: 50px;
    margin-left: 10px;
`
const Name = styled.div`
  margin-left: 5px;
`

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
const Center = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
export default Navbar