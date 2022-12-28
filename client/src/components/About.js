import { useState, useEffect } from "react";
import styled from "styled-components";
import Loader from "./Loader";

const About = ({theme}) => {

  const [random, setRandom] = useState(null)
 
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/get-quotes`)
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
      <Flex>
        <Photo>
                <img src={process.env.PUBLIC_URL + '/images/background12.jpg'} />
        </Photo>
        <Part2>
            <Para2>Quote of the Day:</Para2>
            <Para3>
                {!random ? <Loader/> : 
                <>
                  <h2>{random.quote} </h2>
                  <h3>- {random.author}</h3>
                  
                </>
                }
            </Para3>
        </Part2>
    
      </Flex>

    
    </Wrapper>

  )
}
const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;

`

const Div = styled.div`
  margin: 100px 50px 10px 50px;
  line-height: 1.7;
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
const Flex = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 1000px) {
        flex-direction: column;
  }
`
const Part2 = styled.div`

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
  margin-left: 50px;
  img {
    height: 500px;
    object-fit: cover;
  }
  
 
  @media (max-width: 500px) {
    margin-left: 0px;
      img {
        width: 350px;
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