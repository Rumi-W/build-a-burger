import {
  COPY_BURGER_ORDER_INGREDIENTS,
  ADD_BURGER_ORDER_INGREDIENTS,
  REDUCE_BURGER_ORDER_INGREDIENTS,
  RESET_BURGER_ORDER
} from '../actions/actionTypes';

const initState = {
  keyToBeReplaced: '',
  quantity: 1,
  ingredients: { bacon: 0, tomato: 1, cheese: 1, lettuce: 1, meat: 1 }
};

export default (state = initState, action = {}) => {
  switch (action.type) {
    case ADD_BURGER_ORDER_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]:
            state.ingredients[action.ingredientType] + 1
        }
      };

    case REDUCE_BURGER_ORDER_INGREDIENTS:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]:
            state.ingredients[action.ingredientType] === 0
              ? 0
              : state.ingredients[action.ingredientType] - 1
        }
      };

    case COPY_BURGER_ORDER_INGREDIENTS:
      return {
        ...state,
        ingredients: { ...action.ingredients },
        quantity: action.quantity,
        keyToBeReplaced: action.keyToBeReplaced
      };

    case RESET_BURGER_ORDER:
      return { ...state, keyToBeReplaced: '', quantity: 1 };

    default:
      return state;
  }
};
