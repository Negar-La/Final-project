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
  /* display: flex;
  flex-direction: column;
  flex-wrap: wrap; */
`

export default Books