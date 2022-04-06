import { ComponentType } from 'react';
import React from 'react';

const LoadingSpinner: ComponentType = () => (
  <div className="loadingContainer">
    <h1>Loading!</h1>
    <div className="ldsRipple">
      <div></div>
      <div></div>
    </div>
  </div>
);

export default LoadingSpinner;
