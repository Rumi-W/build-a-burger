import {
  ADD_BURGER,
  UPDATE_ORDER,
  RESET_DRINK_ORDER,
  REMOVE_ITEM,
  ADD_ONE,
  SUBTRACT_ONE,
  RESET_ORDER,
  SUBMIT_ORDER_START,
  SUBMIT_ORDER_SUCCESS,
  SUBMIT_ORDER_FAIL
} from '../actions/actionTypes';
import {
  addBurger,
  updateOrder,
  removeItem,
  addOne,
  subtractOne
} from '../helpers/orderReducerHelper';

const initState = {
  order: {
    burgers: {}, // item, parentKey, priceToPay, quantity, unitPrice, ingredients
    beverages: {} // item, parentKey, priceToPay, quantity, unitPrice
  },
  totalPrice: parseFloat(0.0),
  orderDateTime: '',
  loading: false,
  success: false
};

export default (state = initState, action = {}) => {
  switch (action.type) {
    case ADD_BURGER:
      return addBurger(state, action);

    case UPDATE_ORDER:
      return updateOrder(state, action);

    case RESET_DRINK_ORDER:
      return { ...state, order: { ...state.order, beverages: {} } };

    case REMOVE_ITEM:
      return removeItem(state, action);

    case ADD_ONE:
      return addOne(state, action);

    case SUBTRACT_ONE:
      return subtractOne(state, action);

    case RESET_ORDER:
      return { ...initState };

    case SUBMIT_ORDER_START:
      return { ...state, loading: true };

    case SUBMIT_ORDER_SUCCESS:
      return { ...initState, loading: false, success: true };

    case SUBMIT_ORDER_FAIL:
      return { ...state, loading: false, success: false };

    default:
      return state;
  }
};
