//  src
import getBooks from '../../api/bookApi';

export const LOAD_BOOKS = 'LOAD_BOOKS';
export const LOAD_MORE_BOOKS_SUCCESS = 'LOAD_MORE_BOOKS_SUCCESS';
export const LOAD_BOOKS_SUCCESS = 'LOAD_BOOKS_SUCCESS';
export const LOAD_BOOKS_FAILURE = 'LOAD_BOOKS_FAILURE';

export function loadBooks(query, page) {
  return dispatch => {
    dispatch({ type: LOAD_BOOKS });
    return getBooks(query, page)
      .then(books => {
        dispatch({
          type: LOAD_BOOKS_SUCCESS,
          payload: books,
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
export function loadMoreBooks(query, page) {
  return dispatch => {
    dispatch({
      type: LOAD_BOOKS,
    });
    return getBooks(query, page)
      .then(books => {
        dispatch({
          type: LOAD_MORE_BOOKS_SUCCESS,
          payload: books,
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
