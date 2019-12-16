import React from "react";
import styled from 'styled-components';

export default styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 5rem;
width: 100%
background-color: white;
opacity: 0.8;
margin: 1rem;
border-radius: 1rem;

@media only screen and (max-width: 600px) {
  /* For everything bigger than 768px */
  display: flex;
  width: 70%;
  height: auto;}
`;
