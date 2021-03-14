import React, { useContext } from 'react';
import { formModalContext } from './myCards';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch } from 'react-redux';
import { deleteCardAction } from '../redux/card/cardActions';
import { Link } from 'react-router-dom';
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #212121',
    background: '#2c2d2e',
    color: 'white',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: '#1E1E1F',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: 'white',
      },
    },
  },
}))(MenuItem);

export default function CardMenuOptions({ cardId }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [, setOpen] = useContext(formModalContext);

  return (
    <div>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={handleClick}
      >
        <MoreVertIcon style={{ color: '#9c9c9c' }} />
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={() => dispatch(deleteCardAction(cardId))}>
          <ListItemIcon>
            <DeleteIcon color="secondary" fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </StyledMenuItem>
        <Link
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
          to={`/my-cards/${cardId}`}
        >
          <StyledMenuItem
            onClick={() => {
              setOpen(true);
            }}
          >
            <ListItemIcon>
              <EditIcon color="primary" fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Edit" />
          </StyledMenuItem>
        </Link>
      </StyledMenu>
    </div>
  );
}
