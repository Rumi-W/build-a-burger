import React from 'react';
import { Tooltip, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import EditIcon from '@material-ui/icons/Edit';
import Wrapper from '../../hoc/Wrapper';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '10px'
  },
  label: {
    width: '10px'
  }
}));

const EditButton = ({ handleEditButtonClick }) => {
  const classes = useStyles();
  return (
    <Wrapper>
      <Tooltip title="Modify" aria-label="modify">
        <Button
          aria-label="modify"
          size="small"
          color="primary"
          variant="outlined"
          onClick={handleEditButtonClick}
          classes={{ root: classes.root, label: classes.label }}>
          <EditIcon fontSize="small" />
        </Button>
      </Tooltip>
    </Wrapper>
  );
};

export default EditButton;
