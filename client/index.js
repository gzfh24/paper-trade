import React from 'react';
import App from './App';
import store from './store'
import { Provider } from 'react-redux';
import { render } from 'react-dom';
// uncomment so that webpack can bundle styles
// import styles from './scss/application.scss';

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
