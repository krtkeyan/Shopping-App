import {createSelector} from 'reselect';
let initialState = {
    addedIds:[],
    cart:{}
}
export const addedIds = (state=[],action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            if(state.indexOf(action.id) !== -1){
                return state;
            }
            return [...state,action.id]; 
        case 'CHECKOUT_SUCCESS':
            return initialState.addedIds
        case 'REMOVE_FROM_CART':
            return state.filter((id)=>id!=action.id);
        default:
            return state;
    } 
}

export const cart = (state = {}, action ) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            let {id,quantity} = action;
            return {...state,...{[id]:quantity}}
        case 'CHECKOUT_REQUEST':
            return state;
        case 'CHECKOUT_SUCCESS':
            return initialState.cart;    
        case 'REMOVE_FROM_CART':
            let {[action.id]:omit,...res} = state;
            return res;
        default:
            return state;
    } 
};


export const getItemsById = (state,id) => state.products[id];

const getItemsInCart = (state) => state.addedIds;

const getQuantityById = (state,id) => state.cart[id]

const getItemPriceById = (state,id) => state.products[id].price

export const getTotalById = createSelector(getItemPriceById,getQuantityById,(price,quantity) => price*quantity) 

export const getProductsInCart = (state) =>  state.addedIds.map(id => getItemsById(state,id));

export const getTotalInCart = (state) => getItemsInCart(state).reduce((total,id)=>total+getTotalById(state,id),0)
