import _products from './products.json'


const delay = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));

export const getProducts = () => delay(500).then( ()=> {return _products} );