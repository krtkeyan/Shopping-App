import React from 'react';

const ProductItem = ({id,title,price,stock,onItemClick}) =>{ 
    let availabiltiy = stock > 0 ;
    return (
         <li>
            {title}-&#36;{price}
            <button type="button" onClick={()=>onItemClick(id,1)} disabled={availabiltiy?false:true}>{availabiltiy?'Add To Cart':'Sold Out'}</button>
        </li>
)}


export default ProductItem;

