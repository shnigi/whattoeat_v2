import { PrimaryButton, SecondaryButton } from './Button';
import React, { ComponentType } from 'react';

import styled from 'styled-components';

interface ButtonProps {
  left: () => void;
  right: () => void;
  disabled?: boolean;
}

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 18px;
`;

const CardButtons: ComponentType<ButtonProps> = ({ left, right, disabled }) => (
  <StyledButtonContainer>
    <SecondaryButton onClick={left} disabled={disabled}></SecondaryButton>
    <PrimaryButton onClick={right} disabled={disabled}></PrimaryButton>
  </StyledButtonContainer>
);

export default CardButtons;
