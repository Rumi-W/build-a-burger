import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { ThemeProvider } from '@material-ui/core/styles';
import { muiTheme } from './config/theme';
import reducers from './store/reducers';
import App from './App';
import * as serviceWorker from './serviceWorker';
import './index.css';

//console.log(process.env.NODE_ENV);

// const composeEnhancers =
//   process.env.NODE_ENV === 'development'
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     : null || compose;
// const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const store = createStore(reducers, applyMiddleware(thunk));

const app = (
  <Provider store={store}>
    <ThemeProvider theme={muiTheme}>
      <App />
    </ThemeProvider>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
