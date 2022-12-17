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
            <Right>
              <Choose>Choose a book <AiOutlineRead size={25} style={{marginTop: '10px'}}/> and start reading:</Choose>
              <BookWrapper>
                <Books/>
              </BookWrapper>
            </Right>

        </Container>
    </>
  )
}

const Container = styled.div`
  /* background: url("/images/book-hand.jpg"); */
  /* background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */
  height: 100vh;
  width: 100vw;
  display: flex;
  padding-top: 130px;
  padding-left: 20px;
  `
  const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 200px;
  margin-top: 200px;
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

const SearchWrapper = styled.div`
 margin-top: 20px;
 padding: 5px;
  `

  const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 50px;
  `
  const Choose = styled.p`
  font-size:24px; 
  font-weight:700;  
  letter-spacing:1px; 
  margin-bottom: 20px;
  `

const BookWrapper = styled.div`

  @media (max-width: 750px) {
    
  }
  `


export default HomePage