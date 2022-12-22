import Loader from "./Loader";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


const Logout = () => {
    const { isAuthenticated, isLoading, logout } = useAuth0();
    const navigateHome = useNavigate();

    // User confirms log off and it will log him off
    const handleYes = () => {
        logout({ returnTo: window.location.origin })
    }

    // User cancels the log off and it sends him back to the homepage
    const handleNo = () => {
        navigateHome("/");
    }

    // loading status to prevent false not logged in
    if (isLoading) {
        return (
            <Center><Loader/></Center> 
        )
    } 

    // if the user is logged in, it offers him options
     else {
        return (
            <Wrapper>
                <LogoutDiv>
                        <Question>Are you sure you want to leave this page?</Question>
                        <Buttons>
                            <Answer value="yes" onClick={handleYes} >Yes</Answer>
                            <Answer value="no" onClick={handleNo} >No</Answer>
                        </Buttons>
                </LogoutDiv>
                <Photo>
                     <img src={process.env.PUBLIC_URL + '/images/book-pen.jpg'} />
                </Photo>
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const LogoutDiv = styled.div`
    margin: auto;
    border-radius: 20px;
    margin-top: 180px;
    margin-bottom: 50px;
    background-color: var(--background);
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const Answer = styled.button`
    width: 75px;
    height: 40px;
    margin: 3px;
    background-color: var(--darkblue);
    border-radius: 6px;
    font-family: roboto;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
  transition: background-color 0.4s,
              opacity 0.5s;
  &:hover {
    background-color: var(--yellow);
    padding: 5px;
    border-radius: 14px;
    color: var(--darkblue);
    font-family: roboto;
    font-weight: 500;
    font-size: 20px;
  }
  &:active {
    opacity: 0.3;
  }
`

const Question = styled.p`
    padding: 10px;
    margin-bottom: 5px;
    font-family: roboto;
    font-size: 22px;
    color: var(--darkblue)
`

const Buttons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const Center = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`
const Photo = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: center;
  
  img {
    height: 500px;
  }
  
 
  @media (max-width: 500px) {
      img {
        height: 400px;
        border-radius: 10px;
      }
  }
  @media (min-width: 501px) {
    img {
      border-radius: 20px;
      }
  }
`

export default Logout;