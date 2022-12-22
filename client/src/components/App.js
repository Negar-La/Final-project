import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import HomePage from "./HomePage";
import Navbar from "./Navbar";
import Logout from "./Logout";
import Profile from "./Profile";
import SearchResults from "./SearchResults";
import BookDetails from "./BookDetails" ;
import SearchAuthor from "./SearchAuthor";
import SearchCategory from "./SearchCategory";
import About from "./About";
import { useContext } from 'react';
import { BooksContext } from "./BooksContext" ;
import { useState } from "react";
import styled from "styled-components";
import ErrorPage from './ErrorPage';
import Loader from "./Loader";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./Theme";
import Menu from "./Menu";


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
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/about" element={<About />} />
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
