import React from 'react';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';

//  src
import { loadBooks } from '../../redux/actions';
import AutoSuggestInner from './AutoSuggestInner';
import history from '../../utils/history';

class AutoSuggest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      value: '',
      query: '',
    };

    this.handleSuggestionsFetchRequested = debounce(
      this.handleSuggestionsFetchRequested.bind(this),
      1000
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.searchResults !== this.props.searchResults) {
      const { query, items, totalResults } = nextProps.searchResults;
      const books = nextProps.books;
      this.setState({ query });
      if (items.length > 0) {
        const bookData = items.filter((i, index) => index < 5).map(book => ({
          name: books[book].title,
          code: book,
          author: books[book].author,
          image: books[book].image,
        }));
        if (items.length > 5) {
          bookData.push({
            name: `${parseInt(totalResults, 10) - 5} Other Results`,
            code: 'search',
            author: query,
            image: '',
          });
        }
        this.setState({ books: bookData });
      }
    }
  }
  // render the textfield Input
  renderInput = inputProps => {
    const { ref, ...other } = inputProps;

    return (
      <TextField
        fullWidth
        InputProps={{
          inputRef: ref,
          ...other,
        }}
      />
    );
  };

  // render the list of suggestions
  renderSuggestion = (suggestion, { query, isHighlighted }) =>
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {suggestion.name}
      </div>
    </MenuItem>;

  //  render the suggessions container
  renderSuggestionsContainer = options => {
    const { containerProps, children } = options;
    return (
      <Paper {...containerProps} square>
        {children}
      </Paper>
    );
  };

  //  get the selected suggestion value
  getSuggestionValue = suggestions => suggestions.name;

  //  handle the auto fetching of query
  handleSuggestionsFetchRequested = ({ value }) => {
    if (value.length > 0) {
      const { dispatch } = this.props;
      dispatch(loadBooks(value, 1));
      this.setState({ value });
    }
  };

  //  handle the auto fetching of query
  handleSuggestionsClearRequested = () => {
    this.setState({
      books: [],
    });
  };

  // operations on selection of a suggestion
  onSuggestionSelected = (event, { suggestion }) => {
    if (suggestion.code === 'search') {
      history.push(`/search/${this.state.query}`);
    } else {
      history.push(`/book/${suggestion.code}`);
    }
  };

  // handle change on textfield
  handleChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  // handle search button click
  handleClick = event => {
    const { value } = this.state;

    if (value.length > 0) {
      history.push(`/search/${value}`);
    }
  };
  render() {
    const { books, value } = this.state;
    return (
      <AutoSuggestInner
        renderInput={this.renderInput}
        books={books}
        onClickSearch={this.handleClick}
        handleSuggestionsFetchRequested={this.handleSuggestionsFetchRequested}
        handleSuggestionsClearRequested={this.handleSuggestionsClearRequested}
        renderSuggestionsContainer={this.renderSuggestionsContainer}
        onSuggestionSelected={this.onSuggestionSelected}
        renderSuggestion={this.renderSuggestion}
        getSuggestionValue={this.getSuggestionValue}
        handleChange={this.handleChange}
        value={value}
      />
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    searchResults: state.searchResults,
    books: state.books,
  };
}
export default connect(mapStateToProps)(AutoSuggest);
