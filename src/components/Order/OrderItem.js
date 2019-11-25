import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  iconBtn: {
    margin: 0
    //backgroundColor: 'blue'
  },
  quantity: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
}));

const OrderItem = ({ orders, orderKey, orderCategory, children }) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      alignItems="flex-start"
      spacing={2}>
      <Grid item xs={11}>
        <Typography display="inline" variant="subtitle1">
          {orders[orderKey].item}{' '}
        </Typography>
        <div className={classes.quantity}>
          <Typography display="inline" variant="subtitle1">
            Quantity: {orders[orderKey].quantity}
          </Typography>
          {children}
        </div>
      </Grid>
      <Grid item xs={1} style={{ textAlign: 'right' }}>
        <Typography display="inline" variant="subtitle1">
          ${orders[orderKey].priceToPay.toFixed(2)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OrderItem;
