import React from 'react';
import {connect} from 'react-redux';
import {addToCart,removeIdFromCart,checkOut} from '../Actions';
import {getProductsInCart,getTotalById,getTotalInCart} from '../Reducers/cart'

let Cart = ({products,state,addToCart,removeItem,checkOut}) => {
    let hasProduct = products.length > 0;   
    let total = getTotalInCart(state);  
    return (
    <div>
        {   
            hasProduct ? products.map((product)=>{

                let {id,title} = product;
                let total = getTotalById(state,id);
                return (
                    <li key={id}>
                    Title:{title}*
                    Quantity:<input type="number" defaultValue="1" min="1"  max="10" onChange={(evt)=>addToCart(id,evt.target.value)}/>
                    Total:{total}
                    <button type="button" onClick={()=>removeItem(id)}>Remove</button>
                    </li>
                )}
                ):
                <div>'ADD ITEMS TO CART'</div>
        }
        {total>0?<div>Total:{total}<br/><button type="button" onClick={()=>checkOut()}>CheckOut</button></div>:''}
    </div>
)
}
const mapStateToProps = (state) => ({
    products:getProductsInCart(state),
    state
})

Cart = connect(mapStateToProps,{addToCart,checkOut,removeItem:removeIdFromCart,})(Cart);

export default Cart;