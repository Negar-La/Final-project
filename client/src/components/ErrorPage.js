import styled from "styled-components";
import {FaBomb} from "react-icons/fa";

 const ErrorPage = () => {
  return (
    <ErrorDiv>
      <ErrorIcon>
        <FaBomb />
      </ErrorIcon>
      <h3>An unknown error has occurred</h3>
      <p>Please try refreshing the page, or contact support if the problem persists.</p>
    </ErrorDiv>
  );
};

const ErrorDiv = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 30px;
`;

const ErrorIcon = styled.span`

`;

export default ErrorPage;
