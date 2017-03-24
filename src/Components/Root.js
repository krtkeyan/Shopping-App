import React,{Component} from 'react';
import App from './App';
import ProductList from '../Containers/productList'
import ProductItem from '../Containers/productItem';
import Cart from '../Containers/cart';
import NavBar from './navbar';
import store from '../configStore';

import {Provider} from 'react-redux';
import {BrowserRouter as Router,Route} from 'react-router-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
 
class Root extends Component{

render() {
    return ( 
        <Provider store={store}> 
            <Router>  
            <div>       
            <NavBar />
            <Route exact path="/" component={App}/>
            <Route path="/pages/:page" component={App}/>
            <Route path="/Items/:id" component={ProductItem}/> 
            <Route path="/cart" component={Cart}/>
            </div>
        </Router>
        </Provider>
   );
}
}

export default Root;