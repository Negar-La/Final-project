import { createContext, useState, useEffect } from "react";

export const BooksContext = createContext(null);

const BooksProvider = ({ children }) => {
  // SET UP STATE FOR ALL BOOKS
  const [books, setBooks] = useState(null);

  // FETCH ALL BOOKS

  useEffect(() => {
    fetch("/api/get-books")
      .then((res) => res.json())
      .then((data) =>{
        console.log(data.data)   
        setBooks(data.data)
      });
  }, []);

  return (
    <BooksContext.Provider value={{ books, setBooks }}>
      {children}
    </BooksContext.Provider>
  );
};

export default BooksProvider;
