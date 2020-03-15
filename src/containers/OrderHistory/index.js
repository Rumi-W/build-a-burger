import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid, Paper } from '@material-ui/core';
import Spinner from '../../components/common/Spinner';
import { fetchOrderHistory } from '../../store/actions';

const Styles = theme => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    paddingTop: theme.spacing(2),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    marginBottom: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    width: '90%',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  gridContainer: {
    padding: theme.spacing(2)
  }
});

class OrderHistory extends Component {
  componentDidMount() {
    const { idToken, userId } = this.props;
    this.props.fetchOrderHistory(idToken, userId);
  }

  renderOrders = orderItem => {
    let contents = [];
    if (orderItem && orderItem.order) {
      if (Object.keys(orderItem.order).length > 0) {
        Object.keys(orderItem.order).forEach((key1, i) => {
          if (orderItem.order[key1] && Object.keys(orderItem.order[key1]).length > 0) {
            Object.keys(orderItem.order[key1]).forEach((key2, i2) => {
              const block = (
                <div key={`${orderItem.id}-${key2}`}>
                  <Typography display="inline" variant="subtitle2">
                    ({orderItem.order[key1][key2].quantity}){' '}
                  </Typography>
                  <Typography display="inline" variant="subtitle2">
                    {orderItem.order[key1][key2].item}
                  </Typography>
                </div>
              );
              contents.push(block);
            });
          }
        });
      }
    }
    return contents;
  };

  render() {
    const { orders, loading, success, classes } = this.props;

    if (loading) {
      return <Spinner />;
    }
    if (!success) {
      return <p>Order history cannot be loaded.</p>;
    }
    if (!orders) {
      return <Spinner />;
    }

    return (
      <div className={classes.wrapper}>
        <Typography gutterBottom variant="h5">
          Your Order History
        </Typography>
        <Paper className={classes.content}>
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} sm={2} md={2}>
              <Typography variant="subtitle1">Date</Typography>
            </Grid>
            <Grid item xs={12} sm={2} md={2}>
              <Typography variant="subtitle1">Name</Typography>
            </Grid>
            <Grid item xs={12} sm={2} md={2}>
              <Typography variant="subtitle1">Amount</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Typography variant="subtitle1">(Quantity) Item</Typography>
            </Grid>
          </Grid>
        </Paper>
        <Paper className={classes.content}>
          {orders.map((orderItem, index) => (
            <Grid key={`grid-${index}`} container className={classes.gridContainer}>
              <Grid item xs={12} sm={2} md={2}>
                <Typography variant="subtitle2">
                  {orderItem.orderDateTime
                    ? moment(orderItem.orderDateTime).format('MM-DD-YYYY')
                    : null}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <Typography variant="subtitle2">{orderItem.customer.firstName}</Typography>
              </Grid>
              <Grid item xs={12} sm={2} md={2}>
                <Typography variant="subtitle2">${orderItem.totalPrice.toFixed(2)}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                {this.renderOrders(orderItem)}
              </Grid>
            </Grid>
          ))}
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = ({ orderHistory, auth }) => {
  return {
    orders: orderHistory.orders,
    success: orderHistory.success,
    loading: orderHistory.loading,
    idToken: auth.idToken,
    userId: auth.userId
  };
};

export default compose(
  withRouter,
  withStyles(Styles),
  connect(mapStateToProps, { fetchOrderHistory })
)(OrderHistory);
