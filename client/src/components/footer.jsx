import Typography from '@material-ui/core/Typography';
import React from 'react';

function Copyright() {
  return (
    <Typography
      style={{
        padding: '25px',
        background: '#212121',
        color: '#b7b7b7',
        width: '100%',
        height: '90px',
        display: 'flex',
        alignItems: 'flex-end',
      }}
      variant="body2"
      color="textSecondary"
      align="center"
    >
      {'Copyright © by Eden Bambaron '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Footer = () => {
  return Copyright();
};

export default Footer;
