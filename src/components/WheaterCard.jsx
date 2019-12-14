import React, { useState, useEffect } from "react";
import { WiDaySunny, WiHail } from "weather-icons-react";
import ReactDOM from 'react-dom';

const WheaterCard = props => {

  const [icon, setIcon] = useState(<WiDaySunny size={60} color='#000' />);

let iconNew

let change = (ikonaaa) => {switch(ikonaaa) {
    case "rain":
      return <WiHail size={60} color='#000' />;
      break;
    default:
      return <WiDaySunny size={60} color='#000' />;
      break;
  };}

//partly-cloudy-day




  return (
    <>
    <div className="direction">
        {change(props.icon)}
        <p>{props.summary}</p>
        <p>{props.humidity}</p>
        <p>{props.temperature}</p>
      {console.log("ikona",props.humidity)}
    </div>
    </>
  );
};

export default WheaterCard;