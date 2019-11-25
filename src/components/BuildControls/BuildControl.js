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
  buttonRoot: {
    minWidth: '50px',
    height: '30px',
    margin: '4px',
    [theme.breakpoints.down('sm')]: {
      minWidth: '60px',
      height: '40px'
    }
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
        disabled={addDisabled}
        size="small"
        variant="contained"
        color="secondary"
        classes={{
          root: classes.buttonRoot
        }}
        onClick={() => handleAddIngredient()}>
        <AddIcon className={classes.icon} />
      </Button>
      <Button
        disabled={removeDisabled}
        size="small"
        variant="contained"
        color="secondary"
        classes={{
          root: classes.buttonRoot
        }}
        onClick={() => handleRemoveIngredient()}>
        <RemoveIcon className={classes.icon} />
      </Button>
    </div>
  );
};

export default BuildControl;
