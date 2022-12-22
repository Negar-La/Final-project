import { useState, useEffect } from "react";
import styled from "styled-components";
import Loader from "./Loader";

const About = ({theme}) => {

  const [random, setRandom] = useState(null)
 
  useEffect(() => {
    fetch("/api/get-quotes")
      .then((res) => res.json())
      .then((data) => {
          setRandom(data.data[Math.floor(Math.random()*data.data.length)])
          // console.log(data.data[Math.floor(Math.random()*data.data.length)])
      })
      .catch ((error)=>{
        console.log(error);
       })
  }, []);



  return (
    <Wrapper>
      <Div>Hello and welcome to <span>"My Online Library"</span></Div>
      <Para1>
        <ol>
          <li>  In this website you can search for books by <Bold>category</Bold>, <Bold>title</Bold> or <Bold>author</Bold>.</li>
          <li>  When you choose a book, you'll have access to some details about that book.</li>
          <li>  You may also view the library that has that book on <Bold>google map</Bold>. </li>
          <li>  Based on the category of that book, some other books in the same category will be suggested to you. </li>
          <li>  Some books have an available ebook that you can start reading.</li>
          <li> If you login to the website, it gives you access to more features. 
          You can <Bold>write comments</Bold> and read other people's comments about different books.
          You can <Bold>edit</Bold> or <Bold>delete</Bold> your own comments.
          Furthermore, you can <Bold>add books to your favorite list</Bold> which will be shown in your profile page.</li>
        </ol>
      </Para1>
      <Photo>
              <img src={process.env.PUBLIC_URL + '/images/background12.jpg'} />
      </Photo>
    <Para2>Quote of the Day:</Para2>
      <Para3>
          {!random ? <Loader/> : 
          <>
            <h2>{random.quote} </h2>
            <h3>- {random.author}</h3>
            
          </>
          }
      </Para3>
    
    </Wrapper>

  )
}
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
`

const Div = styled.div`
  padding-top: 100px;
  margin-left: 50px;
  margin-bottom: 10px;
  font-size: 22px;
  span {
    font-weight: bold;
  }
`
const Para1 = styled.div`
  /* color: var(--darkblue); */
  margin: 20px 50px;
  line-height: 1.7;
  text-align: justify;
  font-size: 21px;
  margin-top: 20px;
`
const Bold = styled.span`
  font-weight: 600;
  color: ${props => props.theme.Bold};
`

const Para2 = styled.div`
  line-height: 1.7;
  text-align: justify;
  font-size: 21px;
  margin: 15px 0px 0px 50px;
  font-weight: 600;
`

const Para3 = styled.div`
  margin: 10px 50px 50px 50px;
  line-height: 1.5;
  padding: 1.5rem;
  font-size: 21px;
  border: 3px solid var(--yellow);
  border-radius: 10px;
    h2, h3{
      text-align: center;
    }
`



const Photo = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
  text-align: center;
  
  img {
    height: 500px;
  }
  
 
  @media (max-width: 500px) {
      img {
        height: 400px;
        border-radius: 10px;
      }
  }
  @media (min-width: 501px) {
    img {
      border-radius: 20px;
      }
  }
`
export default About