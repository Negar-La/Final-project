import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import Logout from "./Logout";
import Profile from "./Profile";
import SearchResults from "./SearchResults";
import BookDetails from "./BookDetails" ;
import SearchAuthor from "./SearchAuthor";
import { useContext } from 'react';
import { BooksContext } from "./BooksContext" ;
import { ThemeContext } from "./ThemeContext";
import styled from "styled-components";
import ErrorPage from './ErrorPage';
import Loader from "./Loader";
import './darkMode.css';


const App = ()=> {

  const {status} = useContext(BooksContext)
  const {theme} = useContext(ThemeContext)

  return (
    <BrowserRouter>
      <GlobalStyles />
      <div className={`App ${theme}`}>
      <Navbar />
          { status==="error" ?
                <ErrorPage/> :
                status === "loading" ?
            <Center><Loader/></Center>    : 
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/search/:searchTerm" element={<SearchResults />}/>
            <Route path="/searchByAuthor/:searchTerm" element={<SearchAuthor />}/>
            <Route path="/books/:bookId" element={<BookDetails />} />
          </Routes>
          }
      </div>
         
    </BrowserRouter>
  );
}

const Center = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export default App;
