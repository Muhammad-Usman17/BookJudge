//  lib
import React from 'react';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import flow from 'lodash/fp/flow';
import getOr from 'lodash/fp/getOr';
import orderBy from 'lodash/fp/orderBy';
import slice from 'lodash/fp/slice';

//  src
import { loadBooks } from '../../redux/actions';
import SearchBarInner from './SearchBarInner';
import history from '../../utils/history';
import * as widgets from './widgets';

type Props = {
  query: String,
  dispatch: Function,
  isLoading: Boolean,
  topBooks: Array,
};
class SearchBar extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      value: '',
    };
    this.handleSuggestionsFetchRequested = debounce(
      this.handleSuggestionsFetchRequested.bind(this),
      1000
    );
  }

  getSuggestionValue = suggestions => suggestions.name;

  onSuggestionSelected = (event, { suggestion }) => {
    const { query } = this.props;
    if (suggestion.code === 'search') {
      history.push(`/search/${query}`);
    } else {
      history.push(`/book/${suggestion.id}`);
    }
  };

  handleQueryChange = (event, { newValue }) => {
    this.setState(() => ({ value: newValue }));
  };

  handleSearchButton = () => {
    const { value } = this.state;
    if (value.length > 0) {
      history.push(`/search/${value}`);
    }
  };

  handleSuggestionsFetchRequested = ({ value }) => {
    if (value.length > 0) {
      const { dispatch } = this.props;
      dispatch(loadBooks(value, 1));
      this.setState({ value });
    }
  };

  handleOnKeyPress = ev => {
    if (ev.key === 'Enter') {
      const { value } = this.state;
      if (value.length > 0) {
        history.push(`/search/${value}`);
      }
      ev.preventDefault();
    }
  };

  render() {
    const { value } = this.state;
    const { isLoading, topBooks } = this.props;
    return (
      <SearchBarInner
        renderInput={widgets.renderInput}
        books={topBooks}
        onClickSearch={this.handleSearchButton}
        handleSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        renderSuggestionsContainer={widgets.renderSuggestionsContainer}
        onSuggestionSelected={this.onSuggestionSelected}
        renderSuggestion={widgets.renderSuggestion}
        getSuggestionValue={this.getSuggestionValue}
        handleChange={this.handleQueryChange}
        value={value}
        onKeyPress={this.handleOnKeyPress}
        isLoading={isLoading}
      />
    );
  }
}
function mapStateToProps(state) {
  const bookData = getOr({}, 'books.mainReducer')(state);
  const isLoading = getOr({}, 'books.isLoading')(state);
  const totalResults = getOr(5, 'totalResults')(bookData);
  const query = getOr('', 'query')(bookData);
  const topBooks = flow(
    getOr({}, 'books'),
    orderBy('averageRating', 'desc'),
    slice(0, 5),
    bestBooks => [
      ...bestBooks,
      {
        title: `${parseInt(totalResults, 10) - 5} Other Results`,
        code: 'search',
        author: query,
        image: '',
      },
    ]
  )(bookData);

  return {
    topBooks,
    query,
    isLoading,
  };
}
export default connect(mapStateToProps)(SearchBar);
