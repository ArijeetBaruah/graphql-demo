import { combineReducers } from 'redux';
import books from './books';
import authors from './authors';

const reducers = {
  books,
  authors,
};

export default combineReducers(reducers);
