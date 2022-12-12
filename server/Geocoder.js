const request = require('request-promise');

//Gives latt and longt from the postal code 
const getLocFromPlCode = async (postalCode) => {
  try {

    //   https://geocoder.ca/?examples=1
    const response = await request(`https://geocoder.ca/?postal=${postalCode}&geoit=XML&json=1`);
    
    const data = JSON.parse(response);
      return {
      lat: data.latt,
      lng: data.longt,
    };
  } catch (err) {
    console.log('Error: ', err);
  }
};


getLocFromPlCode("H4X 1Y8").then((result) => console.log(result));

module.exports= {getLocFromPlCode}