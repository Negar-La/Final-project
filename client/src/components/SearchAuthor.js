import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Pagination from "./Pagination";

const SearchAuthor = () => {

  const {searchTerm} = useParams();
  const [searchedItems, setSearchedItems] = useState(null);


  //fetch data based on searchTerm
  useEffect(() => {
    fetch(`/api/books/searchByAuthor/${searchTerm}`)
      .then((res) => res.json())
      .then((data) => {
        setSearchedItems(data.data);
        // console.log(data.data)
      });
  }, [searchTerm]);

  // PAGINATION 
// current page starts at one, this is used as a prop in paginatiojn

const [currentPage, setCurrentPage] = useState(1)
// see Product grid, this is slicing array of products depending on value of x and y. which is manipulated below
const [x, setX] = useState(0)
const [y, setY] = useState(15)

// change page function. i
const changePages = (pageNum) => {
  if (pageNum === 1) { // if page is 1 , set initial slice values
      setX(0)
      setY(15)
  }
  else {
    // else set them accordingly
    setX((15 * (pageNum - 1)) + 1)
    setY(15 * pageNum + 1)
  }
}
// everytime page changes, perform changePages function
useEffect(() => {
  changePages(currentPage)
}, [currentPage])


  return (
    <>
    <Title>Results for the Author " {searchTerm} " :</Title>
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
             <Container>
                <ProductGrid>
                  {searchedItems.slice(x,y).map((book) => {
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
                </ProductGrid>
             </Container>
   

{
        searchedItems && 
        <Container>
            <Pagination 
              currentPage={currentPage}
              searchedItems={searchedItems}
              setCurrentPage={setCurrentPage}
              limit={12}
              onPageChange={(page) => setCurrentPage(page) }
            />
        </Container>
      }
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
  padding-top: 100px;
  font-weight: bold;
  font-size: 20px;
  margin-left: 20px;
  margin-bottom: 10px;
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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

const ProductGrid = styled.div`
  display: grid;
  gap: 40px;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  margin-top: 20px;
`

const Container = styled.div `
  display: flex;
  justify-content: center;
`

export default SearchAuthor