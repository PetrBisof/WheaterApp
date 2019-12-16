import React from "react";
import styled from 'styled-components';

export default styled.div`
display: flex;
flex-direction: column;
align-items: center;
align-content:space-between;
justify-content: space-between;
text-align: center;
width : 10rem;
min-height:${props => props.primary ? "0rem" : "27rem"};
border-radius: 1rem;
background-color: white;
opacity: 0.8;
margin: 1rem;

@media only screen and (max-width: 600px) {
  /* For everything bigger than 768px */
  width: 80%;
  height: auto;
`;