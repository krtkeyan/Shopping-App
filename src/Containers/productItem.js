import React from 'react';
import {connect} from 'react-redux';
import {addToCart,fetchItem} from '../Actions';
import {getItemsById} from '../Reducers/cart'
import {withRouter} from 'react-router';

let ProductItem = ({product,addToCart,isFetching,fetchItem,params}) =>{
 
    if(isFetching){
        return (<p>Loading</p>)
    }
   
    if(product===undefined){ 
        fetchItem(params);
        return (<div>Not Found </div>)
    } 
    
    let {id,title,price,inventory} = product;
    let availabiltiy = inventory > 0 ;
    return (
         <div>
            {title}-&#36;{price}
            <button type="button" onClick={()=>addToCart(id,1)} disabled={availabiltiy?false:true}>{availabiltiy?'Add To Cart':'Sold Out'}</button>
        </div>
)
};

const mapStateToProps = (state,param) =>{ 
    let {params}=param.match;
    return {
    product:getItemsById(state,params.id),
    isFetching:state.isFetching,
    params:params.id
    }

}

ProductItem = withRouter(connect(mapStateToProps,{
    addToCart,
    fetchItem
})(ProductItem));

export default ProductItem;

