import React from 'react';
import { Tooltip, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import RemoveIcon from '@material-ui/icons/Remove';
import Wrapper from '../../hoc/Wrapper';

const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '10px'
  },
  label: {
    width: '10px'
  }
}));

const SubtractButton = ({ handleReduceButtonClick }) => {
  const classes = useStyles();
  return (
    <Wrapper>
      <Tooltip title="Reduce" aria-label="reduce">
        <Button
          aria-label="reduce"
          size="small"
          color="primary"
          variant="outlined"
          onClick={handleReduceButtonClick}
          classes={{ root: classes.root, label: classes.label }}>
          <RemoveIcon fontSize="small" />
        </Button>
      </Tooltip>
    </Wrapper>
  );
};

export default SubtractButton;
