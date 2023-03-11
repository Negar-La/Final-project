import { useContext } from "react";
import { BooksContext } from "./BooksContext";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Books = () => {

  const { books } = useContext(BooksContext);

  // console.log(books)
  //when I use this line, the home page doesn't work in 'refresh' or after a new sign in.
  //I deleted <React.StrictMode> from index.js and solved!
  // StrictMode renders components twice (on dev but not production) in order to detect 
  //any problems with your code and warn you about them (which can be quite useful).
  // const random = books.sort(() => 0.5 - Math.random()).slice(0,6)

  return (
    <Div>
      {!books ? 
      <h1>Loading...</h1>
      : (
        books.sort(() => 0.5 - Math.random()).slice(0,12).map((book)=>{
          // console.log(book)
          return (
            <Link to={`/books/${book.id}`} key={book.id} >
                <Wrapper >
                    <img src={book.image} />
                    <Layer>
                            <h3 style={{color: "white"}}>{book.title}</h3>
                            <Description style={{color: "white"}}>
                            {book.author}
                            </Description>
                    </Layer>
                </Wrapper>
            </Link>
           
          )
        })
      )
      }
    </Div>
  )
}

const Layer = styled.div`
    position: absolute;
    width: 100%;
    height: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.7), #363537);
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 5px;
    text-align: center;
    transition: height 0.8s;
    h3{
      margin-top: -65px;
    }
    div {
        font-size: 0.8rem;
        line-height: 0.6;
    }
`;


const Div = styled.div`
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(4, 1fr);
  padding: 10px;
  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 500.02px) and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);

  }
`

const Wrapper = styled.div`
    width: 90%;
    position: relative;
    overflow: hidden;
    &:hover img {
        transform: scale(1.3);
    }
    &:hover div {
        height: 100%;
    }
    @media screen and (max-width: 500px) {
        margin-bottom: 6%;
        width: 80%;
    }
  margin-left: 15px;
  margin-bottom: 15px;
  border: 2px solid var(--darkblue);
  border-radius: 6px;
  height: 203px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  img {
    height: 196px;
    width: 129px;
  }
  &:hover {
    box-shadow: rgba(255, 201, 113, 0.8) -3px 2px 4px 3px,
      rgba(255, 201, 113, 0.8) 0px 1px 3px 1px;
  }
`
const Description = styled.p`
    font-size: 14px;
    margin: 20px 0;
    font-weight: 500;
    @media screen and (max-width: 1250px) {
        font-size: 12px;
    }  
    @media screen and (max-width: 900px) {
        font-size: 14px;
    } 
    @media screen and (max-width: 600px) {
        font-size: 11px;
    }   
    @media screen and (max-width: 500px) {
        font-size: 12px;
    } 
`;
export default Books