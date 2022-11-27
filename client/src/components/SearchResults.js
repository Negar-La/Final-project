import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SearchResults = ({items}) => {
 console.log(items)
  const {searchTerm} = useParams();
  const [searchedItems, setSearchedItems] = useState(null);



  return (
    <div>
      {items.map((book)=>{
        return (
          <>
            <img src={book.volumeInfo.imageLinks.smallThumbnail}/>
          </>
        )
      })

      }

    </div>
  )
}

export default SearchResults