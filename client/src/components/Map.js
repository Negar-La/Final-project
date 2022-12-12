import { useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,} from "@react-google-maps/api";
import Loader from "./Loader";
import styled from "styled-components";


const Map = ({onCloseFunc, book, center}) => {
// console.log(center) //[45.477215, -73.662711]
//convert array to object with custom keys:
const [lat, lng] = center;
const object = { lat, lng};
// console.log(object);

  //used to make sure the google map is loaded
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });


  const onMarkerClick = (e) => {
    console.log(e);
    window.alert(book.libraryName)
};

    if (!isLoaded) {
        return <Loader/>
    }
  return (
    <Wrapper>
      <Content>
         
        <GoogleMap center= {object} zoom={15} mapContainerStyle={{border: '1px solid var(--darkblue)', width: '100%', height: '100%'}}> 
             <Marker  position={object} onClick={onMarkerClick}/>
          </GoogleMap>   
          <Button onClick={onCloseFunc}>close</Button>
      </Content>
    </Wrapper>
    
     
     
    
  )
}


const Wrapper = styled.div`
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
`;
const Content = styled.div`
  background: white;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 70%;
  width: 80%;
  padding: 20px;
`;

const Button = styled.button`
  background: var(--yellow);
  border: none;
  border-radius: 4px;
  color: var(--darkblue);
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 10px 16px 8px;
  text-transform: uppercase;
  margin: 8px;
  width: 120px;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
// const Marker=styled.div`
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     width: 18px;
//     height: 18px;
//     background-color: red;
//     border: 2px solid #fff;
//     border-radius: 100%;
//     user-select: none;
//     transform: translate(-50%, -50%);
//     cursor: pointer;
//     &:hover {
//       z-index: 1;
//     }
// `;

export default Map