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
  width: 92px;
  height: 92px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  outline: 0;
  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  gap: 3px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const PrimaryButton: ComponentType<ButtonProps> = ({ onClick, disabled }) => (
  <StyledButton onClick={onClick} disabled={disabled} className="commonButtonStyles" aria-label="Like">
    <FontAwesomeIcon icon={faHeart} size="2x" color="#4ECB96" />
    <span style={{ color: '#4ECB96' }}>Like</span>
  </StyledButton>
);

const SecondaryButton: ComponentType<ButtonProps> = ({ onClick, disabled }) => (
  <StyledButton onClick={onClick} disabled={disabled} className="commonButtonStyles" aria-label="Decline">
    <FontAwesomeIcon icon={faTimes} size="2x" color="#FF6C6D" />
    <span style={{ color: '#FF6C6D' }}>Decline</span>
  </StyledButton>
);

export { PrimaryButton, SecondaryButton };
