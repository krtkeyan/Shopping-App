import React from 'react';
import {render} from 'react-dom';
import App from './App';
import './index.css';
import {createStore,applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import Product from './Reducers';
import {fetchProducts} from './Actions';


const middleware = [ thunk ];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(Product,applyMiddleware(...middleware));

store.dispatch(fetchProducts());

render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);
