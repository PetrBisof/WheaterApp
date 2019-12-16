import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { WiDaySunny } from "weather-icons-react";
import Title from '../style/Title.jsx';
import Content from '../style/Content.jsx';
import WheaterCard from './WheaterCard.jsx';
import styled from 'styled-components';
import WheaterDayAfterTomorrowCard from './WheaterDayAfterTomorrowCard.jsx';
import WheaterTomorrowCard from './WheaterTomorrowCard.jsx';
import HourCard from './HourCard.jsx';

//style import
import All from '../style/All.jsx';
import WeatherCardContainer  from '../style/WeatherCardContainer.jsx';
import Form  from '../style/Form.jsx';
import Input  from '../style/Input.jsx';
import Body  from '../style/Body.jsx';
import Button  from '../style/Button.jsx';
import FiveHoursSignFrame from '../style/FiveHoursSignFrame.jsx';
import FiveHoursSign from '../style/FiveHoursSign.jsx';
import FiveHoursContainer from '../style/FiveHoursContainer.jsx';

const App = props => {

const [wheaterCurrentData, setWheaterCurrentData] = useState([]);

const [wheaterTomorrowData, setWheaterTomorrowData] = useState([]);

const [wheaterAfterTomorrowData, setWheaterAfterTomorrowData] = useState([]);

const [dailyData, setDailyData] = useState([]);

const [formInputValues, setFormInputValues] = useState({ place: 'Prague'});

const [placePosition, setPlacePosition] = useState({lat: 50.08804, lng: 14.42076});

const [placeName, setPlaceName] = useState('Prague');

const [placeMap, setPlaceMap] = useState('https://www.openstreetmap.org/?mlat=50.08747&mlon=14.42125#map=16/50.08747/14.42125');

const [oneHour, setOneHour] = useState();

const [background, setBackground] = useState("/img/night.jpg");

//Array for choosing background
const pictures = ["/img/sunNew.jpg", "/img/house.jpg", "/img/sun.jpg", "/img/field.jpg", "/img/garden.jpg", "/img/cityRain.jpg", "/img/night.jpg"];

//function for creating random number, which will be index of background image from pictures array
const randomNumber = () => Math.floor(Math.random() * 7);

//function for round up Celsius number
const round = (number) => {
  return (Math.round(number*10)/10 + " °C")
} 

const handleInputChange = e => {
  setFormInputValues({
    ...formInputValues,
    [e.target.id]: e.target.value
  })
};

// based on entered place get information about weather from darkskt.net
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

//get longitude and latitude of place, which was entered by user
  const getPosition = (e) =>  {
    e.preventDefault();
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
        console.log("map Url", data.results[0].annotations.OSM.url);
          setPlacePosition(data.results[0].geometry);
          setPlaceName(formInputValues.place);
          setPlaceMap(data.results[0].annotations.OSM.url);
          //creates new backgroundimage - when it is inside this function, it is called only when user clicks on Submit, that's what I wanted, otherwise background image was changed when user entered new character into Input
          setBackground(pictures[randomNumber()]);
/*           setPlaceName(placeInfo => [...placeInfo, data.results[0].geometry]);
          setPlaceInfo(placeInfo => [...placeInfo, data.results[0].annotations]); */
/*         console.log(data.results[0].geometry) */
      } else if (data.total_results == 0) {
          setPlacePosition("error unknown place");
      }
        else {
          setPlacePosition("error");
      }     
    
    })
  };

// map dailyData and create five HourCards components
const setHours = () => {
   if(dailyData != "" && dailyData != "error") {
    setOneHour(dailyData.map((hour, index) => {
      if (index < 5){
    return  ( 
         <HourCard 
          key= {index}
          humidity = {hour.humidity + " %"}
          temperature = {round(hour.temperature)}
         />
      )}
      }
    ))
    }
    else if (dailyData == 'error'){
    setOneHour('error')}
}

//call API when site is loaded
useEffect(() => {
   callAPI();
  }, [])

//call API when user enters new position and there are new placePosition data
useEffect(() => {
   callAPI();
  }, [placePosition])

//call setHours() for creating new HourCards components when dailyData has been changed
useEffect(() => {
  setHours();
}, [dailyData])


//render error message when there are no valid placePosition data
if (placePosition == "error unknown place" || placePosition == "error"){
   return (
  <>
  <All imgUrl = {background}>
  <Content>
  <Title>Weather App</Title>
  <Form>
    <Input
      id="place"
      type="text"
      placeholder="Insert name of place (in English)."
      value={formInputValues.place}
      onChange={handleInputChange}
    />
    <button onClick={getPosition} style={{border: '1px solid blue', margin: '5px'}}>Submit</button>
  </Form>
  </Content>
  </All>
  </>
  )
}

else {
  return (
  <>
  {/* <Body> -- I tried to get of body margin, but that wasn't working with Styled Componenets, I have done it in html file in the end */}
  <All imgUrl = {background}>
    <Content>
      <Title>Weather App</Title>

      <Form>
        <Input
          id="place"
          type="text"
          placeholder="Insert name of place (in English)."
          value={formInputValues.place}
          onChange={handleInputChange}
        />
        <Button onClick={getPosition}>Submit</Button>
      </Form>

        <WeatherCardContainer>{console.log(placePosition)}
          <WheaterCard headline = "Current"
              summary = {wheaterCurrentData.summary}
              humidity = {wheaterCurrentData.humidity + " %"}
              temperature = {round(wheaterCurrentData.temperature)} 
              icon = {wheaterCurrentData.icon} />

          <WheaterTomorrowCard headline = "Tomorrow"
            summary = {wheaterTomorrowData.summary}
              humidity = {wheaterTomorrowData.humidity + " %"}
              temperatureLow = {round(wheaterTomorrowData.temperatureLow)}
              temperatureHigh = {round(wheaterTomorrowData.temperatureHigh)}
              icon = {wheaterTomorrowData.icon} />

          <WheaterDayAfterTomorrowCard headline = "Day After Tomorrow"          
              summary = {wheaterAfterTomorrowData.summary}
              humidity = {wheaterAfterTomorrowData.humidity + " %"}
              temperatureHigh = {round(wheaterAfterTomorrowData.temperatureHigh)}
              temperatureLow = {round(wheaterAfterTomorrowData.temperatureLow)} 
              icon = {wheaterAfterTomorrowData.icon} />
        </ WeatherCardContainer>

        <FiveHoursSignFrame>
          <FiveHoursSign>Weather next five hours</FiveHoursSign>
        </ FiveHoursSignFrame>

        <FiveHoursContainer> 
         {oneHour}
        </ FiveHoursContainer>
         
        <FiveHoursSignFrame>
          <FiveHoursSign>Showing weather in city {placeName}</FiveHoursSign>
          <FiveHoursSign><a href = {placeMap} target = "_blank">Go to map</a></FiveHoursSign>
        </ FiveHoursSignFrame>
      </ Content>
    </All>
    {/* </ Body> -- I tried to get of body margin, but that wasn't working with Styled Componenets, I have done it in html file in the end */}
    </>
    )
  ;}

  
}
export default App;
 