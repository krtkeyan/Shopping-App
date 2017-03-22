import React from 'react';
import './App.css';
import ProductList from './Containers/productList';
import SearchBar from './Components/searchbar';

const App= () => (
      <div className="App">
        <div className="App-intro">
             <SearchBar />
            <ProductList />
        </div>
      </div>
  );

export default App;
