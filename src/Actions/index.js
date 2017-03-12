import {getProducts} from '../api'; 

export const fetchProducts = () => (dispatch) => {
    dispatch({
        type:'REQUEST_PRODUCTS',
    });

    getProducts().then(
        response => {
            dispatch({ 
                type:'RECEIVE_PRODUCTS_SUCCESS', 
                products:response, 
            }) 
        },
        error=>{
            dispatch({
                type:'RECEIVE_PRODUCTS_FAILURE',
                message:error.message||'Something Went Wrong',
            })
        }
    )

}