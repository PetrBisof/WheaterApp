import React, { useState, useEffect } from "react";
import { WiDaySunny, WiDayCloudyHigh, WiCloudy, WiFog, WiSnow, WiDayCloudyGusts, Sleet, WiHail, WiNightClear, WiNightAltPartlyCloudy, WiDayRain } from "weather-icons-react";
import ReactDOM from 'react-dom';
import WeatherCardStyle from '../style/WeatherCardStyle.jsx';
import CardParagraph from '../style/CardParagraph.jsx';

const HourCard = props => {


  return (
    <>
    <WeatherCardStyle>
        <CardParagraph>{props.humidity}</CardParagraph>
        <CardParagraph>{props.temperature}</CardParagraph>
    </WeatherCardStyle>
    </>
  );
};

export default HourCard;