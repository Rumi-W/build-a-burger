import React from 'react';
import { Tooltip, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import EditIcon from '@material-ui/icons/Edit';
import Wrapper from '../../hoc/Wrapper';

const useStyles = makeStyles(theme => ({
  iconBtn: {
    marginLeft: '4px'
  }
}));

const EditButton = ({ handleEditButtonClick }) => {
  const classes = useStyles();
  return (
    <Wrapper>
      <Tooltip title="Modify" aria-label="modify">
        <IconButton
          aria-label="delete"
          size="small"
          color="primary"
          className={classes.iconBtn}
          onClick={handleEditButtonClick}>
          <EditIcon fontSize="large" />
        </IconButton>
      </Tooltip>
    </Wrapper>
  );
};

export default EditButton;
