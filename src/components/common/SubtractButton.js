import React from 'react';
import { Tooltip, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import RemoveIcon from '@material-ui/icons/Remove';
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

const SubtractButton = ({ handleReduceButtonClick }) => {
  const classes = useStyles();
  return (
    <Wrapper>
      <Tooltip title="Reduce" aria-label="reduce">
        <Button
          aria-label="reduce"
          size="small"
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
