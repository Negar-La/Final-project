import styled from "styled-components";
import Books from "./Books";
import SearchBar from "./SearchBar";
import ErrorPage from './ErrorPage';
import { useContext } from 'react';
import { BooksContext } from "./BooksContext" ;
import {AiOutlineRead} from "react-icons/ai"

const HomePage = () => {
  
  const {status} = useContext(BooksContext)


  if (status==='error') {return <ErrorPage /> }
  return (
    <>
        
        <Container>
       
            <Left>
              <Quote>A book is a Gift you open again and again</Quote>
              <SearchWrapper>
                  <SearchBar/>
              </SearchWrapper>
            </Left>
            <Choose>Choose a book <AiOutlineRead size={25} style={{marginTop: '10px'}}/> and start reading:</Choose>
            <BookWrapper>
              <Books/>
            </BookWrapper>
            <BookWrapper2>
              <Books/>
            </BookWrapper2>
    
         
        </Container>
    </>

 
  )
}
const Choose = styled.p`
  font-family: roboto;
  font-size:24px; 
  font-weight:700;  
  letter-spacing:1px; 
  position: fixed;
  right: 196px;
  `

const Container = styled.div`
  background: url("/images/book-hand.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
  display: flex;
  padding-top: 130px;
  padding-left: 20px;
  `

const BookWrapper = styled.div`
  position: fixed;
  right: 50px;
  top: 200px;
  display: flex;
  flex-basis: 25%;
  flex-wrap: wrap;
  height: 200px;
  `
  const BookWrapper2 = styled.div`
  position: fixed;
  right: 50px;
  top: 500px;
  display: flex;
  flex-basis: 25%;
  flex-wrap: wrap;
  height: 200px;
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
    :after {
    background-color: var(--purple);
    content: '';
    display: block;
    position:absolute; 
    right:0;
    margin-top: 4px;
    height: 5px;
    width: 68px;
    margin-bottom: 0.25em;
}
    :before {
    background-color: var(--purple);
    content: '';
    display: block;
    height: 5px;
    width: 81px;
    margin-bottom: 5px;
}`

const Left = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: start;
   align-items: center;
   height: 200px;
   margin-top: 200px;
  `

const SearchWrapper = styled.div`
 margin-top: 20px;
 padding: 5px;
  `
export default HomePage