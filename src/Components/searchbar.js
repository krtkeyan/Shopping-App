import React from 'react';
import {Debounce} from 'react-throttle';
import {searchFilter} from '../Actions'
import {connect} from 'react-redux'
import TextField from 'material-ui/TextField';

let SearchBar = ({searchFilter}) => {
    return (
     <Debounce time="400" handler="onInput">
         <TextField hintText="Search" fullWidth={true} type="text" onInput={(evt)=>searchFilter(evt.target.value)} />
     </Debounce>
)}

SearchBar = connect(undefined,{searchFilter})(SearchBar);

export default SearchBar; 
