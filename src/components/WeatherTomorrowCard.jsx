import React, { useState, useEffect } from "react";
import { WiDaySunny, WiDayCloudyHigh, WiCloudy, WiFog, WiSnow, WiDayCloudyGusts, Sleet, WiHail, WiNightClear, WiNightAltPartlyCloudy, WiDayRain } from "weather-icons-react";
import ReactDOM from 'react-dom';
import WeatherCardStyle from '../style/WeatherCardStyle.jsx';
import CardParagraph from '../style/CardParagraph.jsx';
import CardHeadline from '../style/CardHeadline.jsx';
import CardMaxMinParagraph from '../style/CardMaxMinParagraph.jsx';
import Icon from '../style/Icon.jsx';

const WheaterTomorrowCard = props => {

  const [icon, setIcon] = useState(<WiDaySunny size={60} color='#000' />);

let iconNew

let change = (ikonaaa) => {switch(ikonaaa) {
    case "rain":
      return <WiHail size={60} color='#000' />;
      break;
        case "clear-day":
      return <WiDaySunny size={60} color='#000' />;
      break;
          case "clear-night":
      return <WiNightClear size={60} color='#000' />;
      break;
          case "partly-cloudy-night":
      return <WiNightAltPartlyCloudy size={60} color='#000' />;
      break;
          case "partly-cloudy-day":
      return <WiDayCloudyHigh size={60} color='#000' />;
      break;
          case "cloudy":
      return <WiCloudy size={60} color='#000' />;
      break;
          case "rain":
      return <WiHail size={60} color='#000' />;
      break;
          case "sleet":
      return <WiSleet size={60} color='#000' />;
      break;
       case "snow":
      return <WiSnow size={60} color='#000' />;
      break;
       case "wind":
      return <WiDayCloudyGusts size={60} color='#000' />;
      break;
       case "fog":
      return <WiFog size={60} color='#000' />;
      break;
    default:
      return "Loading...";
      break;
  };}

//partly-cloudy-day




  return (
    <>
    <WeatherCardStyle>
        <CardHeadline >{props.headline}</CardHeadline>
        <Icon>{change(props.icon)}</Icon>
        <CardParagraph primary>Summary:</CardParagraph>
        <CardParagraph>{props.summary}</CardParagraph>
        <CardParagraph primary>Humidity:</CardParagraph>
        <CardParagraph>{props.humidity}</CardParagraph>
        <CardMaxMinParagraph primary>MaxTemperature:</CardMaxMinParagraph>
        <CardMaxMinParagraph>{props.temperatureHigh}</CardMaxMinParagraph>
        <CardMaxMinParagraph primary>MinTemperature:</CardMaxMinParagraph>
        <CardMaxMinParagraph>{props.temperatureLow}</CardMaxMinParagraph>
    </WeatherCardStyle>
    </>
  );
};

export default WheaterTomorrowCard;