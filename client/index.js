import React from 'react';
import App from './App';
import store from './store'
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import styles from './stylesheets/styles.scss'

render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);
