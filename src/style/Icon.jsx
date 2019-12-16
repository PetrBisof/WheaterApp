import React from "react";
import styled from 'styled-components';

export default styled.div`

padding-bottom:${props => props.primary ? "0rem" : "1.2rem"};
padding-top:${props => props.primary ? "0rem" : "1rem"};

`;

