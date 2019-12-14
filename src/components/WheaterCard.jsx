import React, { useState, useEffect } from "react";

const WheaterCard = props => {
  return (
    <>
    <div className="direction">
        <p>{props.summary}</p>
        <p>{props.humidity}</p>
        <p>{props.temperature}</p>
    </div>
    </>
  );
};

export default WheaterCard;