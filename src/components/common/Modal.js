import React, { memo, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  dialog: {},
  content: {
    width: '500px',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: '500px'
    },
    [theme.breakpoints.down('xs')]: {
      width: '380px'
    }
  }
}));

const Modal = ({
  open,
  title,
  handleCloseModal,
  children,
  closeButtonLabel
}) => {
  const classes = useStyles();

  useEffect(() => {
    //console.log('modal rendered');
  });

  return (
    <Dialog
      className={classes.dialog}
      aria-labelledby="dialog-title"
      open={open}
      onClose={handleCloseModal}>
      <DialogTitle id="dialog-title" onClose={handleCloseModal}>
        {title}
      </DialogTitle>
      <DialogContent dividers className={classes.content}>
        {children}
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleCloseModal}>
          {closeButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const propEqual = (prevProps, nextProps) => {
  return prevProps.title === nextProps.title && !nextProps.open;
};

const MemorizedModal = memo(Modal, propEqual);
export default MemorizedModal;
