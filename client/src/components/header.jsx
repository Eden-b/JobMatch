import React from 'react';
import headerImg from '../images/mainPage-background.png';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './navBar';
import Search from './search';
const useStyles = makeStyles((theme) => ({
  img: {
    [theme.breakpoints.down('sm')]: {
      height: '550px',
    },
    height: '850px',
    backgroundImage: 'url(' + headerImg + ')',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
  },
}));
const Header = (props) => {
  const classes = useStyles();

  return (
    <header>
      <div className={classes.img}>
        <NavBar />
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'grid',
            placeContent: 'center',
          }}
        >
          <Search />
        </div>
      </div>
    </header>
  );
};

export default Header;
