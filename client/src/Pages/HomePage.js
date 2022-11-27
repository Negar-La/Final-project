import styled from "styled-components";
import { useContext } from "react";
import Books from "../components/Books";
import SearchBar from "../components/SearchBar";

const HomePage = () => {
  
  return (
    <Container>
      <div>
        <div>HomePage</div>
        <SearchBar/>
      </div>
          <Books/>

   
    </Container>
 
  )
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  div {
    margin-right: 10px;
  }
`

export default HomePage