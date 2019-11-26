import {
  ADD_ORDER_INGREDIENTS,
  REDUCE_ORDER_INGREDIENTS,
  RESET_ORDER_INGREDIENTS
} from '../actions/actionTypes';

const initState = {
  bacon: 0,
  tomato: 1,
  cheese: 1,
  lettuce: 1,
  meat: 1
};

export default (state = initState, action = {}) => {
  switch (action.type) {
    case ADD_ORDER_INGREDIENTS:
      return {
        ...state,
        [action.ingredientType]: state[action.ingredientType] + 1
      };

    case REDUCE_ORDER_INGREDIENTS:
      return {
        ...state,
        [action.ingredientType]:
          state[action.ingredientType] === 0
            ? 0
            : state[action.ingredientType] - 1
      };

    case RESET_ORDER_INGREDIENTS:
      return { ...initState };

    default:
      return state;
  }
};
