// libs
import { combineReducers } from 'redux';

// src
import books from './books';
import searchResults from './searchResults';

const rootReducer = combineReducers({
  books,
  searchResults,
});

export default rootReducer;
