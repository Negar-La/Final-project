import styled from "styled-components";
import Loader from "./Loader";


    const SimilarBooks = ({similar, book})=>{

        // const handleClick = () => {
        //     console.log("hi")
        //     window.location.reload();
        //   };



        return (
            <FlexDiv>
            {!similar ? <Loader/>
            : similar && similar.sort(() => 0.5 - Math.random()).slice(0,3).map((category)=>{
                if(category.id !== book.id){
                    console.log(book.id)
                    console.log(category)
                    return (
                        //If you use this, it will go to the link and also reload
                        <a onClick={() => {window.location.href=`/books/${category.id}`}}>
                            <Box>
                              <Image src={category.image} alt={category.title} />
                              <Name>{category.title}</Name>
                              <AuthorSimilar>{category.author}</AuthorSimilar>
                              <AuthorSimilar>Category:  {category.categories}</AuthorSimilar>
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
border: 2px solid var(--darkblue);
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 220px;
height: 331px;
padding: 10px 25px;
margin: 10px;
text-decoration: none;
text-align: center;
border-radius: 10px;
cursor: pointer;
&:hover {
  box-shadow: rgba(0, 0, 204, 0.3) 0px 2px 3px 1px,
    rgba(0, 0, 204, 0.15) 0px 1px 3px 1px;
}
`
const FlexDiv = styled.div`
  display: flex;

  a {
    text-decoration: none;
    box-shadow: none;
    color: black;
  }
`

const Image = styled.img`
margin-top: 10px;
border-radius: 10px;
width: 134px;
height: 200px;
margin-bottom: 10px;
`;
const Name = styled.div`
width: 210px;
font-size: 19px;
align-items: center;
font-weight: bold;
margin-bottom: 10px;
`;
const AuthorSimilar = styled.div`
font-size: 16px;
color: var(--purple);
margin-bottom: 5px;
`;

    export default SimilarBooks