import React from 'react';
import ProductItem from './productItem';
import {connect} from 'react-redux';
import {addToCart} from '../Actions';

let ProductList = ({products,isFetching,addToCart}) => (
    <ul>
    {  isFetching ? <p>Loading...</p> :
        Object.entries(products).map(([keys,Item]) => {
          return (<ProductItem 
                key={keys}
                id={keys}
                title={Item.title}
                price={Item.price}
                stock={Item.inventory}
                onItemClick={addToCart}
            /> )}
        )  
    }
    </ul>
)

const mapStateToProps = (state) =>  ({
    products:state.products,
    isFetching:state.isFetching
})


ProductList = connect(mapStateToProps,{
    addToCart
}
)(ProductList);
export default ProductList;