import React, { useState, useEffect } from "react";
import { WiDaySunny, WiDayCloudyHigh, WiCloudy, WiFog, WiSnow, WiDayCloudyGusts, Sleet, WiHail, WiNightClear, WiNightAltPartlyCloudy, WiDayRain } from "weather-icons-react";
import ReactDOM from 'react-dom';
import WeatherCardStyle from '../style/WeatherCardStyle.jsx';
import CardFiveHoursParagraph from '../style/CardFiveHoursParagraph.jsx';

const HourCard = props => {


  return (
    <>
    <WeatherCardStyle primary>
        <CardFiveHoursParagraph primary>Temperature</CardFiveHoursParagraph>
        <CardFiveHoursParagraph>{props.temperature}</CardFiveHoursParagraph>
        <CardFiveHoursParagraph primary>Humidity</CardFiveHoursParagraph>
        <CardFiveHoursParagraph>{props.humidity}</CardFiveHoursParagraph>
    </WeatherCardStyle>
    </>
  );
};

export default HourCard;