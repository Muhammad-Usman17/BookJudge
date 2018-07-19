//  src
import * as actionTypes from '../actions';

export default function searchResults(state = { books: {} }, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.LOAD_BOOKS_SUCCESS: {
      const query = payload[0].query[0];
      const totalResults = payload[0]['total-results'][0];
      const page = payload[0].page;
      const totalPages = Math.floor(totalResults / (20 + (totalResults % 20 === 0 ? 0 : 1)));

      const newState = {};
      const booksArray = payload[0].results[0].work;
      booksArray.forEach(book => {
        const bestBook = book.best_book[0];
        newState[`${bestBook.id[0]._}`] = {
          id: bestBook.id[0]._,
          title: bestBook.title[0],
          author: bestBook.author[0].name[0],
          image: bestBook.image_url[0],
          averageRating: parseFloat(book.average_rating[0]),
          ratingCount: book.ratings_count[0]._,
        };
      });
      //  console.log('state', state);
      const books = newState;
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
      const newState = state.books;
      const booksArray = payload[0].results[0].work;
      booksArray.forEach(book => {
        const bestBook = book.best_book[0];
        newState[`${bestBook.id[0]._}`] = {
          id: bestBook.id[0]._,
          title: bestBook.title[0],
          author: bestBook.author[0].name[0],
          image: bestBook.image_url[0],
          averageRating: parseFloat(book.average_rating[0]),
          ratingCount: book.ratings_count[0]._,
        };
      });
      const books = { ...state.books, newState };
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
