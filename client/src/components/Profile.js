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
          console.log(data.data)
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
         console.log(data)   
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
                          ><TiDeleteOutline size={32} style={{color: 'blue'}}/></DeleteBtn>
                           <Link to={`/books/${item.id}`} >
                              <Image>
                              <img src={item.imageSrc} alt={item.title} />
                              </Image>
                              <Name>{item.title}</Name>
                              <Author>{item.author}</Author>
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
  flex-wrap: wrap;
`

const UserInfo = styled.article`
  h2, h3 {
    color: purple;
    margin: 15px;
  }
`;

const UserImage = styled.img`
  height: 300px;
  border-radius: 30px;
  margin: 20px;
  margin-bottom: 0px;
`

const FavoriteList = styled.div`
  margin-left: 130px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 22px;
  color: purple;
  margin-top: 20px;
  margin-bottom: 10px;
`
const Box = styled.div`
  border: 1px solid black;
  width: 240px;
  margin: 10px;
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  position: relative;
`
const Flex = styled.div`
  display: flex;

`
const NoBook = styled.div`
  font-size: 32px;
  position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const Name = styled.div`
  font-weight: bold;
  text-align: center;
  margin: auto;
  width: 200px;
  margin-bottom: 5px;
`;

const Image = styled.div`
  margin-bottom: 5px;
  margin-top: 10px;
  margin: auto;
  img {
    width: auto;
    height: 175px;
  }
`;

const Author = styled.div`
  font-weight: bold;
  color: purple;
  font-size: 18px;
  width: 200px;
  margin: auto;
  margin-bottom: 10px;
`
const DeleteBtn = styled.button`
  position: absolute;
  right: 0px;
  top: 0px;
  cursor: pointer;
  border: none;
  background-color: white;
  border-radius: 10px;
  transition: .2s;
`

const Center = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

export default Profile