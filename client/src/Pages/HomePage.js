import styled from "styled-components";
import Books from "../components/Books";
import SearchBar from "../components/SearchBar";
import ErrorPage from '../components/ErrorPage';
import { useContext } from 'react';
import { BooksContext } from "../components/BooksContext" ;

const HomePage = () => {
  
  const {status} = useContext(BooksContext)


  if (status==='error') {return <ErrorPage /> }
  return (
    <>
        
        <Container>
        <div>
          <div>HomePage</div>
          <SearchBar/>
        </div>
          <Books/>

   
        </Container>
    </>

 
  )
}

const Container = styled.div`
  background-image: url("/images/background21.jpg");
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  div {
    margin-right: 10px;
  }
`

export default HomePage