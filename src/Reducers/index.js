import {combineReducers} from 'redux';
import {cart,addedIds} from './cart';
import {products,isFetching,errorMessage} from './products';

const Product = combineReducers ({
    products,
    isFetching,
    errorMessage,
    cart,
    addedIds
});

export default Product;