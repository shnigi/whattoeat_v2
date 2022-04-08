import { PrimaryButton, SecondaryButton } from './Button';
import React, { ComponentType } from 'react';

import styled from 'styled-components';

interface ButtonProps {
  left: () => void;
  right: () => void;
}

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 15px;
`;

const CardButtons: ComponentType<ButtonProps> = ({ left, right }) => (
  <StyledButtonContainer>
    <SecondaryButton onClick={left}></SecondaryButton>
    <PrimaryButton onClick={right}></PrimaryButton>
  </StyledButtonContainer>
);

export default CardButtons;
