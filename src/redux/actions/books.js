//  src
import bookApi from '../../api/search';

export const LOAD_BOOKS = 'LOAD_BOOKS';
export const LOAD_BOOKS_SUCCESS = 'LOAD_BOOKS_SUCCESS';
export const LOAD_BOOKS_FAILURE = 'LOAD_BOOKS_FAILURE';

export function loadBooks(query, page) {
  return dispatch => {
    dispatch({ type: LOAD_BOOKS });
    return bookApi
      .getAllBooks(query, page)
      .then(books => {
        dispatch({
          type: LOAD_BOOKS_SUCCESS,
          payload: books,
          meta: { paginate: false },
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
          meta: { paginate: true },
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
