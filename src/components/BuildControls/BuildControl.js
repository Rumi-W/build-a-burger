import React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  buttonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginBottom: '4px'
  },
  labels: {
    flexDirection: 'row',
    minWidth: theme.spacing(16)
  },
  button: {
    margin: '6px'
  },
  icon: {
    fontSize: '20px'
  }
}));

const BuildControl = ({
  label,
  price,
  removeDisabled,
  addDisabled,
  handleAddIngredient,
  handleRemoveIngredient
}) => {
  const classes = useStyles();

  return (
    <div className={classes.buttonWrapper}>
      <div className={classes.labels}>
        <Typography variant="subtitle1" display="inline">
          {label}{' '}
        </Typography>
        <Typography variant="body1" display="inline">
          (${price.toFixed(2)})
        </Typography>
      </div>
      <Button
        className={classes.button}
        disabled={addDisabled}
        size="small"
        variant="contained"
        color="secondary"
        onClick={() => handleAddIngredient()}>
        <AddIcon className={classes.icon} />
      </Button>
      <Button
        className={classes.button}
        disabled={removeDisabled}
        size="small"
        variant="contained"
        color="secondary"
        onClick={() => handleRemoveIngredient()}>
        <RemoveIcon className={classes.icon} />
      </Button>
    </div>
  );
};

export default BuildControl;
