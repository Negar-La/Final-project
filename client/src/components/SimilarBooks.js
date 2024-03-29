import styled from "styled-components";
import Loader from "./Loader";
import { useEffect, useState } from "react";

const SimilarBooks = ({ similar, book }) => {
  const [randomSimilarBooks, setRandomSimilarBooks] = useState(null);

  useEffect(() => {
    if (similar && !randomSimilarBooks) {
      const randomBooks = similar
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .filter((category) => category.id !== book.id);

      setRandomSimilarBooks(randomBooks);
    }
  }, [similar, book, randomSimilarBooks]);

  return (
    <FlexDiv>
      {!randomSimilarBooks ? (
        <Loader />
      ) : (
        randomSimilarBooks.map((category) => (
          <a
            key={category.id}
            onClick={() => {
              window.location.href = `/books/${category.id}`;
            }}
          >
            <Box>
              <Image src={category.image} alt={category.title} />
              <Name>{category.title}</Name>
              <AuthorSimilar>{category.author}</AuthorSimilar>
              <AuthorSimilar2>Category: {category.categories}</AuthorSimilar2>
            </Box>
          </a>
        ))
      )}
    </FlexDiv>
  );
};

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 341px;
  padding: 10px 25px;
  margin: 10px;
  text-decoration: none;
  text-align: center;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(255, 201, 113, 0.8) -3px 2px 4px 3px,
      rgba(255, 201, 113, 0.8) 0px 1px 3px 1px;
  }
`;
const FlexDiv = styled.div`
  display: flex;
  a {
    text-decoration: none;
    box-shadow: none;
  }
  @media (max-width: 500px) {
    flex-direction: column;
  }
  @media (min-width: 500.02px) and (max-width: 750px) {
    margin-left: 0px;
  }
`;

const Image = styled.img`
  margin-top: 10px;
  border-radius: 10px;
  width: 129px;
  height: 196px;
  margin-bottom: 5px;
`;

const Name = styled.div`
  width: 175px;
  font-size: 17px;
  align-items: center;
  margin-bottom: 5px;
  @media (max-width: 500px) {
    text-overflow: ellipsis;
    font-size: 16px;
  }
`;
const AuthorSimilar = styled.div`
  width: 175px;
  font-size: 14px;
  margin-bottom: 4px;
  @media (max-width: 500px) {
    text-overflow: ellipsis;
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

export default SimilarBooks;
