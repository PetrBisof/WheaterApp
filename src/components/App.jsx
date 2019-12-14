var Skycons = require('react-skycons');
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { WiDaySunny } from "weather-icons-react";


/* import reactstrap from 'reactstrap'; */
import WheaterCard from './WheaterCard.jsx';
import ReactAnimatedWeather from 'react-animated-weather';
/* import './../weather-icons.css'; */

/* import Skycons from 'react-skycons' */



const App = props => {

const [wheaterCurrentData, setWheaterCurrentData] = useState([]);

const [wheaterTomorrowData, setWheaterTomorrowData] = useState([]);

const [wheaterAfterTomorrowData, setWheaterAfterTomorrowData] = useState([]);

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
        setWheaterTomorrowData(data.daily.data[1]);
        setWheaterAfterTomorrowData(data.daily.data[2]);

        console.log('data',data.daily.data[1])
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

/* skycons.add(document.getElementById("icon2"), Skycons.RAIN); */


  return (
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
    {console.log('tomorrow', wheaterTomorrowData)}
    <WheaterCard summary = {wheaterCurrentData.summary}
    humidity = {wheaterCurrentData.humidity}
    temperature = {wheaterCurrentData.temperature}
    icon = {wheaterCurrentData.icon} />
   <WheaterCard summary = {wheaterTomorrowData.summary}
    humidity = {wheaterTomorrowData.humidity}
    temperature = {wheaterTomorrowData.temperatureLow}
    icon = {wheaterTomorrowData.icon} />
    <WheaterCard summary = {wheaterAfterTomorrowData.summary}
    humidity = {wheaterAfterTomorrowData.humidity}
    temperature = {wheaterAfterTomorrowData.temperatureLow} 
    icon = {wheaterAfterTomorrowData.icon} />
    <i icon={wheaterCurrentData.icon}></i>
    <canvas id="icon2" width="128" height="128"></canvas>
    <WiDaySunny size={60} color='#000' />
    {console.log("ikonnnnnnnnnnnna", wheaterCurrentData.icon)}

    </>
  );
};
export default App;
 