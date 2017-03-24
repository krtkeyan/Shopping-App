import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchProducts} from '../Actions'
import logo from '../logo.svg';
import {Link} from 'react-router-dom';
import CircularProgress from 'material-ui/CircularProgress';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import  '../App.css';
import Pagination from '../Components/pagination';
import _ from 'lodash';
import {GridList, GridTile} from 'material-ui/GridList';
import styled from 'styled-components';
import {withRouter} from 'react-router-dom';

const Image = styled.img`
        width:160px;
        height:160px;
        max-width:200px !important;
        min-width:100px !important;
`;

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
                let {products,isFetching,visible,page} = this.props;
                let itemList = this.state.pageOfItems.map(itemId => {
                let {id,title,price,img} = products[itemId];
                return  (
                        <GridTile key={id}>
                        <Card>
                        <CardMedia>
                            <Image  alt="No Image" onClick={()=>{this.props.history.push('/Items/'+id)}} style={{display:'block',marginLeft:'auto',marginRight:'auto'}} src={img}  />
                        </CardMedia>
                        <Link to={'/Items/'+id} style={{textDecoration:'none',color:'black',textAlign:'center',display:'block',margin:'0 auto'}}>{title}</Link>
                        </Card>
                        </GridTile>
                        ) 
            });

        if(visible.length === 0&&!isFetching){
            return (<div>No Items To Show </div>)
        }
           
        return (
                <div>
                {  isFetching ? <CircularProgress size={80} thickness={5} />:
                    <div >
                    <GridList style={ { display: 'flex',flexWrap: 'wrap',justifyContent: 'space-around',}} cellHeight={180} >
                    {
                        itemList
                    }
                    </GridList> 
                    <Pagination  items={visible} page={this.props.page} onChangePage={this.onChangePage}/> 
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


ProductList = withRouter(connect(mapStateToProps,{fetchProducts})(ProductList));
export default ProductList;