import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import CartSummary from '../../components/Order/CartSummary';
import Contact from '../Contact';

const styles = theme => ({
  content: {
    padding: theme.spacing(0, 6, 4, 6),
    [theme.breakpoints.down('sm')]: {
      padding: 0
    }
  },
  contact: {
    display: 'flex',
    justifyContent: 'center'
  },
  buttons: {
    padding: theme.spacing(2, 1),
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    marginRight: theme.spacing(1)
  }
});

class Cart extends Component {
  handleCancelCheckout = () => {
    this.props.history.goBack();
  };

  handleContinue = () => {
    this.props.history.replace('/cart/contact');
  };

  render() {
    const { classes, match, order, totalPrice, loading, success } = this.props;

    let summary;
    if (
      Object.keys(order.beverages).length === 0 &&
      Object.keys(order.burgers).length === 0 &&
      !success
    ) {
      summary = <Redirect to="/" />; // just in case page is refreshed
    } else {
      summary = (
        <div className={classes.content}>
          <CartSummary order={order} totalPrice={totalPrice}>
            <div className={classes.buttons}>
              <Button
                color="primary"
                variant="contained"
                className={classes.button}
                onClick={this.handleContinue}>
                Continue
              </Button>
              <Button variant="contained" onClick={this.handleCancelCheckout}>
                Cancel
              </Button>
            </div>
          </CartSummary>
          <div className={classes.contact}>
            <Route path={`${match.path}/contact`}>
              <Contact order={order} totalPrice={totalPrice} loading={loading} success={success} />
            </Route>
          </div>
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = ({ order }) => {
  return {
    order: order.order,
    totalPrice: order.totalPrice,
    success: order.success,
    loading: order.loading
  };
};
export default compose(withRouter, withStyles(styles), connect(mapStateToProps))(Cart);
