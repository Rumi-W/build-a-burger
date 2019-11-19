import {
  FETCH_INGREDIENTS_START,
  FETCH_INGREDIENTS_FAIL,
  FETCH_INGREDIENTS_SUCCESS
} from '../actions/actionTypes';

const initState = {
  ingredients: [],
  loading: false,
  success: false
};

export default (state = initState, action = {}) => {
  switch (action.type) {
    case FETCH_INGREDIENTS_START:
      return { ...state, loading: true };

    case FETCH_INGREDIENTS_SUCCESS:
      return {
        ...state,
        ingredients: action.ingredients,
        loading: false,
        success: true
      };

    case FETCH_INGREDIENTS_FAIL:
      return { ...state, loading: false, success: false };

    default:
      return state;
  }
};
