import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/DeleteTwoTone';
import Wrapper from '../../hoc/Wrapper';

const useStyles = makeStyles(theme => ({
  iconBtn: {
    marginLeft: '2px'
  }
}));

const DeleteButton = ({ handleDeleteButtonClick }) => {
  const classes = useStyles();
  return (
    <Wrapper>
      <Tooltip title="Delete" aria-label="delete">
        <IconButton
          aria-label="delete"
          size="small"
          className={classes.iconBtn}
          onClick={handleDeleteButtonClick}>
          <DeleteIcon fontSize="default" />
        </IconButton>
      </Tooltip>
    </Wrapper>
  );
};

export default DeleteButton;
