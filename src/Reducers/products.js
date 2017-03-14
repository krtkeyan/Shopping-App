export const products = (state = {} , action ) => {
    switch (action.type) {
        case 'RECEIVE_PRODUCTS_SUCCESS':
            return {...action.products.reduce((obj,product)=>{
                let {id,...details} = product;
                obj[id]=details;
                return {...obj}
            },{})};
        default:
            return state;
    }
};

export const isFetching = (state = false, action) => {
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

export const errorMessage = (state = null, action) => {
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



