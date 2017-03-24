import React from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import CartIcon from './cartIcon'

let NavBar = ({cartCount}) => {
   
    return (
        <MuiThemeProvider>   
            <AppBar
                title={<Link to="/" style={{textDecoration:"none",color:'white',fontSize:'30px' }}>Home</Link>}
                iconElementRight={
                    <Link to="/cart" >  
                      <CartIcon count={cartCount} />
                    </Link> 
                } 
            />
        </MuiThemeProvider>
    )
};

const mapStateToProps = (state) => ({
    cartCount:state.addedIds.length
})

NavBar = connect(mapStateToProps,undefined)(NavBar);

export default NavBar;