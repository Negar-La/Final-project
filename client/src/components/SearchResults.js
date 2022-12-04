import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const SearchResults = () => {

  const {searchTerm} = useParams();
  const [searchedItems, setSearchedItems] = useState(null);


  //fetch data based on searchTerm
  useEffect(() => {
    fetch(`/api/books/search/${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchedItems(data.data);
      });
  }, [searchTerm]);


  return (
    <>
    <Title>Results for the term " {searchTerm} ":</Title>
{/* consider 3 possibilities: loading state - there is no result - there are results to shown */}
    {searchedItems ===null ? ( 
      <>
         <Center><Loader/></Center> 
      </>
        ): searchedItems === undefined ? (
          <ErrorMsg>Sorry, no results were found matching your criteria!</ErrorMsg>
        ) 
        :
        ( 
    <Wrapper>
    {searchedItems.map((book) => {
      return (
        <Link to={`/books/${book.id}`} key={book.id} >
          <Box>
              <Image src={book.image} alt={book.title} />
              <Name>{book.title}</Name>
              <Author>{book.author}</Author>
          </Box>
        </Link>
      );
    })}
  </Wrapper>
    )
    }
    </>

  )
}

const ErrorMsg = styled.div`
   font-weight: bold;
    margin-top: 40px;
    font-size: 22px;
    text-align: center;
`

const Title = styled.div`
  padding-top: 90px;
  font-weight: bold;
  margin-left: 20px;
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  flex-wrap: wrap;
  a {
    text-decoration: none;
    box-shadow: none;
    color: black;
  }
`;

const Box = styled.div`
  border: 2px solid var(--darkblue);
  width: 200px;
  height: 321px;
  padding: 10px 25px;
  margin: 10px;
  text-decoration: none;
  text-align: center;
  border-radius: 10px;
  position: relative;
  &:hover {
    box-shadow: rgba(0, 0, 204, 0.3) 0px 2px 3px 1px,
      rgba(0, 0, 204, 0.15) 0px 1px 3px 1px;
  }
`

const Image = styled.img`
  margin-top: 10px;
  border-radius: 10px;
  width: 134px;
  height: 200px;
  margin-bottom: 10px;
`;
const Name = styled.p`
  font-weight: bold;
  margin-bottom: 10px;
`;
const Author = styled.div`
  font-size: 16px;
  color: var(--purple);
  `;

const Center = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export default SearchResults