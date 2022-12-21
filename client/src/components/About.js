import { useState, useEffect } from "react";
import styled from "styled-components";
import Loader from "./Loader";

const About = () => {

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
      <Para1>In this website you can search for books by title or author. 
        Some books have an available ebook that you can start reading.
        If you login to the website, it gives you access to more features. 
        You can write comments and read other people's comments about different books.
        Furthermore, in your profile page you can have a list of your favorite books. 
      </Para1>

      <Para2>
          {!random ? <Loader/> : 
          <>
            <h2>{random.quote} </h2>
            <h3>- {random.author}</h3>
            
          </>
          }
      </Para2>
    
    </Wrapper>

  )
}
const Wrapper = styled.div`
  /* position: relative;
  background-image: url("/images/book-light.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */
  height: 100vh;
  width: 100vw;
`

const Div = styled.div`
  /* color: var(--darkblue); */
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
const Para2 = styled.div`
  margin: 0;
  position: absolute;
  top: 80%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  background-color: inherit;
  line-height: 1.5;
  padding: 1.5rem;
  font-size: 21px;
  border: 2px solid var(--yellow);
  border-radius: 10px;
    h2, h3{
      text-align: center;
    }
    @media (max-width: 500px) {
      margin-top: 130px;
  }
`
export default About