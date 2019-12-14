
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import WheaterCard from './WheaterCard.jsx'



const App = props => {

const [wheaterCurrentData, setWheaterCurrentData] = useState([]);

const [formInputValues, setFormInputValues] = useState({ place: ''});
const [placePosition, setPlacePosition] = useState({lat: 0, lng: 0});


 const handleInputChange = e => {
  setFormInputValues({
    ...formInputValues,
    [e.target.id]: e.target.value
  })
};

  const callAPI = () => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const URL =     "https://api.darksky.net/forecast/c9271eef8cb7f51c8d4b1bf066d4e9cd/" + placePosition.lat + "," + placePosition.lng;
    console.log("place", placePosition.lat);
    fetch(proxyUrl + URL, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Headers":"x-requested-with, Content-Type, origin, authorization, accept, client-security-token",
          "Access-Control-Allow-Origin":URL
      }
    })
    .then(response => response.json())
    .then(data => {
      
      if(data != "") { 
     
        setWheaterCurrentData(data.hourly.data[0]);
        console.log(data.currently)
      } else {
        setWheaterCurrentData("error");
      }
    
    })
  }

  const getPosition = (e) =>  {
    e.preventDefault()
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const URL = "https://api.opencagedata.com/geocode/v1/json?q=" + formInputValues.place + "&key=ba6d8a3e67ba47f1b2be3a247eb42d69 ";
      fetch(proxyUrl + URL, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Headers":"x-requested-with, Content-Type, origin, authorization, accept, client-security-token",
          "Access-Control-Allow-Origin":URL
      }
    })
    .then(response => response.json())
    .then(data => {
      
      if(data != "") { 
        console.log(data.results[0].geometry)
          setPlacePosition(data.results[0].geometry);
/*         console.log(data.results[0].geometry) */
      } else {
        setWheaterData("error");
      }
    
    })
  };

useEffect(() => {
   callAPI();
  }, [])

useEffect(() => {
   callAPI();
  }, [placePosition])


  return (
  console.log(wheaterCurrentData.time),
  console.log('placeInput', formInputValues.place),
  <>
  <form style={{ display: 'flex', flexDirection: 'column'}}>
    <input
      id="place"
      type="text"
      value={formInputValues.place}
      onChange={handleInputChange}
    />
          <button onClick={getPosition} style={{border: '1px solid blue', margin: '5px'}}>Submit</button>
{/*         {formSubmitSuccess === true && <h3>Congrats!</h3>}
        {formSubmitSuccess === false && <h3 style={{ color: 'red'}}>Error Occurred, try again later</h3>} */}
    </form>
    <p>{wheaterCurrentData.summary}</p>
    <WheaterCard summary = {wheaterCurrentData.summary}
    humidity = {wheaterCurrentData.humidity}
    temperature = {wheaterCurrentData.temperature} />
    </>
  );
};

export default App;
 
