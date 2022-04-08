import { ComponentType } from 'react';
import React from 'react';
import styled from 'styled-components';

const StyledLoadingSpinner = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100vh;
  flex-direction: column;

  .ldsRipple {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
  }
  .ldsRipple div {
    position: absolute;
    border: 4px solid #272727;
    opacity: 1;
    border-radius: 50%;
    animation: ldsRipple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  .ldsRipple div:nth-child(2) {
    animation-delay: -0.5s;
  }
  @keyframes ldsRipple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
`;

const LoadingSpinner: ComponentType = () => (
  <StyledLoadingSpinner>
    <h1>Loading!</h1>
    <div className="ldsRipple">
      <div></div>
      <div></div>
    </div>
  </StyledLoadingSpinner>
);

export default LoadingSpinner;
