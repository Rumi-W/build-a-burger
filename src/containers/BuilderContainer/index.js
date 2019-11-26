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
  addBurgerToOrder,
  addOrderIngredients,
  reduceOrderIngredients,
  resetOrderIngredients
} from '../../store/actions';
import {
  orderObjToString,
  orderObjToStringNoSpace
} from '../../utilities/utilities';

const styles = theme => ({
  paper: {
    paddingBottom: theme.spacing(4)
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
  ingredientsTotalPrice: 0,
  quantity: 1
};

class BuilderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initState };
  }

  static getDerivedStateFromProps(props, state) {
    if (
      Object.keys(props.ingredientsControl).length > 0 &&
      Object.keys(props.burgerOrder).length > 0
    ) {
      const totalPrice = Object.keys(props.burgerOrder).reduce(
        (total, current) => {
          return (
            total +
            parseInt(props.burgerOrder[current], 10) *
              parseFloat(props.ingredientsControl[current].unitPrice)
          );
        },
        props.basePrice
      );

      return {
        ...state,
        ingredientsTotalPrice: totalPrice
      };
    }
    return { ...state };
  }

  componentDidMount() {
    this.props.fetchIngredients();
  }

  handleAddIngredient = type => {
    const { ingredientsControl, burgerOrder } = this.props;

    if (burgerOrder[type] === 2) {
      return;
    }

    this.props.addOrderIngredients(type);
    this.setState(prevState => ({
      ingredientsTotalPrice:
        prevState.ingredientsTotalPrice +
        ingredientsControl[type].unitPrice
    }));
  };

  handleRemoveIngredient = type => {
    const { ingredientsControl, burgerOrder } = this.props;

    if (burgerOrder[type] === 0) {
      return;
    }
    this.props.reduceOrderIngredients(type);
    this.setState(prevState => ({
      ingredientsTotalPrice:
        prevState.ingredientsTotalPrice -
        ingredientsControl[type].unitPrice
    }));
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
    const { ingredientsTotalPrice, quantity } = this.state;
    const { burgerOrder } = this.props;

    const itemKey = orderObjToStringNoSpace(burgerOrder);
    const str = `Burger with ${orderObjToString(burgerOrder)}`;

    const orderItem = {
      parentKey: '',
      quantity,
      item: str,
      priceToPay: parseFloat(ingredientsTotalPrice) * quantity,
      unitPrice: parseFloat(ingredientsTotalPrice),
      ingredients: burgerOrder
    };
    this.props.addBurgerToOrder('burgers', itemKey, orderItem);
    this.handleResetBuilder();
  };

  handleResetBuilder = () => {
    this.props.resetOrderIngredients();
    this.setState(() => ({
      ingredientsTotalPrice: initState.ingredientsTotalPrice,
      quantity: initState.quantity
    }));
  };

  render() {
    const {
      basePrice,
      classes,
      ingredientsControl,
      loading,
      success,
      burgerOrder
    } = this.props;

    const { ingredientsTotalPrice, quantity } = this.state;

    if (loading || !ingredientsControl || !burgerOrder)
      return <Spinner />;

    if (!ingredientsControl && !success) {
      return <p>Ingredients cannot be loaded.</p>;
    }

    return (
      <Wrapper>
        <Paper className={classes.paper}>
          <Burger orderIngredients={burgerOrder} />
          <BuildControls
            basePrice={basePrice}
            orderIngredients={burgerOrder}
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
const mapStateToProps = ({ ingredients, burgerOrder }) => {
  return {
    ingredientsControl: ingredients.ingredients,
    basePrice: ingredients.basePrice,
    loading: ingredients.loading,
    success: ingredients.success,
    burgerOrder
  };
};

const enhance = compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, {
    fetchIngredients,
    addBurgerToOrder,
    addOrderIngredients,
    reduceOrderIngredients,
    resetOrderIngredients
  })
);
export default withErrorHandler(enhance(BuilderContainer), axios);
