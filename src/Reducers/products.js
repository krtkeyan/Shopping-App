
export const products = (state = {} , action ) => {
    switch (action.type) {
        case 'RECEIVE_PRODUCT_ITEM':
            let {product} = action;
            return {[product.id]:product}
        case 'RECEIVE_PRODUCTS_SUCCESS':
            return {...action.products.reduce((obj,product)=>{
                let {id} = product;
                obj[id]=product;
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
        case 'RECEIVE_PRODUCT_ITEM':
        case 'RECEIVE_PRODUCTS_SUCCESS':
            return false;
        default:
            return state;

    }
};

export const visibleProducts = (state =[],action) => {
    switch (action.type) {
        case 'RECEIVE_PRODUCTS_SUCCESS':
            let [omit,...ids] = action.products.map((product)=>product.id);
            return [...ids];
        case 'SEARCH_FILTER':
            let filterIds = Object.entries(action.products)
                            .filter(([key,val])=>{
                                let word = " "+val.title.toLowerCase();
                                return word.includes(" "+action.key.toLowerCase())
                            })
                            .map(key=>key[0]);
            return filterIds;
       
        default: 
            return state;
    }
}


