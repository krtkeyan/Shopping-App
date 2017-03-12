import {combineReducers} from 'redux';

const products = (state = [] , action ) => {
    switch (action.type) {
        case 'RECEIVE_PRODUCTS_SUCCESS':
            return action.products.map(products => products.id);
        default:
            return state;
    }
};

const isFetching = (state = false, action) => {
    switch (action.type) {
        case 'REQUEST_PRODUCTS':
            return true;
        case 'RECEIVE_PRODUCTS_FAILURE':
        case 'RECEIVE_PRODUCTS_SUCCESS':
            return false;
        default:
            return state;

    }
};

const errorMessage = (state = null, action) => {
     switch (action.type) {
        case 'RECEIVE_PRODUCTS_FAILURE':
            return action.message;
        case 'REQUEST_PRODUCTS':
        case 'RECEIVE_PRODUCTS_SUCCESS':
            return null;
        default:
            return state;

    }
};

const Product = combineReducers ({
    products,
    isFetching,
    errorMessage,
});

export default Product;