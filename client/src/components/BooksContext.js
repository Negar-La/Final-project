import { createContext, useState, useEffect } from "react";

export const BooksContext = createContext(null);

const BooksProvider = ({ children }) => {
  // SET UP STATE FOR ALL BOOKS
  const [books, setBooks] = useState(null);

  const [status, setStatus] = useState("loading");

  const [categories, setCategories] = useState(null)

  const URL = process.env.NODE_ENV !== 'development' ? process.env.REACT_APP_SERVER_URL : "";
  // FETCH ALL BOOKS
  useEffect(() => {
    fetch(`${URL}/api/get-books`)
      .then((res) => res.json())
      .then((data) =>{
        // console.log(data.data) 
        // console.log("hi")  
        setBooks(data.data)
        setStatus("idle");
      })
      .catch ((error)=>{
        console.log(error);
        setStatus("error");
       })
  }, []);


  useEffect(() => {
    fetch(`${URL}/api/get-categories`)
      .then((res) => res.json())
      .then((data) => {
          setCategories(data.data);
          // console.log(data.data)
      })
      .catch ((error)=>{
        console.log(error);
        setStatus("error");
       })
  }, []);

  return (
    <BooksContext.Provider value={{ books, setBooks, status, setStatus, categories, setCategories, URL }}>
      {children}
    </BooksContext.Provider>
  );
};

export default BooksProvider;
