/**
*
* Button
*
*/

import React from 'react';
import StyledBtn from './StyledBtn';

import { FormattedMessage } from 'react-intl';

function Button(props) {
  return (
    <StyledBtn>
     {props.message}
    </StyledBtn>
  );
}

Button.propTypes = {};

export default Button;
