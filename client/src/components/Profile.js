import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import {TiDeleteOutline} from "react-icons/ti";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Profile = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();
  // console.log(user)


  const [favoriteBooks, setFavoriteBooks] = useState(null)

  //we define this useState to use in the dependency array of useEffect so the page re-render each time that it changes.
  const[favoriteDeleted, setFavoriteDeleted] = useState(false)

  useEffect(() => {
    fetch(`/api/get-favorites`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setFavoriteBooks(data.data);
          // console.log(data.data)
          // console.log(data.data[12].favoriteBook.userPicture)
        } 
      });
  }, [favoriteDeleted]);

  const deleteFavoriteHandler = (e, item) => {                        
    e.preventDefault();
    fetch("/api/delete-favorite", {         
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({item}),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.status === 200) {          
        //  console.log(data)   
         setFavoriteDeleted(!favoriteDeleted)  //you should set it to opposite value so it will change each time and renders useEffect each time and not just the first time!        
        }
      })
      .catch((error) => {
        return error;
      });
  };


// const x = favoriteBooks.filter((item)=>{
//   console.log(item)
//   if (item.userPicture === user.picture) {
//   return item
//   }
// })

// console.log(x) //[] or [{...}]

  if (isLoading) {
    return  <Center><Loader/></Center>  ;
  }

  return (
    isAuthenticated && (
      <Wrapper>
        <UserInfo>
            {user?.picture && <UserImage src={user.picture} alt={user?.name} />}
            <h2>Name: {user?.name} </h2>
            <h3>Nickname: {user?.nickname}</h3>
      {/* with github user does not have an email information but with google it has.  */}
            <h3>Email: 
              {user.email ?
              ( user.email ) :
              (" not provided") 
              }
            </h3>

        </UserInfo>
        <FavoriteList>
            <Title>Your favorite books:</Title>
            {
              !favoriteBooks ? <Center><Loader/></Center> :
              (
                <Flex>
                {favoriteBooks && favoriteBooks.map((item)=>{
                  // console.log(item) 
                  if (item.userPicture === user.picture) {
                    return (
                      <Box key={item._id}>
                          <DeleteBtn  onClick={(e) => { deleteFavoriteHandler(e, item) }}
                          ><TiDeleteOutline size={26} style={{color: 'var(--darkblue)'}}/></DeleteBtn>
                           <Link to={`/books/${item.id}`} style={{ textDecoration: 'none' }}>
                              <Image src={item.imageSrc} alt={item.title} />
                              <BookTitle>{item.title}</BookTitle>
                              <Author>Author: <span>{item.author}</span></Author>
                          </Link>
                       
                      </Box>
                    )
                  }
                })
                }
                {(favoriteBooks && favoriteBooks.filter((item)=>{
                   if (item.userPicture === user.picture)
                   return item
                }).length < 1) ? <NoBook>You have no book in your favorite list</NoBook> : "" 

                }
              </Flex>
              )
            }
         
        </FavoriteList>
      </Wrapper>
    
    )
  );
}

const Wrapper = styled.div`
  display: flex;
  padding-top: 70px;
`

const UserInfo = styled.article`
  text-align: center;
  h2, h3 {
    color: var(--darkblue);
    margin: 15px;
  }
`;

const UserImage = styled.img`
  height: 300px;
  border-radius: 30px;
  margin: 20px;
  margin-bottom: 0px;
`
const Title = styled.div`
  font-weight: bold;
  font-size: 22px;
  margin-top: 20px;
  margin-bottom: 10px;
`

const FavoriteList = styled.div`
  margin-left: 130px;
  display: flex;
  flex-direction: column;
`;

const Flex = styled.div`
  display: flex;
  max-width: 1100px;
  flex-wrap: wrap;
`

const Box = styled.div`
  border: 2px solid var(--darkblue);
  max-width: 200px;
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

const NoBook = styled.div`
  font-size: 32px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const BookTitle = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Image = styled.img`
  margin-top: 10px;
  border-radius: 10px;
  width: 134px;
  height: 200px;
  margin-bottom: 10px;
`;

const Author = styled.div`
  font-size: 16px;
  color: var(--purple);
  span{
    font-weight: bold;
  }
`
const DeleteBtn = styled.button`
  position: absolute;
  right: 0px;
  top: 0px;
  cursor: pointer;
  border: none;
  background-color: white;
  border-radius: 50%;
  transition: background-color 0.3s,
              opacity 0.3s;
  &:hover {
    background-color: var(--yellow);
  }
  &:active {
    opacity: 0.3;
  }
`

const Center = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export default Profile