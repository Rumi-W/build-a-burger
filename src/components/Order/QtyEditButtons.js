import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteButton from '../common/DeleteButton';
import AddButton from '../common/AddButton';
import SubtractButton from '../common/SubtractButton';

const useStyles = makeStyles(theme => ({
  buttons: {
    marginLeft: theme.spacing(5)
  }
}));

const QtyEditButtons = ({
  handleAddButtonClick,
  handleDeleteButtonClick,
  handleReduceButtonClick
}) => {
  const classes = useStyles();

  return (
    <div className={classes.buttons}>
      <AddButton handleAddButtonClick={handleAddButtonClick} />
      <SubtractButton
        handleReduceButtonClick={handleReduceButtonClick}
      />
      <DeleteButton
        handleDeleteButtonClick={handleDeleteButtonClick}
      />
    </div>
  );
};

export default QtyEditButtons;
