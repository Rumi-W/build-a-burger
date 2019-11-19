import {
  FETCH_DRINK_MENU_START,
  FETCH_DRINK_MENU_SUCCESS,
  FETCH_DRINK_MENU_FAIL
} from '../actions/actionTypes';

const initState = {
  menu: {},
  loading: false,
  success: false
};

export default (state = initState, action = {}) => {
  switch (action.type) {
    case FETCH_DRINK_MENU_START:
      return { ...state, loading: true };

    case FETCH_DRINK_MENU_SUCCESS:
      return {
        ...state,
        menu: action.data,
        loading: false,
        success: true
      };

    case FETCH_DRINK_MENU_FAIL:
      return { ...state, loading: false, success: false };

    default:
      return state;
  }
};
