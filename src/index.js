import React from 'react';
import {render} from 'react-dom';
import App from './App';
import ProductItem from './Containers/productItem';
import Cart from './Containers/cart'
import './index.css';
import {createStore,applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import Product from './Reducers';
import {fetchProducts} from './Actions';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'




const middleware = [ thunk ];
const browserHistory = createBrowserHistory();
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const store = createStore(Product,applyMiddleware(...middleware));



render(
  <Provider store={store}>
    <Router>
    
    <div>
       <li > <Link to="/">Home</Link> </li>
       <li> <Link to="/cart">Cart</Link> </li>
      <hr/>
      <Route exact path="/" component={App}/>
      <Route path="/Items/:id" component={ProductItem}/>
      <Route path="/cart" component={Cart}/>
    </div>
  </Router>
  </Provider>,
  document.getElementById('root')
);
