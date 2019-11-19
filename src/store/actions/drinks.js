import {
  FETCH_DRINK_MENU_START,
  FETCH_DRINK_MENU_SUCCESS,
  FETCH_DRINK_MENU_FAIL
} from './actionTypes';
import axios from '../../axios-orders';

const setFetchMenuStart = () => ({
  type: FETCH_DRINK_MENU_START
});

const setFetchMenuSuccess = data => ({
  type: FETCH_DRINK_MENU_SUCCESS,
  data
});

const setFetchMenuFail = () => ({
  type: FETCH_DRINK_MENU_FAIL
});

export const fetchDrinkMenu = () => async dispatch => {
  dispatch(setFetchMenuStart());
  try {
    const response = await axios.get('/drinkMenu.json');
    if (response.data && response.status === 200) {
      dispatch(setFetchMenuSuccess(response.data));
    } else {
      dispatch(setFetchMenuFail());
    }
  } catch (e) {
    console.log('Error', e);
    dispatch(setFetchMenuFail());
  }
};
