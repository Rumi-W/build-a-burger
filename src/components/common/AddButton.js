import React from 'react';
import { Tooltip, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import Wrapper from '../../hoc/Wrapper';

const useStyles = makeStyles(theme => ({
  iconBtn: {
    margin: 0
    //backgroundColor: 'blue'
  }
}));

const AddButton = ({ handleAddButtonClick }) => {
  const classes = useStyles();
  return (
    <Wrapper>
      <Tooltip title="Add" aria-label="add">
        <IconButton
          aria-label="add"
          size="small"
          color="primary"
          className={classes.iconBtn}
          onClick={handleAddButtonClick}>
          <AddIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Wrapper>
  );
};

export default AddButton;
