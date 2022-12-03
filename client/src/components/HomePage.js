import styled from "styled-components";
import Books from "./Books";
import SearchBar from "./SearchBar";
import ErrorPage from './ErrorPage';
import { useContext } from 'react';
import { BooksContext } from "./BooksContext" ;

const HomePage = () => {
  
  const {status} = useContext(BooksContext)


  if (status==='error') {return <ErrorPage /> }
  return (
    <>
        
        <Container>
       
            <Left>
              <Quote>A book is a gift you open again and again</Quote>
            
              <SearchWrapper>
                  <SearchBar/>
              </SearchWrapper>
            </Left>
            <BookWrapper>
              <Books/>
            </BookWrapper>
    
         
        </Container>
    </>

 
  )
}

const Container = styled.div`
  background-image: url("/images/book-hand.jpg");
  height: 100vh;
  width: 100vw;
  display: flex;
  padding-top: 100px;
  padding-left: 100px;
  border: 2px solid brown;
  `

const All = styled.div`
  
`
const BookWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 200px;
  border: 1px solid red;
  margin-left: 100px;
  `

const Quote = styled.p`
  padding-top: 10px;
  padding-left: 20px;
  font-family: roboto;
  font-size:26px; 
  font-weight:700;  
  letter-spacing:1px; 
  width:540px; 
  white-space:nowrap;
  padding-bottom:13px;
  position: relative;
  border: 1px solid green;
    :after {
    background-color: var(--darkblue);
    content: '';
    display: block;
    position:absolute; 
    right:0;
    bottom:0;
    height: 3px;
    width: 75px;
    margin-bottom: 0.25em;
}
    :before {
    background-color: var(--darkblue);
    content: '';
    display: block;
    height: 3px;
    width: 75px;
    margin-bottom: 5px;
}`

const Left = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: start;
   align-items: center;
   height: 200px;
  border: 1px solid yellow;
  `

const SearchWrapper = styled.div`
 margin-top: 20px;
 padding: 5px;

  border: 1px solid black;
  `
export default HomePage