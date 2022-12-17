import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import {CgProfile} from "react-icons/cg";
import {BsSunFill} from "react-icons/bs";
import {BsMoonStarsFill} from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import Loader from "./Loader";

const Navbar = ({theme, setTheme}) => {

  const toggleTheme = () => {
    // console.log(theme)
    theme === "light" ? setMode("dark") : setMode("light");
  };

  const icon = theme === "light" ? <BsMoonStarsFill size={22} style={{color: 'var(--darkblue)'}} /> : <BsSunFill size={22} style={{color: 'var(--yellow)' }}/>


  //We use localStorage to persist between sessions in the browser. So, if a user has chosen the dark or light theme,
  // that’s what they’ll get upon their next visit to the app or if they reload the page. Hence, this function
  // sets our state and passes theme to localStorage.

  const setMode = mode => {
    window.localStorage.setItem('theme', mode)
    setTheme(mode)
};


useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme)
}, []);



  const time = new Date();
  const hours = time.getHours();
  // console.log(time);    // Wed Dec 14 2022 21:18:52 GMT-0500 (Eastern Standard Time)
  // console.log(hours);   // 21

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
           <NameLogo>My Online Library</NameLogo>
        </NavigationLink>
        <NavigationLink to='/about' >
        <Name>About</Name>
        </NavigationLink>
        <span>
          <Toggle onClick={toggleTheme}>
              {icon}
          </Toggle>
        </span>   
      </LeftSide>
        
      
        <RightSide>
           {isAuthenticated && (
            <>
              <NavigationLink to='/profile'>
                  <Hello>{(hours >= 18)
                        ? "Good Evening"
                        : (hours < 12)
                        ? "Good Morning"
                        : "Good Afternoon"}, {user.name} <CgProfile style={{color: props => props.theme.profileLogo,  verticalAlign: 'middle', }}/>
                  </Hello>
              </NavigationLink>
              <LogoutBtn onClick={() => navigate("/logout")}>Log out</LogoutBtn>
            </>
            )}
        </RightSide>
          {!isAuthenticated && <Login theme={theme}/> }
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
   background-color: ${props => props.theme.background};
`
const RightSide = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const LeftSide = styled.div`
  width: 320px;
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
`

const NameLogo = styled.p`
  color: ${props => props.theme.text};
  font-family: roboto, sans-serif;
  border-radius: 14px;
  margin-left: -20px;
  padding: 5px;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  cursor: pointer;
  transition: background-color 0.4s,
              opacity 0.5s;
  &:hover {
    background-color: ${props => props.theme.hover};
  }
  &:active {
    opacity: 0.3;
  }
`
const Name = styled.p`
  color: ${props => props.theme.text};
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
    background-color: ${props => props.theme.hover};
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
  color: ${props => props.theme.text};
  cursor: pointer;
  transition: background-color 0.4s,
              opacity 0.5s;
  &:hover {
    background-color:  ${props => props.theme.hover};
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
  color: ${props => props.theme.text};
  background-color: inherit;
  /* background-color: var(--background); */
  margin-left: 15px;
  cursor: pointer;
  transition: background-color 0.4s,
              opacity 0.5s;
  &:hover {
    background-color:  ${props => props.theme.hover};
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

const Toggle = styled.button`
  background-color: inherit;
  margin-left: 15px;
  border: none;
  cursor: pointer;
`;


export default Navbar