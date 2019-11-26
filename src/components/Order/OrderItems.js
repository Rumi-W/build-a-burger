import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Box, Grid } from '@material-ui/core';
import OrderItem from './OrderItem';
import QtyEditButtons from './QtyEditButtons';

const useStyles = makeStyles(theme => ({
  box: {
    margin: theme.spacing(3, 2),
    padding: theme.spacing(3, 2),
    [theme.breakpoints.down('xs')]: {
      padding: 0
    }
  },
  orderTitle: {
    borderBottom: '1px #cccccc solid',
    paddingTop: theme.spacing(2)
  },
  buttons: {
    display: 'flex',
    direction: 'row',
    justifyContent: 'center',
    margin: theme.spacing(2, 1)
  }
}));

const OrderItems = ({ isEditable, order, totalPrice, ...rest }) => {
  const classes = useStyles();

  const renderItem = (key2, key1, i2) => {
    return (
      <OrderItem
        key={key2}
        orders={order[key1]}
        orderCategory={key1}
        orderKey={key2}>
        {isEditable ? (
          <QtyEditButtons
            isBurger={key1 === 'burgers'}
            handleAddButtonClick={() =>
              rest.handleAddOrderItemQuantity(key1, key2)
            }
            handleDeleteButtonClick={() =>
              rest.handleRemoveOrderItem(key1, key2)
            }
            handleReduceButtonClick={() =>
              rest.handleReduceOrderItemQuantity(
                key1,
                key2,
                order[key1][key2].quantity
              )
            }
            handleEditButtonClick={() =>
              rest.handleModifyBurgerItem(key1, key2)
            }
          />
        ) : null}
      </OrderItem>
    );
  };

  const renderOrders = () => {
    let contents = [];

    if (
      Object.prototype.toString.call(order) === '[object Object]' &&
      Object.keys(order).length > 0
    ) {
      Object.keys(order).forEach((key1, i) => {
        //key1:burgers/beverages
        if (
          Object.prototype.toString.call(order[key1]) ===
            '[object Object]' &&
          Object.keys(order[key1]).length > 0
        ) {
          const item = Object.keys(order[key1]).map((key2, i2) =>
            renderItem(key2, key1, i2)
          );
          contents = [...contents, ...item];
        }
      });
    }
    return contents;
  };

  return (
    <Box className={classes.box}>
      <Typography align="center" variant="h6">
        Your Order
      </Typography>
      <Typography align="center" variant="subtitle2">
        {`Total $ ${totalPrice.toFixed(2)}`}
      </Typography>

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={2}
        className={classes.orderTitle}>
        <Grid item xs={11}>
          <Typography display="inline" variant="subtitle2">
            Item
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography display="inline" variant="subtitle2">
            Price
          </Typography>
        </Grid>
      </Grid>
      {renderOrders()}
    </Box>
  );
};

export default OrderItems;
