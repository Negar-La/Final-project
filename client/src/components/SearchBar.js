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
        placeholder="Enter"
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
          <BsSearch size={19} style={{color: "white", marginTop: '3px'}}
                    onMouseOver={({target})=>target.style.color="blue"}
                    onMouseOut={({target})=>target.style.color="white"}
                 />     
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
                            <AuthorName>{authorName}</AuthorName>
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
  width: 300px;
  height: 32px;
  padding-left: 10px;
  border: none;
  margin-right: 15px;
  background-color: var(--background);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;
const StyledLink = styled(Link)`
  width: 300px;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  padding-right: 5px;
  text-decoration: none;
  border-radius: 4px;
  color: var(--darkblue);
  &:hover {
    background-color: var(--hoveryellow);
  }
`;
const SearchIcon = styled.div`
`;
const Container = styled.div`
   
`;

const InputWrapper = styled.div`
  margin-top: 10px;
  display: flex;

  .search-icon {
    margin-left: -48px;
    cursor: pointer;
    align-items: center;
    background-color: var(--darkblue);
    padding: 4px 8px;
    border-radius: 45%;
    margin-right: 10px;
    transition: background-color 0.3s,
                opacity 0.3s;
  &:hover {
    background-color: var(--yellow);
    
  }
  &:active {
    opacity: 0.3;
  }
  }
`;

const AuthorBtn = styled.button`
  border: none;
  font-size: 15px;
  border-radius: 15px;
  background-color: var(--background);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  cursor: pointer;
  transition: background-color 0.3s,
              opacity 0.3s;
  &:hover {
    background-color: var(--yellow);
  }
  &:active {
    opacity: 0.3;
  }
`

const ResultWrapper = styled.div`
  position: absolute;
  margin-top: 2px;
  width: 300px;
  background-color: var(--background);
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

const AuthorName = styled.span`
color:  var(--purple);
font-style: italic;
font-size: 14px;
`;

const Prediction = styled.span`
  font-weight: bold;
`;

export default SearchBar;