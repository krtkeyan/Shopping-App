import database from '../api'; 

export const fetchProducts = () => (dispatch) => {

    dispatch({
        type:'REQUEST_PRODUCTS',
    });
    
    database.ref('/')
     .on('value',(snap) => {
                dispatch({ 
                    type:'RECEIVE_PRODUCTS_SUCCESS', 
                    products:snap.val(), 
                })
                
            },
            (error) => {
                dispatch({
                    type:'RECEIVE_PRODUCTS_FAILURE',
                    message:error.message||'Something Went Wrong',
                })
            }
     )
  };

 
  export const addToCart = (id,quantity) => (dispatch,getState) => {
      if(getState().products[id].inventory > 0) {
          dispatch({
               type:'ADD_TO_CART',
               id,
               quantity
          })
      }
  } 