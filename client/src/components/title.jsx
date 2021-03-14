import { Typography } from '@material-ui/core';
import React from 'react';

const Title = ({ title }) => {
  return (
    <Typography variant="h4" style={{ color: 'white', fontWeight: 300 }}>
      {title}
    </Typography>
  );
};

export default Title;
