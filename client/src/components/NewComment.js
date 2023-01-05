import styled from "styled-components";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import {FaTimes} from "react-icons/fa";
import {AiTwotoneEdit} from "react-icons/ai";
import Loader from "./Loader";

const NewComment = ({commentPosted, setCommentPosted}) => {

  const { bookId } = useParams();

  const { user, isAuthenticated } = useAuth0();
  // console.log(user.email)

  const [commentText, setCommentText] = useState("");
  const [postComment, setPostComment] = useState(null);
  const [remainingLetters, setRemainingLetters] = useState(200);
  const [comments, setComments] = useState(null)
  const [commentDeleted, setCommentDeleted] = useState(false)

  const [targetCommentId, setTargetCommentId] = useState(null);
  const [updatedComment, setUpdatedComment] = useState(null);
  const [showEditComment, setShowEditComment] = useState(false);
  const [isBeingUpdated, setIsBeingUpdated] = useState(false);
  const [submittedComment, setSubmittedComment] = useState(false);  

   // Handle the onChange function for the New comment text
   const handleCommentTextChange = (e) => {
    setCommentText(e.target.value);
    setRemainingLetters(200 - e.target.value.length);
  };


//Get method shows all the comments based on book's id 
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/comment/${bookId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setComments(data.data);
          // console.log(data.data)
        } 
      });
  }, [postComment, commentDeleted]); //this useEffect triggers when a comment is added and causes a rerender of the component



//Post method post a new comment and adds it to users collection in mongodb
  const handleSubmit = ()=>{
    // console.log('hi')
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/comment/${bookId}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({id:bookId, comment: commentText, user:user.name, userPicture:user.picture, email: user.email})
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

  const deleteCommentHandler = (e, object) => {                        
    e.preventDefault();
    console.log(object);
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/delete-comment/${bookId}`, {         
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({object}),
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

  
//storing the showEditComment status of each comment you want to toggle in an object and check if the specific comment is currently toggled showEditComment.
  const handleClick = (commentId) => {
    // console.log(commentId);
    setShowEditComment((showEditComment) => ({
      ...showEditComment,
      [commentId]: !showEditComment[commentId],
    }));
    console.log(showEditComment);
    setIsBeingUpdated(true);
    setTargetCommentId(commentId)
  };

  const handleChange = ((ev) => {
    // console.log(ev.target.value)
    setUpdatedComment(ev.target.value);
});

const handleCancel = ((ev) => {
  setShowEditComment(false);
  setIsBeingUpdated(false);
});



const handleUpdateSubmit = ((e)=>{
  e.preventDefault();
  console.log(targetCommentId);
  fetch(`${process.env.REACT_APP_SERVER_URL}/api/update-comment/${targetCommentId}`,{
      method: "PATCH",
      headers: {
          Accept: 'application/json',
          "Content-type":"application/json"
      },
      body: JSON.stringify({
        // commentId:commentId,
          comment:updatedComment
      })
  })
  .then(res => res.json())
  .then(data => {
      console.log(data);
      // if true set to false or vice versa why not just write true
      setSubmittedComment(!submittedComment);
      setUpdatedComment("");
      setIsBeingUpdated(false)
      window.location.reload();
  })
  .catch((error) => {
      console.log(error);
  })
});


  return (
    <>
      <>
        <Flex>
         <ImgCurrentUserTop src={user.picture}/>
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
                                  <ImgCurrentUser src={c.userPicture}/>
                                  <UserSpan>{c.user}: </UserSpan>
                                  <CommentText>{c.comment}</CommentText>
                                  { c.userPicture === user.picture ? // I deleted '&&  c.email === user.email' because github account has no email
                                  (
                                    <>
                                      <DeleteBtn  onClick={(e) => { deleteCommentHandler(e, c) }}>
                                        <SpanIcon>
                                            <FaTimes />
                                        </SpanIcon>
                                      </DeleteBtn>


                                      <EditBtn onClick={(e)=> handleClick(c.commentId)} ><AiTwotoneEdit /></EditBtn>
                                      {/* check by id --> */}
                                    {showEditComment[c.commentId]
                                    ?
                                    <DivEdit >
                                      <Wrapper>
                                        <Content>
                                            <EditTextArea type="text" placeholder={c.comment} onChange={(ev)=>{handleChange(ev)}} value={updatedComment || ""}></EditTextArea>
                                            <div>
                                              <SubmitBtn type="submit" disabled={updatedComment=== null || updatedComment === "" ? true : false} onClick={handleUpdateSubmit} >Submit</SubmitBtn>
                                              <SubmitBtn type="button" onClick={handleCancel} >Cancel</SubmitBtn>
                                            </div>
                                        </Content>
                                      </Wrapper>
                                        
                                      
                                    </DivEdit>
                                      : null}


                                    </>
                               
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
  @media (max-width: 500px) {
    width: 90%;
    margin-left: 5px;
    margin-bottom: 5px;
  }
`;

const Flex = styled.div`
  display: flex;
  @media (min-width: 500.02px) and (max-width: 1200px) {
    width: 400px;
  }
`

const ImgCurrentUserTop = styled.img`
  width : 50px;
  height: 50px;
  border: 3px solid var(--darkblue);
  border-radius: 50%;
  margin-top: 8px;
`

const ImgCurrentUser = styled.img`
  width : 50px;
  height: 50px;
  border: 3px solid var(--darkblue);
  border-radius: 50%;
  margin: 13px;
  @media (max-width: 500px) {
    margin: 10px;
  }
`
const Bottom = styled.div`
  margin-top: -50px;
  margin-left: 400px;
  @media (max-width: 500px) {
    margin-top: -50px;
    margin-left: 175px;
    width: 130px;
  }
  @media (min-width: 500.02px) and (max-width: 750px)  {
    width: 150px;
    margin-left: 305px;
  }
`;

const Button = styled.button`
  color: white;
  background-color: ${(props) =>
    !props.disabled ? 'var(--darkblue)' : 'gray'};
    cursor: ${(props)=>
    !props.disabled ? 'pointer' : 'not-allowed'};
  border: 0px;
  font-size: 18px;
  font-weight: bold;
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
       @media (max-width: 500px) {
        margin-right: 5px;
  }
`;

//change your input type='text' to a textarea, and as a user types, the text will wrap onto the next line.
const Input = styled.textarea`
border: 1px solid green;
  padding: 10px;
  font-size: 18px;
  width: 500px;
  height: 150px;
  outline: none;
  resize: none;
  border: 3px solid var(--darkblue);
  border-radius: 10px;
  @media (max-width: 500px) {
    width: 260px;
  }
  @media (min-width: 500.02px) and (max-width: 750px)  {
    width: 400px;
  }
`;

const CommentTitle = styled.p`
  font-size: 22px;
  margin-bottom: 8px;
  font-weight: 400;
  padding-left: 20px;
  padding-top: 20px;
  @media (max-width: 500px) {
    font-size: 19px;
    padding-left: 20px;
    
  }
`

const NoComment = styled.p`
  font-size: 22px;
  font-weight: 400;
  padding-left: 20px;
  padding-top: 20px;
  @media (max-width: 500px) {
    font-size: 19px;
    padding-top: 0px;
  }
`

const PreviousComments = styled.div`
  max-width: 600px;
  max-height:200px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  border: 2px solid var(--yellow);
  border-radius: 10px;
  position: relative;
  @media (max-width: 500px) {
    max-width: 340px;
    margin: 14px;
  }
`

const UserSpan = styled.span`
  margin-right: 8px;
  margin-left: 10px;
  font-weight: bold;
  @media (max-width: 500px) {
    margin-left: 0px;
    text-overflow: ellipsis;
    white-space: nowrap; 
    overflow: hidden;
    max-width: 100px;
    min-width: 50px;
  }
`;

const CommentText = styled.span`
  outline: none;
  resize: none;
  text-align: justify;
  word-break: break-all; 
  @media (max-width: 500px) {
    margin-left: 0px;
    min-width: 100px;
  }
`

const DeleteBtn = styled.button`
border: none;
  margin-left: 10px;
  font-size: 18px;
  border-radius: 15px;
  padding: 5px;
  background-color: var(--background);
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

const SpanIcon = styled.span`
`

const DivEdit = styled.div`
  border-radius: 10px;
`

const EditTextArea = styled.textarea`
  padding: 10px;
  font-size: 18px;
  width: 470px;
  outline: none;
  resize: none;
  border-radius: 10px;
  margin-bottom: 6px;
  overflow:auto;
  overflow: hidden;
  border: 1px solid black;
 @media (max-width: 500px) {
    width: 280px;
  }
`

const EditBtn = styled.button`
  border: none;
  margin-left: 5px;
  font-size: 16px;
  border-radius: 15px;
  padding: 5px;
  margin-right: 10px;
  font-weight: bold;
  background-color: var(--background);
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


const SubmitBtn = styled.button`
  border: none;
  margin-left: 10px;
  font-size: 16px;
  border-radius: 15px;
  padding: 5px;
  font-weight: bold;
  background-color: var(--background);
  cursor: ${(props)=>
    !props.disabled ? 'pointer' : 'not-allowed'};
  transition: background-color 0.3s,
              opacity 0.3s;
   &:hover {
    background-color: ${(props)=>
    !props.disabled ? 'var(--yellow)' : 'inherited'};
  }
  &:active {
    opacity: 0.3;
  }
`
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: -130px;
  right: 0px;
  width: 100%;
  z-index: 2;
`;
const Content = styled.div`
  background: var(--background);
  border: 2px solid var(--darkblue);
  border-radius: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  height: 30%;
  width: 100%;
  padding: 10px;
`;

export default NewComment