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
            </Wrapper>
        )
    }
}

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 300px);
  background-image: url("/images/books.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`

const LogoutDiv = styled.div`
    margin: auto;
    border-radius: 6px;
    margin-top: 300px;
    background-color: #fffcf2;
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

const ErrorMessage = styled.div`
    padding: 10px;
    background-color: rgba(138, 19, 11, 0.9);
    color: white;
    text-align: center;
    margin: 3px;
`
const Center = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export default Logout;