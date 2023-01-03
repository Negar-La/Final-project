import styled from "styled-components";
import {AiOutlineArrowLeft} from "react-icons/ai";
import {AiOutlineArrowRight} from "react-icons/ai";

const Pagination = props => {
    //props from Product Page, go there to see more
    const {
        currentPage, // current page
        setCurrentPage, // set current page
        searchedItems, // searchedItems being paginated
    } = props;
 
    const limit = 12; // PAGINATION LIMIT OF ITEMS PER PAGE. 
    let pages = searchedItems?.length/limit; // number of pages is total # of searchedItems/limit
    pages = Math.ceil(pages) // round up page total
    
    
    // if user presses forward arrow, increase by 1. if it is at last page, do not allow to increase page number
    const currentPageHandler = () => {
        if (currentPage >= pages) {
        }
        else {
            setCurrentPage(currentPage + 1)
    }
       
    }
  // if user presses back arrow, decrease by 1. if it is at first page, do not allow to decrease page number
    const backPageHandler = () => {
        if (currentPage <= 1) {
        }
        else {
            setCurrentPage(currentPage - 1)
        }
    }

    return(
        <>
        <Wrapper>
            {
            currentPage &&
            <>
            <PageOfPage className="pagination">
                Page {currentPage} of {pages} 
                
            </PageOfPage>
            <NextPageContainer>
                <button onClick={backPageHandler}> <AiOutlineArrowLeft size={20} /> </button>
                <button onClick={currentPageHandler}>  <AiOutlineArrowRight size={20} /> </button>
            </NextPageContainer>
            </>
          }
        </Wrapper>
        </>
        
    )
    
};

const NextPageContainer = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    width: 100px;
    margin-right: 10px;
    font-weight: bold;
button {
         border: none;
         border-radius: 10px;
         padding: 5px;
         background-color: var(--background);
         color: black;
         cursor: pointer;
         transition: background-color 0.3s;
          &:hover {
          background-color: var(--yellow);
  }
   }`

const PageOfPage = styled.div`
   font-weight: bold;
   margin-left: 10px;
   margin-right: 80px;
   @media (max-width: 500px) {
    width: 100px;
  }
`
const Wrapper = styled.div`
    display: flex;
    margin: 100px;
    align-items: center;

    display:flex;
    justify-content: space-between;
    /* border: 2px solid green; */
`



export default Pagination;