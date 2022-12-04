import { useContext, useEffect } from "react";
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
    <>
      {!books ? 
      <h1>Loading...</h1>
      : (
        books.sort(() => 0.5 - Math.random()).slice(0,4).map((book)=>{
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
    </>
  )
}

const Wrapper = styled.div`
  margin-left: 10px;
  border: 3px solid var(--darkblue);
  border-radius: 6px;
  height: 203px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  img {
    height: 196px;
    width: 129px;
    flex-basis: 25%
  }
  &:hover {
    box-shadow: rgba(0, 0, 204, 0.3) 0px 2px 3px 1px,
      rgba(0, 0, 204, 0.15) 0px 1px 3px 1px;
  }
`

export default Books