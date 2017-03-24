import {createStore,applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import Product from './Reducers';

const middleware = [ thunk ];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(Product,applyMiddleware(...middleware));

export default store;