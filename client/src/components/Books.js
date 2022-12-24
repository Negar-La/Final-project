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
        books.sort(() => 0.5 - Math.random()).slice(0,9).map((book)=>{
          // console.log(book)
          return (
            <Link to={`/books/${book.id}`} key={book.id} >
                <Wrapper >
                    <img src={book.image} />
                </Wrapper>
            </Link>
           
          )
        })
      )
      }
    </Div>
  )
}
const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-basis: 50%;
  width: 485px;
  padding: 10px;

`

const Wrapper = styled.div`
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

export default Books