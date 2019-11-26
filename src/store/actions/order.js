import {
  ADD_BURGER,
  REPLACE_BURGER,
  UPDATE_ORDER,
  RESET_DRINK_ORDER,
  REMOVE_ITEM,
  ADD_ONE,
  SUBTRACT_ONE,
  RESET_ORDER,
  SUBMIT_ORDER_START,
  SUBMIT_ORDER_SUCCESS,
  SUBMIT_ORDER_FAIL
} from './actionTypes';
import { axiosConfig } from './config';
import axios from '../../axios-orders';

export const replaceBurgerOrder = (itemType, itemKey, orderObj, oldItemKey) => ({
  type: REPLACE_BURGER,
  itemType,
  itemKey,
  orderObj,
  oldItemKey
});

export const addBurgerToOrder = (itemType, itemKey, orderObj) => ({
  type: ADD_BURGER,
  itemType,
  itemKey,
  orderObj
});

export const updateOrder = (itemType, itemKey, orderObj) => ({
  type: UPDATE_ORDER,
  itemType,
  itemKey,
  orderObj
});

export const resetDrinkOrder = () => ({
  type: RESET_DRINK_ORDER
});

export const removeItem = (itemType, itemKey) => ({
  type: REMOVE_ITEM,
  itemType,
  itemKey
});

export const addOne = (itemType, itemKey) => ({
  type: ADD_ONE,
  itemType,
  itemKey
});

export const subtractOne = (itemType, itemKey) => ({
  type: SUBTRACT_ONE,
  itemType,
  itemKey
});

export const resetOrder = () => ({
  type: RESET_ORDER
});

const setSubmitOrderStart = () => ({
  type: SUBMIT_ORDER_START
});

const setSubmitOrderSuccess = () => ({
  type: SUBMIT_ORDER_SUCCESS
});

const setSubmitOrderFail = () => ({
  type: SUBMIT_ORDER_FAIL
});

export const submitOrder = (orderObj, idToken) => async dispatch => {
  dispatch(setSubmitOrderStart());

  const orderUrl = `/orders.json?auth=${idToken}`;

  try {
    const response = await axios({
      method: 'POST',
      url: orderUrl,
      data: orderObj,
      headers: axiosConfig.headers
    });

    if (response.status === 200) {
      dispatch(setSubmitOrderSuccess());
    } else {
      dispatch(setSubmitOrderFail());
    }
  } catch (e) {
    dispatch(setSubmitOrderFail());
  }
  return Promise.resolve();
};
