import {combineReducers} from 'redux';
import {cart,addedIds} from './cart';
import {products,isFetching,visibleProducts} from './products';

const errorMessage = (state = null, action) => {
     switch (action.type) {
        case 'CHECKOUT_FAILURE':
        case 'RECEIVE_PRODUCTS_FAILURE':
            return action.message;
        default:
            return null;
    }
};


const Product = combineReducers ({
    products,
    isFetching,
    errorMessage,
    cart,
    addedIds,
    visibleProducts,
});

export default Product;