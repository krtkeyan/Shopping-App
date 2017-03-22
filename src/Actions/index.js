import database from '../api'; 


export const searchFilter = (key) =>(dispatch,getState) =>(
    dispatch({
        type:"SEARCH_FILTER",
        key,
        products:getState().products
    })
)

export const fetchProducts = () => (dispatch) => {
    dispatch({
        type:'REQUEST_PRODUCTS',
    });
    
    database.ref('/')
    .on('value',
            (snap) => {
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

export const removeIdFromCart = (id) => (dispatch) => {
     dispatch({
         type:'REMOVE_FROM_CART',
         id
     })
}

export const checkOut = () => (dispatch,getState) => {
     let {cart,addedIds,products} = getState();
     let promiseArray=[];
     
     addedIds.forEach( id => {
              let stock;
              database.ref().child(id).child('inventory').once('value', snap => {
                    stock = snap.val()-cart[id];
                    if(!navigator.onLine || stock < 0 ){
                        let message = !navigator.onLine?'NO INTERNET':'STOCK UNAVAILABLE -'+products[id].title;
                        promiseArray.push(Promise.reject(message));
                    }
                    promiseArray.push(Promise.resolve(()=>database.ref().child(id).update(
                                            {
                                            inventory:stock
                                            }
                                      )));
             })
     });
     
     Promise.all(promiseArray)
            .then((resolver)=>{
                      dispatch({
                        type:'CHECKOUT_REQUEST',
                      })
                      Promise.all([...resolver.map(update => update())]).then(()=>dispatch({
                          type:'CHECKOUT_SUCCESS'
                      }))
               },(reason)=>{
                      dispatch({
                        type:'CHECKOUT_FAILURE',
                        message:reason
                      })
               })
}

export const fetchItem =(id) => (dispatch) => {
        dispatch({
                type:'REQUEST_PRODUCTS',
        });
      
        database.ref().child(id).on('value',(snap)=>{
            return dispatch({ 
                    type:'RECEIVE_PRODUCT_ITEM', 
                    product:snap.val(), 
                })      
        },(error) => {
                dispatch({
                    type:'RECEIVE_PRODUCTS_FAILURE',
                    message:error.message||'Something Went Wrong',
                })
        })
        
}
