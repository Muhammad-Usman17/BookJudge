//  lib
import React from 'react';
import Autosuggest from 'react-autosuggest';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

//  src
import './SearchBar.css';

const SearchBarInner = props => {
  const {
    renderInput,
    books,
    handleSuggestionsFetchRequested,
    handleSuggestionsClearRequested,
    renderSuggestionsContainer,
    onSuggestionSelected,
    renderSuggestion,
    getSuggestionValue,
    value,
    handleChange,
    onClickSearch,
    onKeyPress,
  } = props;
  return (
    <Card>
      <CardMedia image="../../images/Books.jpg" />
      <CardContent className="SearchBar-content">
        <div className="SearchBar-autocomplete">
          <Autosuggest
            theme={{
              suggestionsList: 'Widgets-list',
            }}
            renderInputComponent={renderInput}
            suggestions={books}
            onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
            onSuggestionsClearRequested={handleSuggestionsClearRequested}
            renderSuggestionsContainer={renderSuggestionsContainer}
            onSuggestionSelected={onSuggestionSelected}
            renderSuggestion={renderSuggestion}
            getSuggestionValue={getSuggestionValue}
            inputProps={{
              placeholder: 'Book Name',
              value,
              onChange: handleChange,
              onKeyPress,
            }}
          />
        </div>
        <Tooltip title="Search">
          <Button
            className="SearchBar-button"
            variant="contained"
            color="secondary"
            onClick={onClickSearch}
          >
            {' '}Search{' '}
          </Button>
        </Tooltip>
      </CardContent>
    </Card>
  );
};
SearchBarInner.propTypes = {
  renderInput: PropTypes.func.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleSuggestionsFetchRequested: PropTypes.func.isRequired,
  handleSuggestionsClearRequested: PropTypes.func.isRequired,
  renderSuggestionsContainer: PropTypes.func.isRequired,
  onSuggestionSelected: PropTypes.func.isRequired,
  renderSuggestion: PropTypes.func.isRequired,
  getSuggestionValue: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  onClickSearch: PropTypes.func.isRequired,
  onKeyPress: PropTypes.func.isRequired,
};

export default SearchBarInner;
