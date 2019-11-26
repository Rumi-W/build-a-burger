import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import BuilderContainer from '../BuilderContainer';
import OrderControls from '../../components/Order/OrderControls';
import OrderItems from '../../components/Order/OrderItems';
import Beverages from '../Beverages';
import {
  removeItem,
  addOne,
  subtractOne,
  resetOrder
} from '../../store/actions';

const styles = theme => ({
  buttons: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start'
  }
});

class OrderContainer extends Component {
  state = {
    steps: 0 // 0-burger, 1-drinks
  };

  handleStepsChange = num => {
    this.setState(() => ({
      steps: num
    }));
  };

  handleStartOver = () => {
    this.props.resetOrder();
  };

  handleRemoveOrderItem = (itemType, itemKey) => {
    this.props.removeItem(itemType, itemKey);
  };

  handleAddOrderItemQuantity = (itemType, itemKey) => {
    this.props.addOne(itemType, itemKey);
  };

  handleModifyBurgerItem = (itemType, itemKey) => {
    console.log('modify');
  };

  handleReduceOrderItemQuantity = (
    itemType,
    itemKey,
    currentQuantity
  ) => {
    if (currentQuantity === 1) {
      this.props.removeItem(itemType, itemKey);
    } else {
      this.props.subtractOne(itemType, itemKey);
    }
  };

  handleCheckout = key => {
    const { history, userId } = this.props;
    if (userId) {
      history.push('/cart');
    } else {
      history.push('/auth');
    }
  };

  getContent = () => {
    let content = null;
    switch (this.state.steps) {
      case 0:
        content = <BuilderContainer />;
        break;
      case 1:
        content = (
          <Beverages handleAddToOrder={this.handleAddToOrder} />
        );
        break;

      default:
        break;
    }
    return content;
  };

  render() {
    const { classes, order, totalPrice, userId } = this.props;
    const { steps } = this.state;
    console.log('order', order);

    return (
      <div className={classes.root}>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="flex-start"
          spacing={3}>
          <Grid item xs={12} sm={12} md={7}>
            <div>
              <OrderControls
                userId={userId}
                handleStepsChange={this.handleStepsChange}
                handleCheckout={this.handleCheckout}
                handleStartOver={this.handleStartOver}
                orderEmpty={totalPrice === 0}
                steps={steps}>
                <OrderItems
                  isEditable
                  totalPrice={totalPrice}
                  order={order}
                  handleAddOrderItemQuantity={
                    this.handleAddOrderItemQuantity
                  }
                  handleReduceOrderItemQuantity={
                    this.handleReduceOrderItemQuantity
                  }
                  handleRemoveOrderItem={this.handleRemoveOrderItem}
                  handleModifyBurgerItem={this.handleModifyBurgerItem}
                />
              </OrderControls>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            style={{
              borderRadius: '4px'
            }}>
            {this.getContent()}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = ({ order, auth }) => {
  return {
    order: order.order,
    totalPrice: order.totalPrice,
    userId: auth.userId
  };
};

//export default withStyles(styles)(OrderContainer);
export default compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, {
    removeItem,
    addOne,
    resetOrder,
    subtractOne
  })
)(OrderContainer);
