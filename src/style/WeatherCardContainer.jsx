import React from "react";
import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  @media only screen and (max-width: 600px) {
  /* For everything bigger than 768px */
  flex-direction: column;
  justify-content: center;
  align-items:center;
  }

`;