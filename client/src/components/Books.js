import { useContext } from "react";
import { BooksContext } from "./BooksContext";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Books = () => {

  const { books } = useContext(BooksContext);
  console.log(books)
  //when I use this line, the home page doesn't work in 'refresh' or after a new sign in.
  // const random = books.sort(() => 0.5 - Math.random()).slice(0,6)

  return (
    <>
      {!books ? 
      <h1>Loading...</h1>
      : (
        books.sort(() => 0.5 - Math.random()).slice(0,4).map((book)=>{
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