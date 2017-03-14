export const addedIds = (state=[],action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            if(state.indexOf(action.id) !== -1){
                return state;
            }
            return [...state,...action.id]; 
        default:
            return state;
    } 
}

export const cart = (state = {}, action ) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            let {id,quantity} = action;
            return {...state,...{[id]:quantity}}
            
        default:
            return state;
    } 
} 

