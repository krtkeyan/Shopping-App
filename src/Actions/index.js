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


  export const checkOut = () => (dispatch,getState) => {
     let {cart,addedIds} = getState();
     addedIds.forEach( id => {
              let stock;
              database.ref().child(id).child('inventory').once('value')
              .then( snap => {
                    stock = snap.val()-cart[id];
                    if(stock < 0){
                        return Promise.reject('STOCK UNAVAILABLE');
                    }
                    return database.ref().child(id).update(
                        {
                        inventory:stock
                        }
                    )
              })
              .then(()=>{
                      dispatch({
                        type:'CHECKOUT_REQUEST',
                      })
                  })
              .catch((reason)=>{
                      dispatch({
                        type:'CHECKOUT_FAILURE',
                        message:reason
                      })
              })
           })
   }