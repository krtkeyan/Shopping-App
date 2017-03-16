import React from 'react';
import './App.css';

import ProductList from './Containers/productList';

const App= () => (
      <div className="App">
      <div className="App-header">
          <h2>Welcome to React</h2>
        </div>
        <div className="App-intro">
          <ProductList />
        </div>
      </div>
  );

export default App;
