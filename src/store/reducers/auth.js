import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT
} from '../actions/actionTypes';

const initState = {
  idToken: null,
  userId: null,
  error: null,
  loading: false
};

export default (state = initState, action = {}) => {
  switch (action.type) {
    case AUTH_START:
      return { ...state, loading: true };

    case AUTH_SUCCESS:
      return {
        ...state,
        userId: action.userId,
        idToken: action.idToken,
        loading: false,
        error: null
      };

    case AUTH_FAIL:
      return {
        idToken: null,
        userId: null,
        loading: false,
        error: action.error
      };

    case AUTH_LOGOUT:
      return {
        ...initState
      };

    default:
      return state;
  }
};
