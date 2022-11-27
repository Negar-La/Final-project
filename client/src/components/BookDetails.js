import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BookDetails = () => {

  const [book, setBook] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { bookId } = useParams();
  console.log(bookId)

  const handleClick = () => {
    console.log("hi")
    window.open(book.previewLink);
  };

  useEffect(() => {
    fetch(`/api/get-book/${bookId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setBook(data.data);
          console.log(data.data)
        } else {
          setNotFound(true);
        }
      });
  }, [bookId]);

  if (notFound) {
    return (
      <ErrorMsg>"No book found with that ID."</ErrorMsg>
    );
  } else {

    return (
      <>
       {book &&
        <Container>
          <ItemImage src={book.image} />
          <div>
            <div>Title: {book.title}</div>
            <div>Author: {book.author}</div>
            <div>Publisher: {book.publisher}</div>
            <div>Category: {book.categories}</div>
            <div>Pages: {book.pageCount}</div>
            <div>Description: {book.description}</div>
            <button onClick={ handleClick}>Click here to preview</button>
          </div>
       
        </Container>
      }
      </>  
      
    )
  }
}

const Container = styled.div`
  display: flex;
`

const ItemImage = styled.img`
  margin-left: 1em;
  padding: 1em;
  width: 300px;
  box-shadow: rgba(16, 55, 120, 0.3) 0px 1px 2px 0px,
    rgba(21, 31, 48, 0.15) 0px 1px 3px 1px;
  border-radius: 10px;
`;

const ErrorMsg = styled.div`
    font-family: "Arimo", sans-serif;
    font-weight: bold;
    margin-top: 40px;
    font-size: 22px;
    text-align: center;

`
export default BookDetails