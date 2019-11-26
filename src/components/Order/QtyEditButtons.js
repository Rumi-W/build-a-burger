import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DeleteButton from '../common/DeleteButton';
import AddButton from '../common/AddButton';
import SubtractButton from '../common/SubtractButton';
import EditButton from '../common/EditButton';

const useStyles = makeStyles(theme => ({
  buttons: {
    marginLeft: theme.spacing(5)
  }
}));

const QtyEditButtons = ({
  handleAddButtonClick,
  handleDeleteButtonClick,
  handleReduceButtonClick,
  handleEditButtonClick
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
      <EditButton handleEditButtonClick={handleEditButtonClick} />
    </div>
  );
};

export default QtyEditButtons;
