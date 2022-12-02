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

    // if the user is not logged in, it will prevent him from logging off
    } else if (!isAuthenticated) {
        return (
            <Wrapper>
                <LogoutDiv>
                    <ErrorMessage>You not signed in and therefore cannot sign off. <a href="/" style={{color: "white"}} >Return to the homepage.</a></ErrorMessage>
                </LogoutDiv>
            </Wrapper>
        )

    // if the user is logged in, it offers him options
    } else {
        return (
            <Wrapper>
                <LogoutDiv>
                        <Question>Do you want to log out?</Question>
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
    background-color: #d9e4fd;
`

const LogoutDiv = styled.div`
    margin: auto;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const Answer = styled.button`
    width: 75px;
    height: 40px;
    margin: 3px;
    background-color: #151f30;
    border: none;
    color: white;
    font-size: 20px;
`

const Question = styled.p`
    padding: 10px;
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