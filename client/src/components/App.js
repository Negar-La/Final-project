import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import Logout from "./Logout";
import Profile from "./Profile";
import SearchResults from "./SearchResults";
import BookDetails from "./BookDetails" ;
import SearchAuthor from "./SearchAuthor";
import About from "./About";
import { useContext } from 'react';
import { BooksContext } from "./BooksContext" ;
import styled from "styled-components";
import ErrorPage from './ErrorPage';
import Loader from "./Loader";


const App = ()=> {

  const {status} = useContext(BooksContext)

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Navbar />
          { status==="error" ?
                <ErrorPage/> :
                status === "loading" ?
            <Center><Loader/></Center>    : 
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/about" element={<About />} />
            <Route path="/search/:searchTerm" element={<SearchResults />}/>
            <Route path="/searchByAuthor/:searchTerm" element={<SearchAuthor />}/>
            <Route path="/books/:bookId" element={<BookDetails />} />
          </Routes>
          }
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
