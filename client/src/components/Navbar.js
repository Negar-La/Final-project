import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import {CgProfile} from "react-icons/cg";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import Loader from "./Loader";
import { ThemeContext } from "./ThemeContext"
import { useContext } from "react";


const Navbar = () => {

  const {toggleTheme, theme} = useContext(ThemeContext)

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
           <Name>My Online Library</Name>
        </NavigationLink>
        <Button onClick={toggleTheme}
            style={{backgroundColor: theme==='dark' ? "purple" : "lightgrey"}}
        >
            <Ball 
                style={{left: theme==='dark' ? "20px" : "-5px" }}
            />
        </Button>
      </LeftSide>
        
      
        <RightSide>
           {isAuthenticated && (
            <>
              <NavigationLink to='/profile'>
                  <Hello>Hello, {user.name} <CgProfile style={{color: 'var(--darkblue)',  verticalAlign: 'middle', }}/>
                  </Hello>
              </NavigationLink>
     
              <NavigationLink to='/profile'>
                  
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
  width: 100vw;
  padding: 10px 15px;
  position: fixed;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
   background-color: var(--background);
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
`

const NavigationLink = styled(NavLink)`
  text-decoration: none;
  text-align: center;
  &.active {
    text-decoration: none;
    border-radius: 15px;
  }
`;

const Logo = styled.img`
  width: 50px;
  margin-left: 10px;
`
const Name = styled.p`
  margin-left: 5px;
  color: var(--darkblue);
  background-color: var(--background);
  font-family: roboto, sans-serif;
  border-radius: 14px;
  padding: 5px;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  cursor: pointer;
  transition: background-color 0.4s,
              opacity 0.5s;
  &:hover {
    background-color: var(--yellow);
    padding: 5px;
    border-radius: 14px;
  }
  &:active {
    opacity: 0.3;
  }
`

const Hello = styled.span`
  margin-right: 3px;
  border-radius: 14px;
  padding: 5px;
  font-weight: 600;
  font-size: 17px;
  color: var(--darkblue);
  background-color: var(--background);
  cursor: pointer;
  transition: background-color 0.4s,
              opacity 0.5s;
  &:hover {
    background-color: var(--yellow);
    padding: 5px;
    border-radius: 14px;
  }
  &:active {
    opacity: 0.3;
  }
`

const LogoutBtn = styled.button`
  padding: 6px 10px;
  font-weight: 600;
  font-size: 17px;
  border-radius: 14px;
  border: none;
  color: var(--darkblue);
  background-color: var(--background);
  margin-left: 15px;
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
const Button= styled.button`
    width: 50px;
    border-radius: 20px;
    border: 3px solid lightgray;
    transition: ease-in 0.2s;
    margin-left: 15px;
`;

const Ball= styled.div`
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: ease-in 0.2s;
    position: relative;
`;
export default Navbar