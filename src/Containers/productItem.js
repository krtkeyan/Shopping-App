import React from 'react';

const ProductItem = ({id,title,price,stock,onItemClick}) =>{ 
    let quantity=1;
    return (
         <li>
            {title}-&#36;{price}
            <input type="number"  min='1' max='10' onChange={(evt)=> {quantity = evt.target.value} }  />
            <button type="button" onClick={()=>onItemClick(id,quantity)} disabled={stock > 0 ?false:true}>{stock > 0 ?'Add To Cart':'Sold Out'}</button>
        </li>
)}


export default ProductItem;

