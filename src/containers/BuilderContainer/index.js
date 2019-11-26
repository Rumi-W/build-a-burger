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
  addBurgerOrderIngredients,
  reduceBurgerOrderIngredients,
  resetBurgerOrder,
  removeItem
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
  ingredientsTotalPrice: 0
};

class BuilderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initState };
  }

  static getDerivedStateFromProps(props, state) {
    if (
      Object.keys(props.ingredientsControl).length > 0 &&
      Object.keys(props.burgerOrderIngredients).length > 0
    ) {
      const totalPrice = Object.keys(
        props.burgerOrderIngredients
      ).reduce((total, current) => {
        return (
          total +
          parseInt(props.burgerOrderIngredients[current], 10) *
            parseFloat(props.ingredientsControl[current].unitPrice)
        );
      }, props.basePrice);

      return {
        ...state,
        ingredientsTotalPrice: totalPrice
      };
    }
    return { ...state };
  }

  componentDidMount() {
    console.log('mounted');
    this.props.fetchIngredients();
  }

  handleAddIngredient = type => {
    const { ingredientsControl, burgerOrderIngredients } = this.props;

    if (burgerOrderIngredients[type] === 2) {
      return;
    }

    this.props.addBurgerOrderIngredients(type);
    this.setState(prevState => ({
      ingredientsTotalPrice:
        prevState.ingredientsTotalPrice +
        ingredientsControl[type].unitPrice
    }));
  };

  handleRemoveIngredient = type => {
    const { ingredientsControl, burgerOrderIngredients } = this.props;

    if (burgerOrderIngredients[type] === 0) {
      return;
    }
    this.props.reduceBurgerOrderIngredients(type);
    this.setState(prevState => ({
      ingredientsTotalPrice:
        prevState.ingredientsTotalPrice -
        ingredientsControl[type].unitPrice
    }));
  };

  // handleQuantityChange = e => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const qty = e.currentTarget.value;

  //   this.setState(() => ({
  //     quantity: parseInt(qty, 10)
  //   }));
  // };

  handleAddToOrder = () => {
    const { ingredientsTotalPrice } = this.state;
    const {
      burgerOrderIngredients,
      orderKeyToBeReplaced,
      quantity
    } = this.props;

    const itemKey = orderObjToStringNoSpace(burgerOrderIngredients);

    // Check if it's edit, no change - do nothing
    if (
      orderKeyToBeReplaced !== '' &&
      orderKeyToBeReplaced === itemKey
    ) {
      console.log('its same - do nothing');
      return;
    }

    const str = `Burger with ${orderObjToString(
      burgerOrderIngredients
    )}`;

    const orderItem = {
      parentKey: '',
      quantity,
      item: str,
      priceToPay: parseFloat(ingredientsTotalPrice) * quantity,
      unitPrice: parseFloat(ingredientsTotalPrice),
      ingredients: burgerOrderIngredients
    };

    if (orderKeyToBeReplaced !== '') {
      this.props.removeItem('burgers', orderKeyToBeReplaced);
    }
    this.props.addBurgerToOrder('burgers', itemKey, orderItem);

    this.handleResetBuilder();
  };

  handleResetBuilder = () => {
    this.props.resetBurgerOrder();
    // this.setState(() => ({
    //   ingredientsTotalPrice: initState.ingredientsTotalPrice
    // }));
  };

  render() {
    const {
      basePrice,
      classes,
      ingredientsControl,
      loading,
      success,
      burgerOrderIngredients
    } = this.props;

    const { ingredientsTotalPrice } = this.state;

    if (loading || !ingredientsControl || !burgerOrderIngredients)
      return <Spinner />;

    if (!ingredientsControl && !success) {
      return <p>Ingredients cannot be loaded.</p>;
    }

    return (
      <Wrapper>
        <Paper className={classes.paper}>
          <Burger orderIngredients={burgerOrderIngredients} />
          <BuildControls
            basePrice={basePrice}
            orderIngredients={burgerOrderIngredients}
            ingredientsControl={ingredientsControl}
            //quantity={quantity}
            ingredientsTotalPrice={ingredientsTotalPrice}
            handleAddIngredient={this.handleAddIngredient}
            handleRemoveIngredient={this.handleRemoveIngredient}
            // handleResetBuilder={this.handleResetBuilder}
            handleAddToOrder={this.handleAddToOrder}>
            {
              // <FormControl variant="outlined">
              //   <OutlinedInput
              //     id="burger-quantity"
              //     type="number"
              //     value={quantity}
              //     margin="none"
              //     onChange={this.handleQuantityChange}
              //     startAdornment={
              //       <InputAdornment position="start">
              //         <Typography variant="subtitle2">
              //           Quantity:{' '}
              //         </Typography>
              //       </InputAdornment>
              //     }
              //     inputProps={{
              //       className: classes.input,
              //       min: 0
              //     }}
              //   />
              // </FormControl>
            }
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
    burgerOrderIngredients: burgerOrder.ingredients,
    orderKeyToBeReplaced: burgerOrder.keyToBeReplaced,
    quantity: burgerOrder.quantity
  };
};

const enhance = compose(
  withRouter,
  withStyles(styles),
  connect(mapStateToProps, {
    fetchIngredients,
    addBurgerToOrder,
    addBurgerOrderIngredients,
    reduceBurgerOrderIngredients,
    resetBurgerOrder,
    removeItem
  })
);
export default withErrorHandler(enhance(BuilderContainer), axios);
