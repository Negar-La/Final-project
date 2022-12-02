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
          <ItemCard>
            <DescriptionCard>
              <Image>
                <img src={book.image} alt={book.title} />
              </Image>
              <Name>{book.title}</Name>
              <Price>{book.author}</Price>
            </DescriptionCard>
          </ItemCard>
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
  font-weight: bold;
  margin: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-left: 1em;
  padding-top: 1em;
  gap: 1em;
  background-color: #d9e4fd;
  a {
    text-decoration: none;
    box-shadow: none;
    color: black;

    &:hover {
      box-shadow: 0 0 10px #e3371e;
      border-radius: 10px;
    }
  }
`;

const ItemCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  padding-top: 2em;
  padding-bottom: 1em;
  padding-right: 1em;
  padding-left: 1em;
  width: 225px;
  height: 280px;
  box-shadow: rgba(16, 55, 120, 0.3) 0px 1px 2px 0px,
    rgba(21, 31, 48, 0.15) 0px 1px 3px 1px;
  border-radius: 10px;
  background-color: white;

  &:hover {
    box-shadow: rgba(227, 55, 30, 0.3) 0px 1px 2px 0px,
      rgba(255, 122, 72, 0.15) 0px 1px 3px 1px;
  }
`;

const DescriptionCard = styled.div``;

const Image = styled.div`
  margin-bottom: 10px;
  img {
    width: auto;
    height: 75px;
  }
`;
const Name = styled.p`
  font-weight: bold;
  width: 200px;
  margin-bottom: 10px;
`;
const Price = styled.div``;

const Center = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export default SearchResults