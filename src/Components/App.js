import React from 'react';
import ProductList from '../Containers/productList';
import SearchBar from './searchbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const App= ({match}) => {
    return (
     <MuiThemeProvider>
        <div className="App-intro">
            <SearchBar />
            <ProductList page={match.params.page} />
        </div>
     </MuiThemeProvider>
  )};

export default App;
