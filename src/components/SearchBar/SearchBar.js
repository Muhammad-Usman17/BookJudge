//  lib
import React from 'react';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import { getOr } from 'lodash/fp';
//  src
import { loadBooks } from '../../redux/actions';
import SearchBarInner from './SearchBarInner';
import history from '../../utils/history';
import * as widgets from '../Widgets';

class SearchBar extends React.Component {
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

  componentWillReceiveProps(nextProps) {
    this.setState(prevState => ({ books: nextProps.topBooks }));
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
    this.setState(prevState => ({ value: newValue }));
  };

  handleSearchButton = event => {
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

  handleSuggestionsClearRequested = () => {
    this.setState(prevState => ({ books: [] }));
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
    const { value, books } = this.state;
    const { isLoading } = this.props;
    return (
      <SearchBarInner
        renderInput={widgets.renderInput}
        books={books}
        onClickSearch={this.handleSearchButton}
        handleSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        handleSuggestionsClearRequested={this.handleSuggestionsClearRequested}
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
  const totalResults = getOr(0, 'totalResults')(bookData);
  const query = getOr('', 'query')(bookData);
  const books = getOr({}, 'books')(bookData);
  const bestBooks = Object.keys(books).map(key => books[key]);
  let topBooks = [];
  bestBooks.sort((obj1, obj2) => obj2.averageRating - obj1.averageRating);
  if (bestBooks.length > 0) {
    topBooks = bestBooks.filter((i, index) => index < 5).map(book => book);
    if (bestBooks.length > 5) {
      topBooks.push({
        title: `${parseInt(totalResults, 10) - 5} Other Results`,
        code: 'search',
        author: query,
        image: '',
      });
    }
  }
  return {
    books,
    topBooks,
    query,
    isLoading,
  };
}
export default connect(mapStateToProps)(SearchBar);
