import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { WiDaySunny } from "weather-icons-react";
import Title from '../style/Title.jsx';
import Content from '../style/Content.jsx';
import WeatherCard from './WeatherCard.jsx';
import styled from 'styled-components';
import WeatherDayAfterTomorrowCard from './WeatherDayAfterTomorrowCard.jsx';
import WeatherTomorrowCard from './WeatherTomorrowCard.jsx';
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
import Warning from '../style/Warning.jsx';
import Label from '../style/Label.jsx';

const App = props => {

const [weatherCurrentData, setWeatherCurrentData] = useState([]);

const [weatherTomorrowData, setWeatherTomorrowData] = useState([]);

const [weatherAfterTomorrowData, setWeatherAfterTomorrowData] = useState([]);

const [dailyData, setDailyData] = useState([]);

const [formInputValues, setFormInputValues] = useState({ place: 'Prague'});

const [placePosition, setPlacePosition] = useState({lat: 50.08804, lng: 14.42076});

const [placeName, setPlaceName] = useState('Prague');

const [placeMap, setPlaceMap] = useState('https://www.openstreetmap.org/?mlat=50.08747&mlon=14.42125#map=16/50.08747/14.42125');

const [oneHour, setOneHour] = useState();

const [background, setBackground] = useState("/img/winter.jpg");

//Array for choosing background
const pictures = ["/img/sunNew.jpg", "/img/house.jpg", "/img/sun.jpg", "/img/field.jpg", "/img/garden.jpg", "/img/cityRain.jpg", "/img/night.jpg", "/img/winter.jpg","/img/clearNight.jpg", "/img/winterCity.jpg"];

//function for creating random number, which will be index of background image from pictures array
const randomNumber = () => Math.floor(Math.random() * 10);

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
     
        setWeatherCurrentData(data.currently/* hourly.data[0] */);
        setWeatherTomorrowData(data.daily.data[1]);
        setWeatherAfterTomorrowData(data.daily.data[2]);
        setDailyData(data.hourly.data);
      } else {
        setWeatherCurrentData("error");
        setWeatherTomorrowData("error");
        setWeatherAfterTomorrowData("error");
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
    <Label htmlFor="place">Please insert name on city below and click on Submit</Label>
    <Input
      id="place"
      type="text"
      placeholder="Insert name of place (in English)."
      
      value={formInputValues.place}
      onChange={handleInputChange}
    />
    <Button onClick={getPosition} style={{border: '1px solid blue', margin: '5px'}}>Submit</Button>
    <Warning>An error has occured. Probably you have incorrectly entered name of the city. Please try again.</Warning>
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
        <Label htmlFor="place">Please insert name on city below and click on Submit</Label>
        <Input
          id="place"
          type="text"
          placeholder="Insert name of place (in English)."
          value={formInputValues.place}
          onChange={handleInputChange}
        />
        <Button onClick={getPosition}>Submit</Button>
      </Form>

        <WeatherCardContainer>
          <WeatherCard headline = "Current"
              summary = {weatherCurrentData.summary}
              humidity = {weatherCurrentData.humidity + " %"}
              temperature = {round(weatherCurrentData.temperature)} 
              icon = {weatherCurrentData.icon} />

          <WeatherTomorrowCard headline = "Tomorrow"
            summary = {weatherTomorrowData.summary}
              humidity = {weatherTomorrowData.humidity + " %"}
              temperatureLow = {round(weatherTomorrowData.temperatureLow)}
              temperatureHigh = {round(weatherTomorrowData.temperatureHigh)}
              icon = {weatherTomorrowData.icon} />

          <WeatherDayAfterTomorrowCard headline = "Day After Tomorrow"          
              summary = {weatherAfterTomorrowData.summary}
              humidity = {weatherAfterTomorrowData.humidity + " %"}
              temperatureHigh = {round(weatherAfterTomorrowData.temperatureHigh)}
              temperatureLow = {round(weatherAfterTomorrowData.temperatureLow)} 
              icon = {weatherAfterTomorrowData.icon} />
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
 