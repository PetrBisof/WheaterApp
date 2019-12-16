import React from "react";
import styled from 'styled-components';

export default styled.div`
  width: 45rem;
  height: 100%;
  display: flex;
  flex-direction: column;

@media only screen and (max-width: 600px) {
  /* For everything bigger than 768px */
  width: auto;
  justify-content: center;
  align-items: center;
`;