import styled from "styled-components";

const About = () => {
  return (
    <Wrapper>
      <Div>Hello and welcome to <span>"My Online Library"</span></Div>
      <Para1>In this website you can search for books by title or author. 
        Some books have an available ebook that you can start reading.
        If you login to the website, it gives you access to more features. 
        You can write comments and read other people's comments about different books.
        Furthermore, in your profile page you can have a list of your favorite books. 
      </Para1>
      {/* <Para1>
        If you login to the website, it gives you access to more features. 
        You can write comments and read other people's comments about different books.
      </Para1>
      <Para1>
        Furthermore, in your profile page you can have a list of your favorite books. 
      </Para1> */}
    </Wrapper>

  )
}
const Wrapper = styled.div`
  background-image: url("/images/book-light.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw;
`

const Div = styled.div`
  color: var(--background);
  padding-top: 100px;
  margin-left: 15px;
  margin-bottom: 10px;
  font-size: 22px;
  span {
    font-weight: bold;
  }
`
const Para1 = styled.div`
  color: var(--background);
  width: 1250px;
  line-height: 1.5;
  text-align: justify;
  padding-left: 15px;
  padding-right: 15px;
  font-size: 21px;
`

export default About