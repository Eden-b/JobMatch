import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import logo from '../images/logo.png';
import NavDrawer from './navDrawer';
import Hidden from '@material-ui/core/Hidden';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import FolderIcon from '@material-ui/icons/Folder';
import StarIcon from '@material-ui/icons/Star';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../redux/auth/authActions';
const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100px',
    color: 'white',
    padding: '0 2em',
    [theme.breakpoints.up('sm')]: {
      padding: '0 4em',
    },
    [theme.breakpoints.up('md')]: {
      padding: '0 6em',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logoStyles: {
    maxWidth: '110px',
  },

  navLinks: {
    width: '70%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar className={classes.header}>
          <Link to="/">
            <img className={classes.logoStyles} src={logo} alt="" />
          </Link>
          <Hidden mdUp>
            <NavDrawer />
          </Hidden>

          <Hidden smDown>
            <div className={classes.navLinks}>
              <div className={classes.myCards}>
                {isAuthenticated && (
                  <Button
                    component={Link}
                    to="/my-cards"
                    color="inherit"
                    startIcon={<FolderIcon />}
                  >
                    My Cards
                  </Button>
                )}
              </div>
              {isAuthenticated && (
                <Button
                  component={Link}
                  color="inherit"
                  to="/cards/favorite"
                  startIcon={<StarIcon />}
                >
                  Favorites
                </Button>
              )}
              {isAuthenticated && (
                <Button
                  onClick={() => dispatch(userLogout())}
                  color="inherit"
                  startIcon={<LockOpenIcon />}
                >
                  Log Out
                </Button>
              )}
              {!isAuthenticated && (
                <Button
                  component={Link}
                  color="inherit"
                  to="/login"
                  startIcon={<PersonIcon />}
                >
                  Log In
                </Button>
              )}
              {!isAuthenticated && (
                <Button
                  component={Link}
                  to="/signup"
                  color="inherit"
                  startIcon={<LockIcon />}
                >
                  Sign Up
                </Button>
              )}
            </div>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
}
