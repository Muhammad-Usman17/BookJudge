//  libs
import { combineReducers } from 'redux';

// src
import * as ActionTypes from '../actions';

const isLoading = (state = false, action) => {
  switch (action.type) {
    case ActionTypes.SEARCH_BOOKS: {
      return true;
    }
    case ActionTypes.SEARCH_BOOKS_SUCCESS:
    case ActionTypes.SEARCH_BOOKS_FAILED: {
      return false;
    }
    default: {
      return state;
    }
  }
};
function mainReducer(state = {}, action) {
  // const { type, payload, meta } = action;

  switch (type) {
    case ActionTypes.NOTEBOOK_LOADING_SUCCESS: {
      // const { id } = meta;
      return {};
    }

    default: {
      return state;
    }
  }
}

export default combineReducers({
  mainReducer,
  isLoading,
});
