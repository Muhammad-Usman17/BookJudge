//  lib
import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
//  src
import './LoadingBar.css';

const LoadingBar = (
  <div className="LoadingBar-div">
    <CircularProgress color="secondary" />
    <p>Loading...</p>
  </div>
);

export default LoadingBar;
