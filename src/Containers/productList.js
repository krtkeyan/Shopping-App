import React from 'react';
import ProductItem from './productItem';
import {connect} from 'react-redux';
import {addToCart,checkOut} from '../Actions';
import Cart from './cart';
import logo from '../logo.svg';
import  '../App.css';

let ProductList = ({products,isFetching,addToCart,checkOut}) => (

    <div>
     {  isFetching ? <img src={logo} className="App-logo" alt="logo" />:<div>
        {
        Object.entries(products).map(([keys,Item]) => {
          return (
              <ProductItem 
                key={keys}
                id={keys}
                title={Item.title}
                price={Item.price}
                stock={Item.inventory}
                onItemClick={addToCart}
            />
            )
        }
        )
     } 
        <button onClick={()=>{checkOut()}}>CheckOut</button> 
       <Cart />
        </div>  
    }
    </div>
)

const mapStateToProps = (state) =>  ({
    products:state.products,
    isFetching:state.isFetching
})



ProductList = connect(mapStateToProps,{
    addToCart,
    checkOut
}
)(ProductList);
export default ProductList;