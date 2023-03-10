import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import HomePage from "../pages/HomePage";
import About from "../pages/About";
import BookDetails from "../pages/BookDetails" ;
import Logout from "../pages/Logout";
import Profile from "../pages/Profile";
import ErrorPage from '../pages/ErrorPage';
import Navbar from "./Navbar";
import SearchResults from "../pages/SearchResults";
import SearchAuthor from "../pages/SearchAuthor";
import SearchCategory from "../pages/SearchCategory";
import { useContext } from 'react';
import { BooksContext } from "./BooksContext" ;
import { useState } from "react";
import Loader from "./Loader";
import Menu from "./Menu";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./Theme";



const App = ()=> {

  const {status} = useContext(BooksContext)
  const [theme, setTheme] = useState('light');
 

  return (
    <BrowserRouter>
     <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <GlobalStyles />
        <Navbar  theme={theme} setTheme={setTheme}/>
            { status==="error" ?
                  <ErrorPage/> :
                  status === "loading" ?
              <Center><Loader/></Center>    : 
            <Routes>
              <Route path="/" element={<HomePage theme={theme}/>} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/about" element={<About theme={theme}/>} />
              <Route path="/search/:searchTerm" element={<SearchResults />}/>
              <Route path="/searchByAuthor/:searchTerm" element={<SearchAuthor />}/>
              <Route path="/searchByCategory/:category" element={<SearchCategory />}/>
              <Route path="/books/:bookId" element={<BookDetails />} />
            </Routes>
            }
            <Menu  theme={theme}/>
     </ThemeProvider>
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
