/**
*
* P
*
*/

import React from 'react';
import StyledP from './StyledP';


function P(props) {
  return (
    <StyledP>
     {props.message}
    </StyledP>
  );
}

P.propTypes = {};

export default P;
