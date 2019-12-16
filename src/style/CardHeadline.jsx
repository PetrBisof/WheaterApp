import React from "react";
import styled from 'styled-components';

export default styled.h1`
 @import url('https://fonts.googleapis.com/css?family=Lobster&display=swap');
margin: 0;

padding-top: 0.5rem;
font-size: ${props => props.primary ? "1.2rem" : "1.6rem"};
font-family: 'Lobster';
`;
