// src
import SearchApi from '../../api/search';

export const SEARCH_BOOKS = 'CREATE_NOTEBOOK';
export const SEARCH_BOOKS_SUCCESS = 'SEARCH_BOOKS_SUCCESS';
export const SEARCH_BOOKS_FAILED = 'SEARCH_BOOKS_FAILED';

export function searchBook(query, page) {
  return function(dispatch) {
    dispatch({ type: SEARCH_BOOKS });
    return SearchApi.getAllBooks(query, page)
      .then(response => {
        dispatch({
          type: SEARCH_BOOKS_SUCCESS,
          payload: response.data,
        });
      })
      .catch(error => {
        dispatch({
          type: SEARCH_BOOKS_FAILED,
          payload: error,
        });
      });
  };
}
