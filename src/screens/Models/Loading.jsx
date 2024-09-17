import React from 'react';
import './Loading.css';

const LoadingScreen = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <img src="./../../../src/assets/Loading.gif" alt="Loading..." />
      </div>
    </div>
  );
};

export default LoadingScreen;
