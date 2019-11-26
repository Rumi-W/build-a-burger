import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  controlWrapper: {
    [theme.breakpoints.only('sm')]: {
      marginTop: theme.spacing(1)
    }
  },
  button: {
    minHeight: '60px'
  },
  orderItems: {
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 2)
    }
  }
}));

const OrderControls = ({
  userId,
  orderEmpty,
  handleStepsChange,
  handleCheckout,
  handleStartOver,
  steps,
  children
}) => {
  const classes = useStyles();

  const btnBurgerStyle =
    steps === 0 ? { backgroundColor: '#c6e4fc' } : { backgroundColor: '#f2f2f2' };
  const btnBeverageStyle =
    steps === 1 ? { backgroundColor: '#c6e4fc' } : { backgroundColor: '#f2f2f2' };

  return (
    <div className={classes.controlWrapper}>
      <Grid container direction="row">
        <Grid item xs={12} sm={6} md={6}>
          <Button
            className={classes.button}
            style={btnBurgerStyle}
            variant="contained"
            size="large"
            fullWidth
            onClick={() => handleStepsChange(0)}>
            Select Burger
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <Button
            className={classes.button}
            style={btnBeverageStyle}
            variant="contained"
            size="large"
            fullWidth
            onClick={() => handleStepsChange(1)}>
            Select Beverages
          </Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} className={classes.orderItems}>
          {children}
        </Grid>
      </Grid>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Button
            disabled={orderEmpty}
            color="primary"
            variant="contained"
            style={{ marginTop: '20px', marginRight: '10px' }}
            onClick={handleCheckout}>
            {userId ? 'Checkout' : 'Sign In to Continue'}
          </Button>
          <Button
            disabled={orderEmpty}
            variant="contained"
            style={{ marginTop: '20px' }}
            onClick={handleStartOver}>
            Start Over
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderControls;
