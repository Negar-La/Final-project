import styled from "styled-components";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import {TiDelete} from "react-icons/ti";
import Loader from "./Loader";

const NewComment = ({commentPosted, setCommentPosted}) => {

  const { bookId } = useParams();

  const { user, isAuthenticated } = useAuth0();
  // console.log(user)

  const [commentText, setCommentText] = useState("");
  const [postComment, setPostComment] = useState(null);
  const [remainingLetters, setRemainingLetters] = useState(200);
  const [comments, setComments] = useState(null)
  const[commentDeleted, setCommentDeleted] = useState(false)

   // Handle the onChange function for the New comment text
   const handleCommentTextChange = (e) => {
    setCommentText(e.target.value);
    setRemainingLetters(200 - e.target.value.length);
  };


//Get method shows all the comments based on book's id 
  useEffect(() => {
    fetch(`/api/comment/${bookId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setComments(data.data);
          console.log(data.data)
        } 
      });
  }, [postComment, commentDeleted]); //this useEffect triggers when a comment is added and causes a rerender of the component



//Post method post a new comment and adds it to users collection in mongodb
  const handleSubmit = ()=>{
    // console.log('hi')
    fetch(`/api/comment/${bookId}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({comment: commentText, user:user.name, userPicture:user.picture})
    })
    .then(res=>res.json()).then((data)=>{
      if (data.status === 400 || data.status === 500) {
        throw new Error (data.message)
       } else{
        console.log(data); //{comment: {…}}
        setPostComment(data.data)
        // window.location.reload(); //refresh the page to show most recent comment in the list I do not need it!
        //I create the comment, post it to db and then by get method I retrieve all comments from db!!
        setCommentText("");
        setRemainingLetters(200);
        setCommentPosted(!commentPosted); 
         }
    })
    .catch ((error)=>{
      console.log(error)

    })
  }

  const deleteCommentHandler = (e, c) => {                        
    e.preventDefault();
    fetch("/api/delete-comment", {         
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({c}),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data.status === 200) {          
         console.log(data)   
         setCommentDeleted(!commentDeleted)          
        }
      })
      .catch((error) => {
        return error;
      });
  };


  return (
    <>
      <>
        <Flex>
         <ImgCurrentUser src={user.picture}/>
         <FormContainer onSubmit={(e)=>{
                    e.preventDefault();
                    handleSubmit();
                      e.target.value = "";
                    }}>
                    <Input 
                      type="text" 
                      placeholder="Write here..."  
                      onChange={handleCommentTextChange}
                      value={commentText}
                      />

                    <Bottom>
                      <Span remainingLetters={remainingLetters}>  {remainingLetters}</Span>
                      <Button type="submit"
                      disabled={remainingLetters===200 || remainingLetters < 0 ? true : false}>
                        Send
                      </Button>
                    </Bottom>
          </FormContainer>
        </Flex>

        {isAuthenticated ? (
          <>
           <div>
              <CommentTitle>Comments:</CommentTitle>      
               {/*the most efficient way to reverse a JavaScript array? reverse() if you want in-place, or array. slice(). reverse() if you want a copy. */}
              {!comments ? <Loader/>
              : (comments.length < 1) ? <NoComment>No comment yet.</NoComment>
              : (comments && comments.slice().reverse().map((c, i)=>{ 
                              //  console.log(c)
                               return (
                                 <PreviousComments key={i}  >
                                  <ImgCurrentUser src={c.newUser.userPicture}/>
                                  <UserSpan>{c.newUser.user}: </UserSpan>
                                  <CommentText>{c.newUser.comment}</CommentText>
                                  { c.newUser.userPicture === user.picture ?
                                  (
                                    <DeleteBtn  onClick={(e) => { deleteCommentHandler(e, c) }}>
                                      <SpanIcon>
                                          <TiDelete size={30}
                                          onMouseOver={({target})=>target.style.color="yellow"}
                                          onMouseOut={({target})=>target.style.color='var(--darkblue)'}/>
                                      </SpanIcon>
                                  </DeleteBtn>
                                  ) : ("")
                                    }

                                 </PreviousComments>
                               )
                 })
              ) 
                          
              }
          </div>
        </>  
        ) : ("")
        }

        
      </>
    
    </>
 
  )
}

const FormContainer = styled.form`
  margin-left: 15px;
  margin-bottom: 25px;
`;

const Flex = styled.div`
  display: flex;
`

const ImgCurrentUser = styled.img`
  width : 50px;
  height: 50px;
  border: 3px solid var(--darkblue);
  border-radius: 50%;
`
const Bottom = styled.div`
  margin-top: -50px;
  margin-left: 400px;

`;

const Button = styled.button`
  color: white;
  background-color: ${(props) =>
    !props.disabled ? 'var(--darkblue)' : 'gray'};
    cursor: ${(props)=>
    !props.disabled ? 'pointer' : 'not-allowed'};
  border: 0px;
  font-size: 18px;
  border-radius: 25px;
  padding: 8px 16px;
  transition: background-color 0.4s,
              opacity 0.5s;
  &:hover {
    background-color: ${(props)=>
    !props.disabled ? 'var(--yellow)' : 'gray'};
    color: ${(props)=>
    !props.disabled ? 'var(--darkbluew)' : 'white'};
  }
  &:active {
    opacity: 0.3;
  }
`;

const Span = styled.span`
  right: 160px;
  top: 265px;
  color: lightgray;
  margin-right: 15px;
  color: ${(props) =>
  props.remainingLetters < 0
      ? "red" :
    props.remainingLetters <= 55
      ? "Orange" 
      : "gray"};
`;

//change your input type='text' to a textarea, and as a user types, the text will wrap onto the next line.
const Input = styled.textarea`
  padding: 10px;
  font-size: 18px;
  width: 500px;
  height: 150px;
  outline: none;
  resize: none;
  border: 3px solid var(--darkblue);
  border-radius: 10px;
`;

const CommentTitle = styled.p`
  font-size: 22px;
  margin-bottom: 8px;
  font-weight: 400;
`

const NoComment = styled.p`
  font-size: 22px;
  margin-bottom: 8px;
  font-weight: 400;
  margin-left: 10px;
`

const PreviousComments = styled.div`
  max-width: 600px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
`


const UserSpan = styled.span`
  margin-right: 8px;
  margin-left: 10px;
  font-weight: bold;
`;

const CommentText = styled.span`
  outline: none;
  resize: none;
`

const DeleteBtn = styled.button`
  cursor: pointer;
  border: none;
  background-color: white;
  border-radius: 10px;
  margin-left: 10px;
`

const SpanIcon = styled.span`
  color: var(--darkblue);
  transition: color 0.3s,
              opacity 0.3s;
  &:hover {
  color: var(--yellow);
  }
  &:active {
    opacity: 0.3;
  }
`

export default NewComment