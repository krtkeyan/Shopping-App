import React,{Component} from 'react';
import {Debounce} from 'react-throttle';
import {searchFilter} from '../Actions'
import {connect} from 'react-redux'
const SearchBar = ({searchFilter}) => {
    return (
     <Debounce time="400" handler="onInput">
         <input type="text" onInput={(evt)=>searchFilter(evt.target.value)} />
     </Debounce>
)}

SearchBar = connect(undefined,{searchFilter})(SearchBar);

export default SearchBar;