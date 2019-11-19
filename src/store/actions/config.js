export const API_KEY = process.env.REACT_APP_API_KEY;

export const signUpBaseURL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signUp';

export const signInBaseURL =
  'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword';

export const userInfoBaseURL =
  'https://identitytoolkit.googleapis.com/v1/accounts:lookup';

export const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
};
