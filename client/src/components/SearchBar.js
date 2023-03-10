import { useState } from "react";
import { useContext } from "react";
import { BooksContext } from "./BooksContext";
import styled from "styled-components";
import { RiSearchFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SearchCategory from "../pages/SearchCategory";

const SearchBar = () => {

  const navigate = useNavigate();

  const { books, categories } = useContext(BooksContext);
  const [filteredData, setFilteredData] = useState('');
  const [userQuery, setUserQuery] = useState("");
  // console.log(userQuery);
  const [isToggled, setIsToggled] = useState(false);
  const [isToggledCategory, setIsToggledCategory] = useState(false);

  //This handler tracks what user types in input and checks if a book's title includes that word.
  const handleFilter = (event) => {
    const itemSearched = event.target.value;
    setUserQuery(itemSearched);
    // console.log(userQuery.length);
    const newFilter = books.filter((item) => {
      if ( isToggled === true && item.author.toLowerCase().includes(itemSearched.toLowerCase())) {
        return true;
      } else
      if ( item.title.toLowerCase().includes(itemSearched.toLowerCase()) ) {
         return true;
        }  else {
        return false;
      }
    });
//Only when set FilteredData to newFilter that user has typed something in input.
    itemSearched === "" ? setFilteredData('') : setFilteredData(newFilter);
  };

  const handleChange = (e)=>{
    // console.log(e.target.value);
    // console.log('category selected!');
    isToggledCategory  &&
    setIsToggledCategory(true)
    navigate(`/searchByCategory/${e.target.value}`)
    setFilteredData('');
    <SearchCategory/>
  }


  return (
    <Container>
        <CategoryDiv>
          <Select name="categories" id='categories'
          onChange={handleChange}
        >
          <option value="pick">Select Category</option>
              <>{categories && categories.map((category, index)=>{
                  return  <option key ={index} value= {category}> {category}</option> 
                  }) 
                  }
              </>
                  
          </Select>
        </CategoryDiv>
        <Para>Or</Para>
      <InputWrapper>
        <StyledInput
          type="text"
          placeholder="Search here"
          onChange={handleFilter}
          value={userQuery}
        />

      <SearchIcon className="search-icon"
       onClick={(ev) => {
          if(userQuery.length > 0){ navigate(`/search/${userQuery}`)}
          else {window.alert("Please enter something!")}
          setFilteredData('');
          setUserQuery("");
       }}>
          <RiSearchFill size={36} style={{color: "var(--darkblue)", marginLeft: '-53px'}}
                    onMouseOver={({target})=>target.style.color="var(--yellow)"}
                    onMouseOut={({target})=>target.style.color="var(--darkblue)"}
                 />     
      </SearchIcon>
      <AuthorBtn 
         onClick={() => {
          setIsToggled(true)
          setFilteredData('');
          setUserQuery("");
          if(userQuery.length > 0){ navigate(`/searchByAuthor/${userQuery}`)}
          else {window.alert("Please enter the name of the author!")}
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
const Para = styled.p`
  font-weight: bold;
  margin-top: 0px;
  margin-left: 10px;
`

const StyledInput = styled.input`
  border-radius: 15px;
  width: 300px;
  height: 36px;
  padding-left: 10px;
  border: none;
  margin-right: 15px;
  background-color: var(--background);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
  @media (max-width: 500px) {
    width: 200px;
  }
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
    background-color: var(--yellow);
  }
  @media (max-width: 500px) {
    width: 200px;
  }
`;
const SearchIcon = styled.div`
`;
const Container = styled.div`
`;

const CategoryDiv = styled.div`
   margin-bottom: 10px;
`

const Select = styled.select`
  border-radius: 15px;
  width: 250px;
  height: 36px;
  text-align: center;
  font-size: 17px;
  color: var(--darkblue);
  background-color: var(--background);
  @media (max-width: 500px) {
    width: 200px;
  }
`

const InputWrapper = styled.div`
  margin-top: 10px;
  display: flex;

  .search-icon {
    cursor: pointer;
    border-radius: 45%;
    transition: background-color 0.3s,
                opacity 0.3s;
  &:hover {
    background-color: var(--yellow);
    
  }
  &:active {
    opacity: 0.7;
  }
  }
`;

const AuthorBtn = styled.button`
  border: none;
  font-size: 15px;
  border-radius: 15px;
  background-color: var(--background);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
  cursor: pointer;
  transition: background-color 0.3s,
              opacity 0.3s;
  &:hover {
    background-color: var(--yellow);
  }
  &:active {
    opacity: 0.8;
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
  @media (max-width: 500px) {
    width: 200px;
    span {
      width: 200px;
    }
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