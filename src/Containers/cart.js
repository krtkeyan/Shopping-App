import React from 'react';
import {connect} from 'react-redux';
import {addToCart} from '../Actions';
import {getProductsInCart,getTotalById,getTotalInCart} from '../Reducers/cart'

let Cart = ({products,state,addToCart}) => {
    let hasProduct = products.length > 0;     
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
                    Total:{total}</li>
                )}
                ):
                <div>'ADD ITEMS TO CART'</div>
        }

    {getTotalInCart(state)}
    </div>
)
}
const mapStateToProps = (state) => ({
    products:getProductsInCart(state),
    state
})

Cart = connect(mapStateToProps,{addToCart})(Cart);

export default Cart;