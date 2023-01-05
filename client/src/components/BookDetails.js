import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import NewComment from "./NewComment";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import {MdFavorite} from "react-icons/md"
import {AiOutlineRead} from "react-icons/ai";
import {BsFillPinMapFill} from "react-icons/bs";
import SimilarBooks from "./SimilarBooks";
import Map from "./Map";




const BookDetails = () => {

  const [book, setBook] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const {user, isAuthenticated} = useAuth0();
  // console.log(user)
  const [commentPosted, setCommentPosted] = useState(false)

  const { bookId } = useParams();
  // console.log(bookId)
  const [favoriteBook, setFavoriteBook] = useState(null)
  const navigate = useNavigate();

  const [category, setCategory] = useState(null)
  const [similar, setSimilar] = useState(null)

  const [showMap,setShowMap]=useState(false)

  const [lat, setLat] = useState(null)
  const [lng, setLng] = useState(null)

  const handleClick = () => {
    // console.log("hi")
    window.open(book.previewLink);
  };

  //fetch data to have book details
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/get-book/${bookId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setBook(data.data);
          setCategory(data.data.categories)
          setLat(Number(data.data.lat))
          setLng(Number(data.data.lng))
          // console.log(data.data);
          // console.log(data.data.categories)
          // console.log(data.data.lat)
          // console.log(typeof data.data.lat);
          // console.log(Number(data.data.lat));
          // console.log(typeof Number(data.data.lat));
        } else {
          setNotFound(true);
        }
      });
  }, [bookId, commentPosted]);

  const addToFavoriteHandler = (e, book) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/add-favorite`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user.name, 
        userPicture: user.picture,
        title: book.title,
        id: book.id,
        author: book.author,
        imageSrc: book.image,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        setFavoriteBook(data.data)
        navigate("/profile"); //we put navigate after fetching data to be sure that navigation occurs after fetching data.
      })
      .catch((error) => {
        console.log(error);
      });
  };

 

//fetch books with the same category as the current book
    useEffect(() => {
     category && fetch(`${process.env.REACT_APP_SERVER_URL}/api/get-categories/${category}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            setSimilar(data.data);
            // console.log(data.data)
          } else {
            setNotFound(true);
          }
        });
    }, [book])
 


  if (notFound) {
    return (
      <ErrorMsg>"No book found with that ID."</ErrorMsg>
    );
  } else {

    return (
      <>
       {!book ?
       <Center><Loader/></Center>
       :
       book &&
        <Container>
          <Left>
            <BookImage src={book.image} />
            <PreviewBtn onClick={ handleClick}>Click to Preview <AiOutlineRead /> </PreviewBtn>
              <FavoriteBtn    onClick={(e) => {
                if (!isAuthenticated)
                {
                  window.alert("Please log in first!")
                } else {
                  addToFavoriteHandler(e, book);
                }
                
                  
                  }}> Add to Favorite List <MdFavorite/>
              </FavoriteBtn>
              <FlexDiv>
              <MapButton onClick={()=> setShowMap(true)}>View Library on Map <BsFillPinMapFill style={{marginLeft: '5px'}} /></MapButton>
                            {showMap && <Map onCloseFunc={()=>setShowMap(false)} center={[parseFloat(lat), parseFloat(lng)]} book = {book}/>}
                            
              </FlexDiv>
          </Left>
         
          <Middle>
            <Title>Title: <span>{book.title}</span> </Title>
            <Author>Author: <span>{book.author}</span></Author>
            <Author>Publisher: <span>{book.publisher}</span></Author>
            <Author>Category: <span>{book.categories}</span></Author>
            <Author>Pages: <span>{book.pageCount}</span></Author>
            <Author>Library: <span>{book.libraryName}</span></Author>
            <Description>Description: <span>{book.description}</span></Description>
          </Middle>
          <CommentContainer>
                <Write2>
                  <p> You're maybe interested in similar books in the same category:</p>
                    <SimilarBooks similar={similar} book={book}/>
                </Write2>
                {similar && similar.length === 1 ? <Nosimilar>Sorry, there is no other book in this category.</Nosimilar> : ""}
                
              <Write>Write a comment about this book!</Write>
              {isAuthenticated ? (
              <NewComment commentPosted={commentPosted} setCommentPosted={setCommentPosted} />
              ) :
              <Please>Please log in so you can read comments and write a comment!</Please>
              }
  
           
          </CommentContainer>
          
        </Container>
      }
      </>  
      
    )
  }
}

const Container = styled.div`
  padding-top: 85px;
  display: flex;
  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (min-width: 1000.02px)  {
    justify-content: center;
    flex-wrap: wrap;
  }
`

const Left = styled.div`
  padding: 10px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const BookImage = styled.img`
  border: 3px solid var(--darkblue);
  height: 250px;
  width: 200px;
  object-fit: fill;
  box-shadow: rgba(16, 55, 120, 0.3) 0px 1px 2px 0px,
    rgba(21, 31, 48, 0.15) 0px 1px 3px 1px;
  border-radius: 10px;
`;

const Middle = styled.div`
  padding: 10px 30px;
  @media (max-width: 500px) {
    padding: 2px 15px;
  }
`

const Title = styled.div`
  font-size: 22px;
  margin: 20px 0px;
  font-weight: bold;
  line-height: 1.2;
  span {
    font-weight: 400;
  }
  @media (max-width: 500px) {
    font-size: 20px;
  }
`

const Author = styled.div`
  font-size: 20px;
  margin: 20px 0px;
  font-weight: bold;
  line-height: 1.2;
  span {
    font-weight: 400;
  }
  @media (max-width: 500px) {
    font-size: 20px;
  }
`

const Description = styled.div`
  width: 700px;
  line-height: 1.5;
  text-align: justify;
  font-size: 20px;
  margin: 20px 0px;
  font-weight: bold;
  span {
    font-weight: 400;
  }
  @media (max-width: 500px) {
    width: 300px;
  }
  @media (min-width: 500.02px) and (max-width: 750px)  {
    width: 450px;
  }
`
const Please = styled.div`
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  @media (max-width: 500px) {
    font-size: 19px;
    line-height: 1.5;
  }
`

const PreviewBtn = styled.button`
  border: none;
  margin-top: 40px;
  font-size: 18px;
  border-radius: 15px;
  width: 200px;
  padding: 10px 0px;
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

const FavoriteBtn = styled.button`
  border: none;
  margin-top: 40px;
  font-size: 18px;
  border-radius: 15px;
  padding: 10px 2px;
  width: 200px;
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
const CommentContainer = styled.div`
  margin: 10px;
`

const ErrorMsg = styled.div`
    font-family: "Arimo", sans-serif;
    font-weight: bold;
    margin-top: 40px;
    font-size: 22px;
    text-align: center;
`
const Write = styled.p`
  margin-bottom: 15px;
  font-size: 22px;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  padding: 10px;
  @media (max-width: 500px) {
    font-size: 19px;
  }
`
const Center = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const Write2  =styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  white-space: pre-wrap;
  margin: 20px;
  font-size: 22px;
  line-height: 1.2;
  font-weight: bold;
  @media (max-width: 500px) {
    font-size: 19px;
  }
`
const Nosimilar = styled.p`
  font-size: 22px;
  margin-bottom: 20px;
  font-weight: 400;
  margin-left: 10px;
`

const FlexDiv = styled.div`
   display: flex;
 
`
const MapButton = styled.button`
  border: none;
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 18px;
  border-radius: 15px;
  padding: 10px 5px;
  width: 200px;
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
`;
export default BookDetails