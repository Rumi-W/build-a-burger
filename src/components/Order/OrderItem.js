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
      <Grid item xs={7} sm={8} md={8}>
        <Typography display="inline" variant="subtitle1">
          {orders[orderKey].item}{' '}
        </Typography>
      </Grid>
      <Grid item xs={3} sm={3} md={3}>
        <div className={classes.quantity}>
          <Typography display="inline" variant="subtitle1">
            {orders[orderKey].quantity}
          </Typography>
          {children}
        </div>
      </Grid>
      <Grid item xs={2} sm={1} md={1} style={{ textAlign: 'right' }}>
        <Typography display="inline" variant="subtitle1">
          ${orders[orderKey].priceToPay.toFixed(2)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OrderItem;
