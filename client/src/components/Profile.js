import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import {TiDeleteOutline} from "react-icons/ti";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import Modal from 'react-modal';
import {CgDanger} from 'react-icons/cg';

const Profile = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();
  // console.log(user)
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: '0',
      backgroundColor: 'var(--background)',
      borderRadius: '0.8rem',
      border: 'none',
    },
  };
  Modal.setAppElement();

  const [favoriteBooks, setFavoriteBooks] = useState(null)

  //we define this useState to use in the dependency array of useEffect so the page re-render each time that it changes.
  const[favoriteDeleted, setFavoriteDeleted] = useState(false)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/get-favorites/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setFavoriteBooks(data.data);
          // console.log(data.data)
        } 
      });
  }, [favoriteDeleted]);

  const handleDelete = (e, item) => {       
    // console.log(item);                 
    e.preventDefault();
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/delete-favorite`, {         
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
         setFavoriteDeleted(!favoriteDeleted) 
         setModalIsOpen(false)
        }
      })
      .catch((error) => {
        return error;
      });
  };


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
                    return (
                      <Box key={item._id}>
                          <DeleteBtn onClick={(e) => setModalIsOpen(true)} >
                            <TiDeleteOutline size={26} style={{color: 'var(--darkblue)'}}/>
                          </DeleteBtn>
                          <Modal   ariaHideApp={false} isOpen={modalIsOpen}  style={customStyles}>
                            <ModalWrapper>
                                <CgDanger  size={65} style={{ color: 'var(--darkblue)' }} />
                                <label></label>
                                <div>
                                <button onClick={(e) => handleDelete(e, item)} >Yes, delete it!</button>
                                <button onClick={(e) => setModalIsOpen(false)}  >No, cancel!</button>
                                </div>
                            </ModalWrapper>
                        </Modal>

                           <Link to={`/books/${item.id}`} style={{ textDecoration: 'none' }}>
                              <Image src={item.imageSrc} alt={item.title} />
                              <BookTitle>{item.title}</BookTitle>
                              <Author>Author: <span>{item.author}</span></Author>
                          </Link>
                      </Box>
                    )
                })
                }
                {(favoriteBooks && favoriteBooks.filter((item)=>{
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

const ModalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    text-align: center;
    border: none;
    label {
        font-size: 1.2rem;
        font-weight: 500;
        margin: 15px 0;
        &:after {
            content: "Are you sure you want to delete this Book ?";
            color: var(--darkblue);
        }
    }
    button {
    width: 150px;
    height: 40px;
    margin: 15px 10px;
    background-color: var(--darkblue);
    border-radius: 6px;
    font-family: roboto;
    border: none;
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.4s,
                opacity 0.5s;
    &:hover {
      background-color: var(--yellow);
      padding: 5px;
      border-radius: 14px;
      color: var(--darkblue);
      font-family: roboto;
      font-weight: 500;
      font-size: 20px;
  }
    &:active {
      opacity: 0.3;
    }
    }

    @media screen and (max-width: 600px) {
        padding: 10px;
        label {
          font-size: 1.1rem;
          font-weight: 500;
          margin: 10px 0;
            &:after {
            content: 'Delete this Book?';
            }
        }
        button {
            width: 120px;
            padding: 0.8rem;
            font-size: 1rem;
    }
 }
`

const Wrapper = styled.div`
  display: flex;
  padding-top: 70px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`

const UserInfo = styled.article`
  text-align: center;
  h2, h3 {
    margin: 15px;
    @media (max-width: 600px) {
    font-size: 18px;
  }
  }
`;

const UserImage = styled.img`
  height: 300px;
  border-radius: 30px;
  margin: 20px;
  margin-bottom: 0px;
  @media (max-width: 600px) {
    height: 200px;
  }
`
const Title = styled.div`
  font-weight: bold;
  font-size: 22px;
  margin-top: 20px;
  margin-bottom: 10px;
  @media (max-width: 600px) {
    margin-left: 30px;
  }
`

const FavoriteList = styled.div`
  margin-left: 130px;
  display: flex;
  flex-direction: column;
  @media (max-width: 600px) {
    
    margin-left: 0px;
  }

`;

const Flex = styled.div`
  display: flex;
  max-width: 1100px;
  flex-wrap: wrap;
  @media (max-width: 600px) {
    justify-content: center;
  }
`

const Box = styled.div`
  /* border: 2px solid var(--darkblue); */
  max-width: 200px;
  padding: 10px 25px;
  margin: 10px;
  text-decoration: none;
  text-align: center;
  border-radius: 10px;
  position: relative;
  &:hover {
    box-shadow: rgba(255, 201, 113, 0.8) -3px 2px 4px 3px,
      rgba(255, 201, 113, 0.8) 0px 1px 3px 1px;
  }
`

const NoBook = styled.div`
  font-size: 25px;
  
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
  /* color: var(--purple); */
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
  /* background-color: white; */
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