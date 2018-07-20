// libs
import { combineReducers } from 'redux';
import getOr from 'lodash/fp/getOr';
import reduce from 'lodash/fp/reduce';

//  src
import * as actionTypes from '../actions';

const parser = booksArray =>
  reduce((final, book) => {
    const bestBook = getOr({}, 'best_book[0]')(book);
    const avgRating = getOr(0.0, 'average_rating[0]')(book);
    const ratingCount = getOr(0, 'ratings_count[0]._')(book);
    const id = getOr(0, 'id[0]._')(bestBook);
    return {
      ...final,
      [id]: {
        id,
        title: bestBook.title[0],
        author: bestBook.author[0].name[0],
        image: bestBook.image_url[0],
        averageRating: parseFloat(avgRating),
        ratingCount,
      },
    };
  }, {})(booksArray);
const isLoading = (state = false, action) => {
  switch (action.type) {
    case actionTypes.LOAD_BOOKS: {
      return true;
    }
    case actionTypes.LOAD_BOOKS_SUCCESS:
    case actionTypes.LOAD_MORE_BOOKS_SUCCESS:
    case actionTypes.LOAD_BOOKS_FAILURE: {
      return false;
    }
    default: {
      return state;
    }
  }
};
function mainReducer(state = { books: {} }, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.LOAD_BOOKS_SUCCESS: {
      const query = payload[0].query[0];
      const totalResults = payload[0]['total-results'][0];
      const page = payload[0].page;
      const totalPages = Math.floor(totalResults / (20 + (totalResults % 20 === 0 ? 0 : 1)));
      const booksArray = payload[0].results[0].work;
      const books = parser(booksArray);
      const nextState = {
        query,
        books,
        page,
        totalResults,
        totalPages,
      };
      return nextState;
    }
    case actionTypes.LOAD_MORE_BOOKS_SUCCESS: {
      const query = payload[0].query[0];
      const totalResults = payload[0]['total-results'][0];
      const page = payload[0].page;
      const totalPages = Math.floor(totalResults / (20 + (totalResults % 20 === 0 ? 0 : 1)));
      const booksArray = payload[0].results[0].work;
      const newState = parser(booksArray);
      const books = { ...state.books, ...newState };
      const nextState = {
        query,
        books,
        page,
        totalResults,
        totalPages,
      };
      return nextState;
    }
    case actionTypes.LOAD_BOOKS:
      return state;
    case actionTypes.LOAD_BOOKS_FAILURE:
      return state;
    default:
      return state;
  }
}

export default combineReducers({
  mainReducer,
  isLoading,
});
