import styled from "styled-components";
import { lightTheme } from "./Theme"; // Adjust the import path as needed

const Modal = ({ onClose, message, theme }) => {
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()} theme={theme}>
        <p>{message}</p>
        <CloseButton onClick={onClose}>Close</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: ${(props) => {
    //console.log(props.theme.body); // Add the console.log statement here
    return props.theme.body;
  }};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  color: ${(props) =>
    props.theme.body === lightTheme.body
      ? "black"
      : "white"}; // Set text color based on theme
`;

const CloseButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
`;

export default Modal;
