import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { WiDaySunny } from "weather-icons-react";
import Title from '../style/Title.jsx';
import All from '../style/All.jsx';
import Content from '../style/Content.jsx';

import styled from 'styled-components';


/* import reactstrap from 'reactstrap'; */
import WheaterCard from './WheaterCard.jsx';
import HourCard from './HourCard.jsx';
import ReactAnimatedWeather from 'react-animated-weather';
import WeatherCardContainer  from '../style/WeatherCardContainer.jsx';
import Form  from '../style/Form.jsx';
import Input  from '../style/Input.jsx';
/* import './../weather-icons.css'; */

/* import Skycons from 'react-skycons' */



const App = props => {

const [wheaterCurrentData, setWheaterCurrentData] = useState([]);

const [wheaterTomorrowData, setWheaterTomorrowData] = useState([]);

const [wheaterAfterTomorrowData, setWheaterAfterTomorrowData] = useState([]);

const [dailyData, setDailyData] = useState([]);

const [formInputValues, setFormInputValues] = useState({ place: ''});

const [placePosition, setPlacePosition] = useState({lat: 0, lng: 0});

const [oneHour, setOneHour] = useState();


 const handleInputChange = e => {
  setFormInputValues({
    ...formInputValues,
    [e.target.id]: e.target.value
  })
};


  const callAPI = () => {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const URL =     "https://api.darksky.net/forecast/c9271eef8cb7f51c8d4b1bf066d4e9cd/" + placePosition.lat + "," + placePosition.lng + "?units=si";
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
      
      if(data != "" && typeof placePosition != 'string') { 
     
        setWheaterCurrentData(data.currently/* hourly.data[0] */);
        setWheaterTomorrowData(data.daily.data[1]);
        setWheaterAfterTomorrowData(data.daily.data[2]);
        setDailyData(data.hourly.data);
      } else {
        setWheaterCurrentData("error");
        setWheaterTomorrowData("error");
        setWheaterAfterTomorrowData("error");
        setDailyData("error");
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
      
      if(data != "" && data.total_results != 0) { 
        console.log(data.results[0].geometry)
          setPlacePosition(data.results[0].geometry);
/*         console.log(data.results[0].geometry) */
      } else if (data.total_results == 0) {
          setPlacePosition("error unknown place");
      }
        else {
          setPlacePosition("error");
      }
    
    })
  };

const setHours = () => {
   if(dailyData != "" && dailyData != "error") {
    setOneHour(dailyData.map((hour, index) => {
      if (index < 5){
    return  ( 
         <HourCard 
          key= {index}
          humidity = {hour.humidity}
          temperature = {hour.temperature}
         />
      )}
      }
    ))
    }

    else if (dailyData == 'error'){

    setOneHour('There has occured an error. You have probably incorrectly written name of the place. Please try again (in English).')}
}

useEffect(() => {
   callAPI();
  }, [])

useEffect(() => {
   callAPI();
  }, [placePosition])

useEffect(() => {
  setHours();
}, [dailyData])







  return (
  <>
  <All>
  <Content>
  <Title>Weather App</Title>

  <Form>
    <Input
      id="place"
      type="text"
      value={formInputValues.place}
      onChange={handleInputChange}
    />
    <button onClick={getPosition} style={{border: '1px solid blue', margin: '5px'}}>Submit</button>
{/*         {formSubmitSuccess === true && <h3>Congrats!</h3>}
        {formSubmitSuccess === false && <h3 style={{ color: 'red'}}>Error Occurred, try again later</h3>} */}
  </Form>

    {console.log('tomorrow', wheaterTomorrowData)}
    <WeatherCardContainer>{console.log(placePosition)}
    <WheaterCard summary = {wheaterCurrentData.summary}
    humidity = {wheaterCurrentData.humidity}
    temperature = {Math.round(wheaterCurrentData.temperature*10)/10} 
    icon = {wheaterCurrentData.icon} />

   <WheaterCard summary = {wheaterTomorrowData.summary}
    humidity = {wheaterTomorrowData.humidity}
    temperature = {wheaterTomorrowData.temperatureLow}
    icon = {wheaterTomorrowData.icon} />

    <WheaterCard summary = {wheaterAfterTomorrowData.summary}
    humidity = {wheaterAfterTomorrowData.humidity}
    temperature = {wheaterAfterTomorrowData.temperatureLow} 
    icon = {wheaterAfterTomorrowData.icon} />
    </ WeatherCardContainer> 
    {oneHour}
    </ Content>
    </All>
    </>
  );

  
}
export default App;
 