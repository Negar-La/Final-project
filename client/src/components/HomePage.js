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
              <Photo>
              <img src={process.env.PUBLIC_URL + '/images/book-hand1.png'} />
            </Photo>
            </Left>
            <Right>
              <Choose>Choose a book <AiOutlineRead size={25} style={{marginTop: '10px'}}/> and <Bold>start reading</Bold>:</Choose>
              <BookWrapper>
                <Books/>
              </BookWrapper>
            </Right>
        </Container>
    </>
  )
}

const Container = styled.div`
/* Just set a relative position to your body element: Because so your .absolute element will be relative to it and not to the viewport. */
  position: relative;
  overflow-x: hidden;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  padding-top: 70px;
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
    
  }
  `
  const Left = styled.div`
  padding: 25px;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  @media (max-width: 500px) {
    margin-top: 1170px;
  }
  @media (min-width: 500.02px) and (max-width: 1200px) {
    margin-top: 280px;
  }
  `
  const Quote = styled.p`
  font-family: roboto;
  font-size:22px; 
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
@media (max-width: 500px) {
      margin: 0px 25px 0px 25px;
      font-size:20px; 
      white-space: pre-wrap;
        :before{
          visibility: hidden;
        }
  }
`

const SearchWrapper = styled.div`
 margin-top: 20px;
  `

  const Right = styled.div`
  padding-top: 20px;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
 
  @media (max-width: 500px) {
    padding: 25px;
    text-align: center;
    margin-top: 330px;
  }
  `
  const Choose = styled.p`
  font-size:20px; 
  font-weight:700;  
  letter-spacing:1px; 
  margin-bottom: 20px;
  line-height: 1.2;
  @media (max-width: 500px) {
      margin-top: 30px;
      white-space: pre-wrap;
  }
  `

const Photo = styled.div`
  margin-top: 100px;
  @media (max-width: 500px) {
      height: 10px;
      text-align: center;
      img {
        max-width: 100%;
        height: auto;
        margin-bottom: 10px;
        border-radius: 10px;
      }
  }
  @media (min-width: 500.02px) and (max-width: 1200px) {
    img {
      border-radius: 20px;
      margin-bottom: 10px;
      height: 400px;
      }
  }
  @media (min-width: 1200.02px)  {
    margin-top: 50px;
    img {
      border-radius: 20px;
      height: 490px;
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