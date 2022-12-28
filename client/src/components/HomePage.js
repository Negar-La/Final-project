import styled from "styled-components";
import Books from "./Books";
import SearchBar from "./SearchBar";
import ErrorPage from './ErrorPage';
import { useContext } from 'react';
import { BooksContext } from "./BooksContext" ;
import {AiOutlineRead} from "react-icons/ai";


const HomePage = ({theme}) => {
  
  const {status} = useContext(BooksContext)


  if (status==='error') {return <ErrorPage /> }
  return (
    <>    
        <Container>
            <Left>
              <Quote>A book is a <Bold>Gift</Bold> you open again and again</Quote>
              <SearchWrapper>
                  <SearchBar/>
              </SearchWrapper>
            </Left>
            <Right>
              <Choose>Choose a book <AiOutlineRead size={25} style={{marginTop: '10px'}}/> and <Bold>start reading</Bold>:</Choose>
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
  overflow-x: hidden;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  padding-top: 130px;
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    padding-top: 360px;
  }
  @media (min-width: 500.02px) and (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    padding-top: 660px;
  }
  @media (min-width: 1200.02px)  {
    justify-content: start;
  }
  `
  const Left = styled.div`
  padding: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 200px;
  @media (max-width: 500px) {
    margin-top: 870px;
    /* padding: 15px; */
  }
  @media (min-width: 500.02px) and (max-width: 1200px) {
    margin-top: 450px;
  }
  `
  const Quote = styled.p`
    @media (max-width: 500px) {
      font-size:20px; 
      white-space: pre-wrap;
        :before{
          visibility: hidden;
        }

  }
  font-family: roboto;
  font-size:26px; 
  font-weight:700;
  line-height: 1.2;
  padding-bottom:13px;
    :before {
    background-color: var(--purple);
    content: '';
    display: block;
    height: 5px;
    width: 81px;
    margin-bottom: 5px;
}
`

const SearchWrapper = styled.div`
 margin-top: 20px;
  `

  const Right = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 
  @media (max-width: 500px) {
    padding: 25px;
    text-align: center;
  }
  `
  const Choose = styled.p`
  font-size:24px; 
  font-weight:700;  
  letter-spacing:1px; 
  margin-bottom: 20px;
  line-height: 1.2;
  @media (max-width: 500px) {
      margin-top: 30px;
      font-size:20px; 
      white-space: pre-wrap;
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
const Bold = styled.span`
font-weight: 600;
color: ${props => props.theme.Bold};
`

export default HomePage