// lib
import React from 'react';
import Fade from '@material-ui/core/Fade';
import LinearProgress from '@material-ui/core/LinearProgress';

const ProgressBar = props => {
  const { isLoading } = props;
  return (
    <Fade
      in={isLoading}
      style={{
        transitionDelay: isLoading ? '800ms' : '0ms',
      }}
    >
      <LinearProgress color="secondary" variant="query" />
    </Fade>
  );
};
export default ProgressBar;
