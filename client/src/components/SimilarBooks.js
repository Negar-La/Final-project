import styled from "styled-components";
import Loader from "./Loader";


    const SimilarBooks = ({similar, book})=>{

        return (
            <FlexDiv>
            {!similar ? <Loader/>
            : similar && similar.sort(() => 0.5 - Math.random()).slice(0,3).map((category)=>{
                if(category.id !== book.id){
                    // console.log(book.id)
                    // console.log(category)
                    return (
                        //If you use this, it will go to the link and also reload
                        <a key={category.id} onClick={() => {window.location.href=`/books/${category.id}`}}>
                            <Box>
                              <Image src={category.image} alt={category.title} />
                              <Name>{category.title}</Name>
                              <AuthorSimilar>{category.author}</AuthorSimilar>
                              <AuthorSimilar2>Category:  {category.categories}</AuthorSimilar2>
                            </Box>
                        </a>
                    )
                }
            }
            )}
          </FlexDiv>
        )
    }

 
const Box = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 180px;
height: 220px;
margin: 10px;
text-decoration: none;
text-align: center;
border-radius: 10px;
cursor: pointer;
&:hover {
    box-shadow: rgba(255, 201, 113, 0.8) -3px 2px 4px 3px,
      rgba(255, 201, 113, 0.8) 0px 1px 3px 1px;
  }
  @media (max-width: 500px) {
    width: 100px;
    align-items: flex-start;
    justify-content: flex-start;
  }
`
const FlexDiv = styled.div`
  display: flex;
  a {
    text-decoration: none;
    box-shadow: none;
  }
  @media (max-width: 500px) {
    width: 350px;
  }
`

const Image = styled.img`
margin-top: 10px;
border-radius: 10px;
width: 100px;
height: 120px;
margin-bottom: 5px;
`;

const Name = styled.div`
width: 175px;
font-size: 17px;
align-items: center;
margin-bottom: 5px;
@media (max-width: 500px) {
  font-size: 16px;
  width: 100px;
  }
`;
const AuthorSimilar = styled.div`
width: 175px;
font-size: 14px;
margin-bottom: 4px;
@media (max-width: 500px) {
  width: 100px;
  }
`;

const AuthorSimilar2 = styled.div`
width: 175px;
font-size: 14px;
/* color: var(--purple); */
margin-bottom: 4px;
  @media (max-width: 500px) {
    visibility: hidden;
  }
`;

    export default SimilarBooks