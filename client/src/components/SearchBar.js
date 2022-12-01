import { useState } from "react";
import { useContext } from "react";
import { BooksContext } from "./BooksContext";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SearchResults from "./SearchResults";
import SearchAuthor from "./SearchAuthor";

const SearchBar = () => {

  const navigate = useNavigate();

  const { books } = useContext(BooksContext);
  const [filteredData, setFilteredData] = useState('');
  const [userQuery, setUserQuery] = useState("");

  const [isToggled, setIsToggled] = useState(false);


  //This handler tracks what user types in input and checks if a book's title includes that word.
  const handleFilter = (event) => {
    const itemSearched = event.target.value;
    setUserQuery(itemSearched);
    const newFilter = books.filter((item) => {
      if (userQuery.length > 0 && isToggled === true && item.author.toLowerCase().includes(itemSearched.toLowerCase())) {
        return true;
      } else
      if (userQuery.length > 0 && item.title.toLowerCase().includes(itemSearched.toLowerCase()) ) {
         return true;
        } else {
        return false;
      }
    });
//Only when set FilteredData to newFilter that user has typed something in input.
    itemSearched === "" ? setFilteredData('') : setFilteredData(newFilter);
  };

  return (
    <Container>
    <InputWrapper>
      <StyledInput
        type="text"
        placeholder="Search here"
        onChange={handleFilter}
        value={userQuery}
      />

      <SearchIcon className="search-icon"
       onClick={() => {
                       userQuery &&
                       navigate(`/search/${userQuery}`)
                       setFilteredData('');
                       setUserQuery("");
                       <SearchResults/>
                     }}>
          <BsSearch/>     
      </SearchIcon>
      <AuthorBtn 
         onClick={() => {
          userQuery && isToggled &&
          setIsToggled(true)
          navigate(`/searchByAuthor/${userQuery}`)
          setFilteredData('');
          setUserQuery("");
          <SearchAuthor/>
        }}
      >Author</AuthorBtn>
    </InputWrapper>
    {filteredData.length  !== 0 && 
      <ResultWrapper>
          {
    //we decide to show maximum 6 results per search.        
                      filteredData.slice(0, 6).map((item) => {
                        const authorName = item.author;
                        const suggestionIndex = item.title.toLowerCase().indexOf(userQuery.toLowerCase())-userQuery.length
                        return (
   //selecting a search results redirects to itemDetails page and also cleans up the input and search results.
                          <StyledLink to={`/books/${item.id}`} key={item.id}
                                      onClick={() => {
                                      setFilteredData('');
                                      setUserQuery("");
                                     }}>
                      {item.title.toLowerCase().includes(userQuery.toLowerCase()) ? 
                      <>
                        <span>
                          {item.title.slice(0, suggestionIndex + userQuery.length)} 
                          <Prediction>{item.title.slice(suggestionIndex + userQuery.length)}
                            <ItalicIn> by </ItalicIn>
                            <CategoryName>{authorName}</CategoryName>
                          </Prediction>
                        </span>
                      </>
                      : item.title}
                          </StyledLink>
                        );
                      })
                    }
      </ResultWrapper>
    }
  </Container>
  );
};
const StyledInput = styled.input`
  border-radius: 15px;
`;
const StyledLink = styled(Link)`
  width: 470px;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  text-decoration: none;
  border-radius: 4px;
  color: black;
  &:hover {
    background-color: lightyellow;
  }
`;
const SearchIcon = styled.div`
 
`;
const Container = styled.div``;

const InputWrapper = styled.div`
  margin-top: 10px;
  display: flex;

  .search-icon {
    margin-left: -25px;
    cursor: pointer;
    align-items: center;
    padding: 3px;
    border: 1px solid black;
    border-radius: 50%;
  }
`;

const AuthorBtn = styled.button`
  border: none;
  border-radius: 15px;
`

const ResultWrapper = styled.div`
  position: absolute;
  margin-top: 1px;
  width: 470px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  z-index: 5;
  border-radius: 4px;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ItalicIn = styled.span`
  font-style: italic;
  font-weight: 100;
  font-size: 14px;
`;

const CategoryName = styled.span`
color: purple;
font-style: italic;
font-size: 14px;
`;

const Prediction = styled.span`
  font-weight: bold;
`;

export default SearchBar;