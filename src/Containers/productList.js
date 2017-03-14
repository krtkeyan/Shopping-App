import React from 'react';
import ProductItem from './productItem';
import {connect} from 'react-redux';
import {addToCart,checkOut} from '../Actions';

let ProductList = ({products,isFetching,addToCart,checkOut}) => (
    <ul>
    {  isFetching ? <p>Loading...</p> :<div>
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
        )} 
        <button onClick={()=>{checkOut()}}>CheckOut</button> 
        </div>  

    }
    </ul>
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