import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid } from '@material-ui/core';
import EditButton from '../common/EditButton';

const useStyles = makeStyles(theme => ({
  wrapper: {
    marginTop: theme.spacing(1)
  },
  iconBtn: {
    margin: 0
  },
  quantity: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
}));

const OrderItem = ({
  isItemEditable,
  orders,
  orderKey,
  orderCategory,
  handleEditButtonClick,
  children
}) => {
  const classes = useStyles();

  return (
    <Grid container direction="row" alignItems="flex-start" className={classes.wrapper} spacing={2}>
      <Grid item xs={11}>
        <Typography display="inline" variant="subtitle1">
          {orders[orderKey].item}{' '}
        </Typography>
        {isItemEditable ? <EditButton handleEditButtonClick={handleEditButtonClick} /> : null}
        <div className={classes.quantity}>
          <Typography display="inline" variant="subtitle1">
            Quantity: {orders[orderKey].quantity}
          </Typography>
          {children}
        </div>
      </Grid>
      <Grid
        item
        xs={1}
        style={{
          textAlign: 'right',
          paddingRight: 0
        }}>
        <Typography display="inline" variant="subtitle1">
          ${orders[orderKey].priceToPay.toFixed(2)}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default OrderItem;
