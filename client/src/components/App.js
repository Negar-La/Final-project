import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import HomePage from "../Pages/HomePage";
import Navbar from "./Navbar";
import Logout from "./Logout";
import Profile from "./Profile";
import SearchResults from "./SearchResults";
import BookDetails from "./BookDetails" ;
import NewComment from "./NewComment";

const App = ()=> {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/search/:searchTerm" element={<SearchResults />}/>
        <Route path="/books/:bookId" element={<BookDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
