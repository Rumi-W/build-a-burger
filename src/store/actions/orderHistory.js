import {
  FETCH_ORDER_HISTORY_START,
  FETCH_ORDER_HISTORY_SUCCESS,
  FETCH_ORDER_HISTORY_FAIL
} from './actionTypes';
import axios from '../../axios-orders';

const setFetchOrderHistoryStart = () => ({
  type: FETCH_ORDER_HISTORY_START
});

const setFetchOrderHistorySuccess = orders => ({
  type: FETCH_ORDER_HISTORY_SUCCESS,
  orders
});

const setFetchOrderHistoryFail = () => ({
  type: FETCH_ORDER_HISTORY_FAIL
});

export const fetchOrderHistory = (idToken, userId) => dispatch => {
  dispatch(setFetchOrderHistoryStart());

  const queryParam = `?auth=${idToken}&orderBy="userId"&equalTo="${userId}"`;
  const url = `/orders.json${queryParam}`;

  axios
    .get(url)
    .then(response => {
      if (response.data && response.status === 200) {
        dispatch(setFetchOrderHistorySuccess(response.data));
      } else {
        dispatch(setFetchOrderHistoryFail());
      }
    })
    .catch(e => {
      console.log(e);
      dispatch(setFetchOrderHistoryFail());
    });
};
