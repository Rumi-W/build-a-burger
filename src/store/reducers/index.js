import { combineReducers } from 'redux';
import ingredients from './ingredients';
import order from './order';
import drinkMenu from './drinks';
import auth from './auth';
import orderHistory from './orderHistory';
import burgerOrder from './burgerOrder';

const combinedReducers = combineReducers({
  ingredients,
  order,
  drinkMenu,
  auth,
  orderHistory,
  burgerOrder
});

export default combinedReducers;
