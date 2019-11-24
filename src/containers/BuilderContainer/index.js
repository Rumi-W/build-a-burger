import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Paper,
  FormControl,
  OutlinedInput,
  InputAdornment
} from '@material-ui/core';
import Burger from '../../components/Burger';
import BuildControls from '../../components/BuildControls';
import Spinner from '../../components/common/Spinner';
import Wrapper from '../../hoc/Wrapper';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios-orders';
import {
  fetchIngredients,
  addBurgerToOrder
} from '../../store/actions';
import {
  orderObjToString,
  orderObjToStringNoSpace
} from '../../utilities/utilities';

const styles = theme => ({
  paper: {
    paddingBottom: theme.spacing(2)
  },
  input: {
    padding: 0,
    textAlign: 'center',
    fontSize: '18px',
    height: 40,
    width: 50
  }
});

const initState = {
  orderIngredients: {
    bacon: 0,
    tomato: 1,
    cheese: 1,
    lettuce: 1,
    meat: 1
  }, // order
  basePrice: 3.0,
  ingredientsTotalPrice: 3.8,
  quantity: 1
};

class BuilderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initState };
  }

  componentDidMount() {
    this.props.fetchIngredients();
  }

  handleAddIngredient = type => {
    if (this.state.orderIngredients[type] === 2) {
      return;
    }

    this.setState(prevState => ({
      orderIngredients: {
        ...prevState.orderIngredients,
        [type]: prevState.orderIngredients[type] + 1
      },
      ingredientsTotalPrice:
        prevState.ingredientsTotalPrice +
        this.props.ingredientsControl[type].unitPrice
    }));
  };

  handleRemoveIngredient = type => {
    if (this.state.orderIngredients[type] === 0) {
      return;
    }
    this.setState(
      prevState => ({
        orderIngredients: {
          ...prevState.orderIngredients,
          [type]: prevState.orderIngredients[type] - 1
        },
        ingredientsTotalPrice:
          prevState.ingredientsTotalPrice -
          this.props.ingredientsControl[type].unitPrice
      }),
      () => {
        // console.log('here', this.state);
      }
    );
  };

  handleQuantityChange = e => {
    e.preventDefault();
    e.stopPropagation();
    const qty = e.currentTarget.value;

    this.setState(() => ({
      quantity: parseInt(qty, 10)
    }));
  };

  handleAddToOrder = () => {
    const {
      ingredientsTotalPrice,
      orderIngredients,
      quantity
    } = this.state;

    const itemKey = orderObjToStringNoSpace(orderIngredients);
    const str = `Burger with ${orderObjToString(orderIngredients)}`;

    const burgerOrder = {
      parentKey: '',
      quantity,
      item: str,
      priceToPay: parseFloat(ingredientsTotalPrice) * quantity,
      unitPrice: parseFloat(ingredientsTotalPrice),
      ingredients: orderIngredients
    };
    this.props.addBurgerToOrder('burgers', itemKey, burgerOrder);
    this.handleResetBuilder();
  };

  handleResetBuilder = () => {
    this.setState(() => ({
      orderIngredients: initState.orderIngredients,
      ingredientsTotalPrice: initState.ingredientsTotalPrice,
      quantity: initState.quantity
    }));
  };

  render() {
    const {
      classes,
      ingredientsControl,
      loading,
      success
    } = this.props;

    const {
      orderIngredients,
      basePrice,
      ingredientsTotalPrice,
      quantity
    } = this.state;

    if (loading) {
      return <Spinner />;
    }

    if (!success) {
      return <p>Ingredients cannot be loaded.</p>;
    }

    if (!orderIngredients) return <Spinner />;

    return (
      <Wrapper>
        <Paper className={classes.paper}>
          <Burger orderIngredients={orderIngredients} />
          <BuildControls
            basePrice={basePrice}
            orderIngredients={orderIngredients}
            ingredientsControl={ingredientsControl}
            quantity={quantity}
            ingredientsTotalPrice={ingredientsTotalPrice}
            handleAddIngredient={this.handleAddIngredient}
            handleRemoveIngredient={this.handleRemoveIngredient}
            handleResetBuilder={this.handleResetBuilder}
            handleAddToOrder={this.handleAddToOrder}>
            <FormControl variant="outlined">
              <OutlinedInput
                id="burger-quantity"
                type="number"
                value={quantity}
                margin="none"
                onChange={this.handleQuantityChange}
                startAdornment={
                  <InputAdornment position="start">
                    <Typography variant="subtitle2">
                      Quantity:{' '}
                    </Typography>
                  </InputAdornment>
                }
                inputProps={{
                  className: classes.input,
                  min: 0
                }}
              />
            </FormControl>
          </BuildControls>
        </Paper>
      </Wrapper>
    );
  }
}
const mapStateToProps = ({ ingredients }) => {
  return {
    ingredientsControl: ingredients.ingredients,
    loading: ingredients.loading,
    success: ingredients.success
  };
};

const enhance = compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, {
    fetchIngredients,
    addBurgerToOrder
  })
);
export default withErrorHandler(enhance(BuilderContainer), axios);
