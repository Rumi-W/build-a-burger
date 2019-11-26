import React from 'react';
import { Tooltip, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import AddIcon from '@material-ui/icons/Add';
import Wrapper from '../../hoc/Wrapper';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '36px',
    minHeight: '36px',
    margin: '2px'
  },
  label: {
    width: '12px'
  }
}));

const AddButton = ({ handleAddButtonClick }) => {
  const classes = useStyles();
  return (
    <Wrapper>
      <Tooltip title="Add" aria-label="add">
        <Button
          aria-label="add"
          size="small"
          variant="outlined"
          onClick={handleAddButtonClick}
          classes={{ root: classes.root, label: classes.label }}>
          <AddIcon fontSize="small" />
        </Button>
      </Tooltip>
    </Wrapper>
  );
};

export default AddButton;
