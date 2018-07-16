//  src
import bookApi from '../../api/search';

export const LOAD_BOOKS = 'LOAD_BOOKS';
export const LOAD_BOOKS_SUCCESS = 'LOAD_BOOKS_SUCCESS';
export const LOAD_BOOKS_FAILURE = 'LOAD_BOOKS_FAILURE';

export function loadBooks(query, page) {
  console.log('query', query);
  console.log('page', page);
  return function(dispatch) {
    console.log('inner query', query);
    console.log('page', page);
    dispatch({ type: LOAD_BOOKS });
    return bookApi
      .getAllBooks(query, page)
      .then(books => {
        dispatch({
          type: LOAD_BOOKS_SUCCESS,
          payload: books,
          intent: 'NEW',
        });
      })
      .catch(error => {
        dispatch({
          type: LOAD_BOOKS_FAILURE,
          payload: error,
        });
      });
  };
}
export function PaginateBooks(query, page) {
  return dispatch => {
    dispatch({
      type: LOAD_BOOKS,
    });
    bookApi
      .getAllBooks(query, page)
      .then(books => {
        dispatch({
          type: LOAD_BOOKS_SUCCESS,
          payload: books,
          intent: 'PAGINATE',
        });
      })
      .catch(error => {
        dispatch({
          type: LOAD_BOOKS_FAILURE,
          payload: error,
        });
      });
  };
}
