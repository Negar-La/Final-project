import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";

const Profile = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user)

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <Wrapper>
        <UserInfo>
            {user?.picture && <img src={user.picture} alt={user?.name} />}
            <h2>Name: {user?.name} </h2>
            <h3>Nickname: {user?.nickname}</h3>
      {/* with github user does not have an email information but with google it has.  */}
            <h3>Email: 
              {user.email ?
              ( user.email ) :
              (" not provided") 
              }
            </h3>
            {/* <ul>
              {Object.keys(user).map((objKey, i)=>
                <li key={i}>
                  {objKey}: {user[objKey]}
                </li>
              )}
            </ul> */}
        </UserInfo>
        <FavoriteList>
            <h1>Your favorite books</h1>
        </FavoriteList>
      </Wrapper>
    
    )
  );
}

const Wrapper = styled.div`
  display: flex;
`

const UserInfo = styled.article`

`;

const FavoriteList = styled.div`
  margin-left: 30px;
`;

export default Profile