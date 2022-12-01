import { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


export const BooksContext = createContext(null);

const BooksProvider = ({ children }) => {
  // SET UP STATE FOR ALL BOOKS
  const [books, setBooks] = useState(null);
  const [favoriteBook, setFavoriteBook] = useState(null)

  const { bookId } = useParams();

  const { user, isAuthenticated, isLoading } = useAuth0();

  // FETCH ALL BOOKS
  useEffect(() => {
    fetch("/api/get-books")
      .then((res) => res.json())
      .then((data) =>{
        // console.log(data.data) 
        // console.log("hi")  
        setBooks(data.data)
      });
  }, []);

  const addToFavoriteHandler = (e, book) => {
    e.preventDefault();

    fetch(`/api/add-favorite`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user.name, 
        userPicture: user.picture,
        title: book.title,
        id: book.id,
        author: book.author,
        imageSrc: book.image,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setFavoriteBook(data.data)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <BooksContext.Provider value={{ books, setBooks, addToFavoriteHandler, setFavoriteBook, favoriteBook}}>
      {children}
    </BooksContext.Provider>
  );
};

export default BooksProvider;
