import React,{Component} from 'react';
import ProductItem from './productItem';
import {connect} from 'react-redux';
import {fetchProducts} from '../Actions'
import Cart from './cart';
import logo from '../logo.svg';
import {Link} from 'react-router-dom';
import  '../App.css';
import Pagination from '../Components/pagination';
import _ from 'lodash';

class ProductList extends Component {
    constructor(props){
        super(props);
        this.state = {
            pageOfItems:[],
            visibleItems:this.props.visible
        }
        this.onChangePage = this.onChangePage.bind(this);
    }

     onChangePage(pageOfItems) {
        // update state with new page of items
      
        this.setState({ pageOfItems: pageOfItems });
    }

    componentDidMount(){ 
        this.props.fetchProducts();
    }
    
    componentWillReceiveProps(next){
        this.setState({
            visibleItems:_.intersection(this.props.visible,next.visible)
        })
    }

    render() {
        let {products,isFetching,visible,fetchProducts} = this.props;
        let count = 0;
        
        let itemList = this.state.pageOfItems.map(itemId => {
                let {id,title,price} = products[itemId];
                count++;
                return  (
                        <div key={id}>
                        <Link to={'/Items/'+id}>{title}-{price}</Link>
                        </div>
                        )
            });

        if(visible.length == 0&&!isFetching){
            return (<div>No Items To Show </div>)
        }
          
        return (
                <div>
                {  isFetching ? <img src={logo} className="App-logo" alt="logo" />:
                    <div>
                    {
                        itemList
                    }
                    <Pagination items={visible} onChangePage={this.onChangePage}/>  
                    </div>  
                }
                </div>  
        )
    }
}

const mapStateToProps = (state) =>  ({
    products:state.products,
    visible:state.visibleProducts,
    isFetching:state.isFetching
})


ProductList = connect(mapStateToProps,{fetchProducts})(ProductList);
export default ProductList;