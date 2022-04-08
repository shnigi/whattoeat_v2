import React, { ComponentType } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const StyledButton = styled.button`
  color: white;
  border: 10px solid #f3f3f3;
  border-radius: 100px;
  background: #fff;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 0;
`;

interface ButtonProps {
  onClick: () => void;
}

const PrimaryButton: ComponentType<ButtonProps> = ({ onClick }) => (
  <StyledButton onClick={onClick} className="commonButtonStyles">
    <FontAwesomeIcon icon={faHeart} size="3x" color="#4ECB96" />
  </StyledButton>
);

const SecondaryButton: ComponentType<ButtonProps> = ({ onClick }) => (
  <StyledButton onClick={onClick} className="commonButtonStyles">
    <FontAwesomeIcon icon={faTimes} size="3x" color="#FF6C6D" />
  </StyledButton>
);

export { PrimaryButton, SecondaryButton };
