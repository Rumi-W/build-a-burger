import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

const initState = {
  idToken: null,
  userId: null,
  error: null,
  loading: false
};

const mockAction = {
  type: actionTypes.AUTH_SUCCESS,
  idToken: 'a-token',
  userId: 'an_id'
};

const mockState = {
  idToken: 'a-token',
  userId: 'an_id',
  error: null,
  loading: false
};

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it('should store the token upon login', () => {
    expect(reducer(initState, mockAction)).toEqual(mockState);
  });
});
