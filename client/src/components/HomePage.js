import styled from "styled-components";
import Books from "./Books";
import SearchBar from "./SearchBar";
import ErrorPage from './ErrorPage';
import { useContext } from 'react';
import { BooksContext } from "./BooksContext" ;
import {AiOutlineRead} from "react-icons/ai";


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
            <Photo>
              <img src={process.env.PUBLIC_URL + '/images/book-hand1.png'} />
            </Photo>
        </Container>
    </>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  padding-top: 130px;
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
  }
  @media (min-width: 500.02px) and (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
  }
  @media (min-width: 1200.02px)  {
    justify-content: start;
  }
  `
  const Left = styled.div`
  display: flex;
  /* flex: 1; */
  flex-direction: column;
  align-items: center;
  margin-top: 200px;
  @media (max-width: 500px) {
    margin-top: 170px;
    margin-left: 70px;
  }
  @media (min-width: 500.02px) and (max-width: 1200px) {
    margin-top: 850px;
  }
  `
  const Quote = styled.p`
    @media (max-width: 500px) {
      font-size:20px; 
  }
  padding-top: 10px;
  padding-left: 20px;
  font-family: roboto;
  font-size:26px; 
  font-weight:700;  
  letter-spacing:1px; 
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
  flex: 1;
  flex-direction: column;
  align-items: center;
  @media (max-width: 500px) {
    flex-direction: column;
    text-align: center;
    margin-left: 80px;
  }
  `
  const Choose = styled.p`
  font-size:24px; 
  font-weight:700;  
  letter-spacing:1px; 
  margin-bottom: 20px;
  @media (max-width: 500px) {
      margin-top: 30px;
  }
  @media (min-width: 500.02px)  {
    margin-top: 40px;
  }
  `

const Photo = styled.div`
  margin-top: 100px;
  flex: 1;
  
 
  @media (max-width: 500px) {
      height: 10px;
      text-align: center;
      img {
        height: 400px;
        margin-left: 70px;
        margin-bottom: 50px;
        border-radius: 10px;
      }
  }
  @media (min-width: 501px) {
    img {
      border-radius: 20px;
      }
  }
`

const BookWrapper = styled.div`
  `


export default HomePage