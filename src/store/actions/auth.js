import axios from 'axios';
import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT
} from './actionTypes';
import {
  API_KEY,
  signUpBaseURL,
  signInBaseURL,
  axiosConfig
} from './config';

const setAuthStart = () => ({
  type: AUTH_START
});

const setAuthSuccess = (idToken, userId) => ({
  type: AUTH_SUCCESS,
  idToken,
  userId
});

const setAuthFail = error => ({
  type: AUTH_FAIL,
  error
});

export const logOut = () => {
  localStorage.removeItem('idToken');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: AUTH_LOGOUT
  };
};

const checkAuthTimeout = expiresIn => dispatch => {
  setTimeout(() => {
    dispatch(logOut());
    // firebase doesn't return expireIn=3600 for log in
  }, expiresIn * 1000);
};

export const authenticate = (
  email,
  password,
  isSignUp
) => dispatch => {
  dispatch(setAuthStart());
  const baseURL = isSignUp ? signUpBaseURL : signInBaseURL;
  const url = `${baseURL}?key=${API_KEY}`;
  const data = { email, password, returnSecureToken: true };

  axios
    .post(url, data, axiosConfig)
    .then(response => {
      const expirationDate = new Date(
        new Date().getTime() + response.data.expiresIn * 1000
      );

      localStorage.setItem('idToken', response.data.idToken);
      localStorage.setItem('userId', response.data.localId);
      localStorage.setItem('expirationDate', expirationDate);

      dispatch(
        setAuthSuccess(response.data.idToken, response.data.localId)
      );
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch(error => {
      //console.log('ERROR', error.response.data.error);
      dispatch(setAuthFail(error.response.data.error));
    });
};

export const checkAuthStatus = () => dispatch => {
  const idToken = localStorage.getItem('idToken');
  if (!idToken) {
    dispatch(logOut());
  } else {
    const expirationDate = new Date(
      localStorage.getItem('expirationDate')
    );
    if (expirationDate && expirationDate <= new Date()) {
      dispatch(logOut());
    } else {
      const userId = localStorage.getItem('userId');
      dispatch(setAuthSuccess(idToken, userId));
      dispatch(
        checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    }
  }
};
/*
    // fetch userId if necessary
    const url = `${userInfoBaseURL}?key=${API_KEY}`;
    const data = { idToken };
    try {
      const response = await axios({
        method: 'POST',
        url,
        data,
        headers: axiosConfig.headers
      });
      if (response && response.status === 200) {
        console.log('data', response); // response.data.users[0].localId is userId
      }
    } catch (error) {
      console.log('error', error);
    }
   */
