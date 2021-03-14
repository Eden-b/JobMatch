import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { NavLink } from 'react-router-dom';
import { Link } from '@material-ui/core';

export default function AlertDialog({ isAlertModal, setAlertModal }) {
  const [open, setOpen] = React.useState(false);
 
  const handleClose = () => {
    setOpen(false);
    setAlertModal(false);
  };

  return (
    <div>
      <Dialog
        open={open || isAlertModal}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Trying to add this card to favorite?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            in order to do so please log in or register.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <Link component={NavLink} to="/login">
              log in
            </Link>
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            <Link component={NavLink} to="/signup">
              Sign up
            </Link>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
