import moment from 'moment';
import {
  FETCH_ORDER_HISTORY_START,
  FETCH_ORDER_HISTORY_SUCCESS,
  FETCH_ORDER_HISTORY_FAIL
} from '../actions/actionTypes';

const initState = {
  orders: [],
  loading: false,
  success: false
};

const objToArray = obj => {
  const array = Object.keys(obj).map(key => ({
    order: obj[key].order,
    customer: obj[key].customer,
    orderDateTime: obj[key].orderDateTime,
    totalPrice: obj[key].totalPrice,
    id: key
  }));
  array.sort((a, b) => {
    let dayOne = moment(a.orderDateTime);
    let dayTwo = moment(b.orderDateTime);

    console.log('one', moment(dayOne).format('MM-DD-YYYY'));
    console.log('two', moment(dayTwo).format('MM-DD-YYYY'));

    if (dayTwo.diff(dayOne, 'hours') > 1) {
      console.log(dayTwo.diff(dayOne, 'days'));
      return 1;
    }

    if (dayTwo.diff(dayOne, 'hours') < 1) {
      console.log(dayTwo.diff(dayOne, 'days'));
      return -1;
    }
    return 0;
  });
  return array;
};

export default (state = initState, action = {}) => {
  switch (action.type) {
    case FETCH_ORDER_HISTORY_START:
      return { ...state, loading: true };

    case FETCH_ORDER_HISTORY_SUCCESS:
      return {
        loading: false,
        success: true,
        orders: [...objToArray(action.orders)]
      };

    case FETCH_ORDER_HISTORY_FAIL:
      return { ...state, loading: false, success: false };

    default:
      return state;
  }
};
