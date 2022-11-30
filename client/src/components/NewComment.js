import styled from "styled-components";
import { useState, useEffect } from "react";
import {BiLoader} from "react-icons/bi";
import {RiDeleteBinLine} from "react-icons/ri";
import ErrorPage from './ErrorPage';
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const NewComment = ({commentPosted, setCommentPosted}) => {

  const { bookId } = useParams();

  const { user, isAuthenticated } = useAuth0();
  // console.log(user)

  const [commentText, setCommentText] = useState("");
  const [state, setState] = useState(null);
  const [remainingLetters, setRemainingLetters] = useState(280);
  const [comments, setComments] = useState(null)

   // Handle the onChange function for the New comment text
   const handleCommentTextChange = (e) => {
    setCommentText(e.target.value);
    setRemainingLetters(280 - e.target.value.length);
  };


//Get method shows the comments based on book's id 
  useEffect(() => {
    fetch(`/api/comment/${bookId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setComments(data.data);
          console.log(data.data)
        } 
      });
  }, []);

//Post method post a new comment and adds it to users collection in mongodb
  const handleSubmit = ()=>{
    console.log('hi')
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
        setState(data.data)
        window.location.reload(); //refresh the page to show most recent comment in the list
        setCommentText("");
        setRemainingLetters(280);
        setCommentPosted(!commentPosted); 
         }
    })
    .catch ((error)=>{
      console.log(error)

    })
  }


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
                      disabled={remainingLetters===280 || remainingLetters < 0 ? true : false}>
                        Send
                      </Button>
                    </Bottom>
          </FormContainer>
        </Flex>

        {isAuthenticated ? (
          <>
           <div>
              <p>Comments:</p>
              { state &&
              ( <div> 
                             <Link to='/profile'>
                                  <ImgCurrentUser src={state.userPicture}/>
                             </Link>
                             <Span>{state.user}: </Span>
                             {state.comment}  
                         
                </div> 
              )}
              
            </div>

            <div>
      {/*  the most efficient way to reverse a JavaScript array? reverse() if you want in-place, or array. slice(). reverse() if you want a copy. */}
              {comments && comments.slice().reverse().map((c, i)=>{
                              //  console.log(c)
                               return (
                                 <div key={c.i}  >
                                  <ImgCurrentUser src={c.newUser.userPicture}/>
                                  <Span>{c.newUser.user}: </Span>
                                  <span>{c.newUser.comment}</span>
                                  <span> 
                                    <RiDeleteBinLine style={{marginLeft: "20px"}}/>
                                  </span>
                                 
                                 </div>
                               )
                             })
                          
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
  margin-bottom: 20px;
  border: 1px solid lightgray;
  width: 600px;
  height: 150px;
`;

const Flex = styled.div`
  display: flex;
`

const ImgCurrentUser = styled.img`
  width : 50px;
  height: 60px;
  border-radius: 50%;
`
const Bottom = styled.div`
  margin-top: -45px;
  margin-left: 475px;
`;

const Button = styled.button`
  color: white;
  background-color: ${(props) =>
    !props.disabled ? 'red' : 'rgb(134, 136, 253)'};
  border: 0px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 25px;
  padding: 8px 16px;
  cursor: pointer;
`;

const Span = styled.span`
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
  border: none;
  font-size: 18px;
  width: 600px;
  height: 150px;
  outline: none;
  resize: none;
`;

const Spin= styled.div`
text-align: center;
margin-left: 300px;
margin-top: 50px;
/* background-color: red; */
width: 18px;
height: 18px;
   -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`

export default NewComment