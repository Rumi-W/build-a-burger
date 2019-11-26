import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Beverage from '../../components/Beverage';
import BeverageSize from '../../components/Beverage/BeverageSize';
import withErrorHandler from '../../hoc/withErrorHandler';
import Spinner from '../../components/common/Spinner';
import {
  updateOrder,
  fetchDrinkMenu,
  resetDrinkOrder
} from '../../store/actions';
import axios from '../../axios-orders';

const styles = theme => ({
  paper: {
    height: '100%',
    maxHeight: '750px',
    overflow: 'scroll',
    width: '100%',
    padding: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  btn: {
    margin: theme.spacing(2, 1)
  }
});

class Beverages extends Component {
  componentDidMount() {
    this.props.fetchDrinkMenu();
  }

  handleOrderChange = (itemType, itemKey, orderObj) => {
    this.props.updateOrder(itemType, itemKey, orderObj);
  };

  renderMenu = () => {
    const { drinkOrder, menu } = this.props;

    return Object.keys(menu).map((itemKey, i) => (
      <Beverage
        key={i}
        type={itemKey}
        label={menu[itemKey].label}
        sizesObj={menu[itemKey].sizes}
        drinkOrder={drinkOrder}>
        {Object.keys(menu[itemKey].sizes).map((itemKey2, i2) => (
          <BeverageSize
            key={i2}
            parentKey={itemKey}
            label={menu[itemKey].label}
            itemKey={itemKey2}
            sizeLabel={menu[itemKey].sizes[itemKey2].label}
            price={menu[itemKey].sizes[itemKey2].price}
            drinkOrder={drinkOrder}
            handleOrderChange={this.handleOrderChange}
          />
        ))}
      </Beverage>
    ));
  };

  render() {
    const {
      menu,
      menuLoading,
      menuLoadSuccess,
      classes
    } = this.props;

    if (menuLoading) {
      return <Spinner />;
    }

    if (!menuLoadSuccess) {
      return <p>Menu cannot be loaded.</p>;
    }

    if (!menu) {
      return <Spinner />;
    }

    return (
      <Paper className={classes.paper}>
        {menuLoading ? <Spinner /> : null}
        <Typography variant="h5" align="center" gutterBottom>
          Beverages
        </Typography>
        {this.renderMenu()}
        <div>
          <Button
            variant="contained"
            className={classes.btn}
            onClick={this.props.resetDrinkOrder}>
            Reset Beverage Order
          </Button>
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = ({ order, drinkMenu }) => {
  return {
    drinkOrder: order.order.beverages,
    menu: drinkMenu.menu,
    menuLoading: drinkMenu.loading,
    menuLoadSuccess: drinkMenu.success
  };
};

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, {
    updateOrder,
    fetchDrinkMenu,
    resetDrinkOrder
  })
);
export default withErrorHandler(enhance(Beverages), axios);
