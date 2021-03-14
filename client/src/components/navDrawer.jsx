import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import FolderIcon from '@material-ui/icons/Folder';
import MenuIcon from '@material-ui/icons/Menu';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import StarIcon from '@material-ui/icons/Star';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../redux/auth/authActions';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function NavDrawer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    right: false,
  });
  const { isAuthenticated } = useSelector((state) => state.auth);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={toggleDrawer('right', false)}
      onKeyDown={toggleDrawer('right', false)}
    >
      <List>
        {isAuthenticated && (
          <ListItem
            button
            key={'Log Out'}
            onClick={() => dispatch(userLogout())}
          >
            <ListItemIcon>
              <LockOpenIcon />
            </ListItemIcon>
            <ListItemText primary={'Log Out'} />
          </ListItem>
        )}
        {!isAuthenticated && (
          <ListItem button key={'Log In'} component={Link} to="/login">
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText primary={'Log In'} />
          </ListItem>
        )}
        {!isAuthenticated && (
          <ListItem button key={'Sign Up'} component={Link} to="/signup">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={'Sign Up'} />
          </ListItem>
        )}
      </List>
      <Divider />
      <List>
        {[
          { text: 'My Cards', icon: <FolderIcon />, to: '/my-cards' },
          { text: 'Favorites', icon: <StarIcon />, to: '/cards/favorite' },
        ].map(
          (item, index) =>
            isAuthenticated && (
              <ListItem button key={item.text} component={Link} to={item.to}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            )
        )}
      </List>
    </div>
  );

  return (
    <React.Fragment key={'right'}>
      <MenuIcon onClick={toggleDrawer('right', true)} />
      <Drawer
        anchor={'right'}
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
        {list('right')}
      </Drawer>
    </React.Fragment>
  );
}
