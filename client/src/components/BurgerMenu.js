import { GiHamburgerMenu } from "react-icons/gi";
import styled from "styled-components";
import { useContext } from "react";
import { MenuContext } from "./MenuContext";


 const BurgerMenu = ({theme}) => {

    const { openMenu, setOpenMenu } = useContext(MenuContext);

    const handleClick = ()=>{
        // console.log('hi');
        setOpenMenu(!openMenu)
    }

  return (
    <HamburgerButton onClick={handleClick}>
      <GiHamburgerMenu style={{color: theme === 'light' ? "var(--darkblue)" : 'white'}} />
    </HamburgerButton>
  );
};

const HamburgerButton = styled.button`
  background: transparent;
  position: absolute;
  visibility: hidden;
  font-size: 2.3rem;
  border: none;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  &:focus {
    outline: none;
  }
  @media (max-width: 600px) {
    visibility: visible;
    right: 2rem;
  }
`;

export default BurgerMenu